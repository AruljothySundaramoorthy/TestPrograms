const dbconnection = parameter1;
const databaseengine = parameter2;
const starttime = parameter3;
const tref = parameter4;
const plantmeta = parameter5;
const logger = parameter6;
const { lodash, subMinutes, format } = parameter7;
const devicetypeenum = parameter8;
let devicefilterquery;
let blockdata;
let returndata = {
    starttime,
    prdata: {
        ereal: 0,
        gtireal: 0,
        poa: 0,
        treal: 0,
        globalstandardtestcondition:
            plantmeta.prcalculation.globalstandardtestcondition,
        plantdccapacity: plantmeta.prcalculation.plantdccapacity,
        temperaturecoefficient: plantmeta.prcalculation.temperaturecoefficient,
        tref: 0,
        contractualavailability: plantmeta.prcalculation.contractualavailability,
        modulelineardegradationfactor:
            plantmeta.prcalculation.modulelineardegradationfactor,
        numerator: 0,
        numeratorprreal1: 0,
        numeratorprreal2: 0,
        denaminator: 0,
        prreal: 0,
        prreal1: 0,
        prreal2: 0,
    },
};
const prtimestamp = format(
    subMinutes(starttime, plantmeta.prcalculation.printerval),
    "yyyyMMddHHmm"
);
const lessertimestamp = format(starttime, "yyyyMMddHHmm");
const listofdevices = [
    devicetypeenum.PQM,
    devicetypeenum.WMS,
    devicetypeenum.MAINMETER,
];
const listofdevicesdata = await databaseengine.getdevicesbydeviceid(
    dbconnection,
    listofdevices
);
listofdevicesdata.forEach((a) => {
    let d = { [`devices.${a.deviceid}`]: 1 };
    devicefilterquery = { ...devicefilterquery, ...d };
});
blockdata = await databaseengine.getlatestdatabydeviceid(
    dbconnection,
    parseInt(prtimestamp, 10),
    parseInt(lessertimestamp, 10),
    devicefilterquery
);
const erealsum = (devices, value, parametername) => {
    const tempereal = Object.keys(devices).map((x) => {
        const temapvalue =
            value.devices[x].parameters[devices[x].energyexportparametername] &&
                value.devices[x].parameters[devices[x].energyexportparametername] > 0
                ? value.devices[x].parameters[devices[x].energyexportparametername]
                : 0;
        return temapvalue;
    });
    return lodash.sum(tempereal) || 0;
};
const calculateprdata = (
    prtime,
    blockdata,
    tref,
    plantmeta,
    logger,
    devicetypeenum
) => {
    if (blockdata.length > 0) {
        const previousvalue = blockdata[1];
        const currentvalue = blockdata[0];
        try {
            let lastereal = erealsum(
                plantmeta.ogdevicemeta.primarydevice.devices1,
                previousvalue
            );
            if (lastereal == undefined && lastereal == null) {
                lastereal = erealsum(
                    plantmeta.ogdevicemeta.secondarydevice.devices1,
                    previousvalue
                );
            }
            if (lastereal == undefined && lastereal == null) {
                lastereal = erealsum(
                    plantmeta.ogdevicemeta.tertiarydevice.devices1,
                    previousvalue
                );
            }
            let currentereal = erealsum(
                plantmeta.ogdevicemeta.primarydevice.devices1,
                currentvalue
            );
            if (lastereal == undefined && lastereal == null) {
                currentereal = erealsum(
                    plantmeta.ogdevicemeta.secondarydevice.devices1,
                    currentvalue
                );
            }
            if (lastereal == undefined && lastereal == null) {
                currentereal = erealsum(
                    plantmeta.ogdevicemeta.tertiarydevice.devices1,
                    currentvalue
                );
            }
            let emeas = 0;
            if (currentereal - lastereal > 0) {
                emeas = currentereal - lastereal;
            }
            const devicedata = Object.values(currentvalue.devices);
            const wmsdevices = devicedata.filter(
                (f) =>
                    f.devicemeta.devicetypeid &&
                    f.devicemeta.devicetypeid === devicetypeenum.WMS
            );
            const wmspoavalue = [];
            const wmsmoduletemp = [];
            wmsdevices.forEach((wmsdevice) => {
                if (
                    wmsdevice.parameters.IS_HEALTHY === true &&
                    wmsdevice.parameters.WMS_POA &&
                    wmsdevice.parameters.WMS_POA > 0
                ) {
                    wmspoavalue.push(wmsdevice.parameters.WMS_POA);
                }
                if (wmsdevice.parameters.IS_HEALTHY === true) {
                    const wmssurtemp = [];
                    if (wmsdevice.parameters.WMS_MDL_TEMP1 > 1) {
                        wmssurtemp.push(wmsdevice.parameters.WMS_MDL_TEMP1);
                    }
                    if (wmsdevice.parameters.WMS_MDL_TEMP2 > 1) {
                        wmssurtemp.push(wmsdevice.parameters.WMS_MDL_TEMP2);
                    }
                    if (wmsdevice.parameters.WMS_MDL_TEMP3 > 1) {
                        wmssurtemp.push(wmsdevice.parameters.WMS_MDL_TEMP3);
                    }
                    if (wmsdevice.parameters.WMS_MDL_TEMP4 > 1) {
                        wmssurtemp.push(wmsdevice.parameters.WMS_MDL_TEMP4);
                    }
                    wmsmoduletemp.push(
                        wmssurtemp.reduce((a, b) => a + b) / wmssurtemp.length
                    );
                }
            });
            const tmeas =
                wmsmoduletemp.length > 0
                    ? wmsmoduletemp.reduce((a, b) => a + b) / wmsmoduletemp.length
                    : 0;
            let gj_poa =
                wmspoavalue.length > 0
                    ? wmspoavalue.reduce((a, b) => a + b) / wmspoavalue.length
                    : 0 / 60000;
            let poa =
                wmspoavalue.length > 0
                    ? wmspoavalue.reduce((a, b) => a + b) / wmspoavalue.length
                    : 0 / 60000;
            if (wmspoavalue.length > 0) {
                gj_poa = gj_poa / 60000;
            }
            const numerator = emeas > 1500 ? 0 : emeas;
            const numeratorprreal1 =
                emeas *
                plantmeta.prcalculation.globalstandardtestcondition *
                plantmeta.prcalculation.contractualavailability;
            const numeratorprreal2 =
                numeratorprreal1 *
                (1 - plantmeta.prcalculation.modulelineardegradationfactor);
            const denaminator =
                plantmeta.prcalculation.plantdccapacity *
                gj_poa *
                (1 -
                    (plantmeta.prcalculation.temperaturecoefficient / 100) *
                    (tref - tmeas));
            const prreal =
                numerator === 0 || denaminator === 0
                    ? 0
                    : (numerator / denaminator) * 100;
            const prreal1 =
                numeratorprreal1 === 0 || denaminator === 0
                    ? 0
                    : (numeratorprreal1 / denaminator) * 100;
            const prreal2 =
                numeratorprreal2 === 0 || denaminator === 0
                    ? 0
                    : (numeratorprreal2 / denaminator) * 100;
            returndata = {
                ...returndata,
                prdata: {
                    ...returndata.prdata,
                    ereal: emeas,
                    gtireal: gj_poa,
                    treal: tmeas,
                    tref,
                    numerator,
                    numeratorprreal1,
                    numeratorprreal2,
                    denaminator,
                    prreal,
                    prreal1,
                    prreal2,
                    poa,
                },
            };
            return returndata;
        } catch (err) {
            logger.error(err);
        }
    }
    return returndata;
};
return calculateprdata(
    starttime,
    blockdata,
    tref,
    plantmeta,
    logger,
    devicetypeenum
);
