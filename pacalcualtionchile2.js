const lodash = require("lodash");
const subMinutes = require("date-fns/subMinutes");
const addMinutes = require("date-fns/addMinutes");
const format = require("date-fns/format");
const { startOfDay, endOfDay } = require("date-fns");
const { listofdevicesdatainfp, inverterinfodata, blockdatadata } = require('./pada')
try {

    // const pafunction = async (
    //     parameter1,
    //     parameter2,
    //     parameter3,
    //     parameter4,
    //     parameter5,
    //     parameter6,
    //     parameter7
    // ) => {
    // const dbconnection = parameter1;
    // const databaseengine = parameter2;
    // const starttime = parameter3;
    // const plantmeta = parameter4;
    // const logger = parameter5;
    // const { lodash, addMinutes, format } = parameter6;
    // const devicetypeenum = parameter7;
    let devicefilterquery;
    let blockdata;
    let returndata = { starttime: 0, pa: 0, poa: 0, devices: {}, calculatedpoa: 0 };
    // const prtimestamp = format(starttime, "yyyyMMddHHmm");
    // const lessertimestamp = format(addMinutes(starttime, 1), "yyyyMMddHHmm");
    // const listofdevices = [
    //     devicetypeenum.INVERTER,
    //     devicetypeenum.WMS,
    //     devicetypeenum.PQM,
    // ];
    // const listofdevicesdata = await databaseengine.getdevicesbydeviceid(
    //     dbconnection,
    //     listofdevices
    // );
    // let listofdevicesdata = [];
    let listofdevicesdata = []
    listofdevicesdata = listofdevicesdatainfp;
    let inverterinfo = [];
    inverterinfo = inverterinfodata
    let inverterdeviceinfo = {};

    let devicedccapacitydata = {};
    // let inverterdevices = {};
    inverterinfo.forEach((_devicedata) => {
        let data = { [_devicedata.deviceid]: _devicedata };
        inverterdeviceinfo = { ...inverterdeviceinfo, ...data }
        _devicedata.devicegeneralinfo.forEach((_general) => {
            if (_general.name == "Install DC Capacity") {
                devicedccapacitydata = {
                    ...devicedccapacitydata,
                    [_devicedata.deviceid]: parseFloat(_general.value),
                };
            }
        });
    });
    listofdevicesdata.forEach((a) => {
        let d = { [`devices.${a.deviceid}`]: 1 };
        devicefilterquery = { ...devicefilterquery, ...d };
    });
    blockdata = blockdatadata
    if (blockdata.length <= 0) {
        return returndata;
    }
    const calculateprdata = (
        blockdata,
        plantmeta,


        lodash
    ) => {
        try {
            let invdevices = {};
            let inverterdevices = {};
            if (blockdata.length > 0) {
                const devicedata = Object.values(blockdata[0].devices);
                Object.entries(blockdata[0].devices).map((c) => {
                    if (c[1].devicemeta.devicetypeid == 3) {
                        let data = { [c[0]]: c[1] };
                        inverterdevices = { ...inverterdevices, ...data };
                    }
                });
                const wmsdevices = devicedata.filter(
                    (f) =>
                        f.devicemeta.devicetypeid &&
                        f.devicemeta.devicetypeid === 7
                );
                const pqmdevice = devicedata.filter(
                    (f) =>
                        f.devicemeta.devicetypeid &&
                        f.devicemeta.devicetypeid === 15
                );
                let wmspoavalue = [];
                pqmdevice.map((x) => {
                    let pqmdev = {
                        [x.devicemeta.devicename]:
                            x.parameters.PQM_RY_PH_VLT +
                                x.parameters.PQM_BR_PH_VLT +
                                x.parameters.PQM_YB_PH_VLT <
                                5
                                ? 1
                                : 0,
                    };
                    returndata.devices = { ...returndata.devices, ...pqmdev };
                });
                let wmsvalues = 0;
                wmsdevices.forEach((wmsdevice) => {
                    if (
                        wmsdevice.parameters.IS_HEALTHY === true &&
                        wmsdevice.parameters.WMS_POA &&
                        wmsdevice.parameters.WMS_POA > 0
                    ) {
                        wmspoavalue.push(wmsdevice.parameters.WMS_POA);
                    }
                });
                if (wmspoavalue.length > 0) {
                    wmsvalues = lodash.sumBy(wmspoavalue) / wmspoavalue.length;
                } else {
                    wmsvalues = 0;
                }
                returndata.poa = wmsvalues;
                if (wmsvalues >= 50) {
                    returndata.calculatedpoa = 1;
                    Object.keys(inverterdeviceinfo).map((x) => {
                        let data = { IS_HEALTHY: false, INV_STS: 0, dccapacity: 0 };
                        if (inverterdevices[x] && inverterdevices[x].parameters.IS_HEALTHY) {
                            data.IS_HEALTHY = inverterdevices[x].parameters.IS_HEALTHY
                                ? inverterdevices[x].parameters.IS_HEALTHY
                                : false;
                            if (
                                inverterdevices[x].parameters.IS_HEALTHY == true &&
                                !(
                                    1 == (1 & inverterdevices[x].parameters.INV_RUN_STS) ||
                                    6 == (6 & inverterdevices[x].parameters.INV_RUN_STS)
                                )
                            ) {
                                data.INV_STS = 1;
                            }
                        }
                        data.dccapacity = devicedccapacitydata[x];
                        let devdata = { [x]: data };
                        invdevices = { ...invdevices, ...devdata };
                    });
                } else {
                    Object.keys(inverterdeviceinfo).map((x) => {
                        let data = { IS_HEALTHY: false, INV_STS: 0, dccapacity: 0 };
                        if (inverterdevices[x] && inverterdevices[x].parameters.IS_HEALTHY) {
                            data.IS_HEALTHY = inverterdevices[x].parameters.IS_HEALTHY
                                ? inverterdevices[x].parameters.IS_HEALTHY
                                : false;
                        }
                        data.dccapacity = devicedccapacitydata[x];
                        let devdata = { [x]: data };
                        invdevices = { ...invdevices, ...devdata };
                    });
                }
                let padata = Object.values(invdevices).filter((f) => f.INV_STS == 1);
                returndata.devices = { ...returndata.devices, ...invdevices };
                totalinverterdccapacity = lodash.sumBy(padata, "dccapacity");
                calculateddccapacity =
                    (totalinverterdccapacity / plantmeta) *
                    100;
                returndata.pa = calculateddccapacity;
                return returndata;
            }
            return returndata;
        } catch (err) {
            console.log(err)
        }
    };
    return calculateprdata(blockdata, 1800, lodash);

    // }
} catch (e) {
    console.log(e)
}