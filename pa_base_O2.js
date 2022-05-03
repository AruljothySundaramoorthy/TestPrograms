const pafunction = async (
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5,
  parameter6,
  parameter7
) => {
  const dbconnection = parameter1;
  const databaseengine = parameter2;
  const starttime = parameter3;
  const plantmeta = parameter4;
  const logger = parameter5;
  const { lodash, addMinutes, format } = parameter6;
  const devicetypeenum = parameter7;
  let devicefilterquery;
  let blockdata;
  let returndata = { starttime, pa: 0, poa: 0, devices: {}, calculatedpoa: 0 };
  const prtimestamp = Date.parse(starttime);
  const lessertimestamp = Date.parse(addMinutes(starttime, 1));
  const listofdevices = [
    devicetypeenum.INVERTER,
    devicetypeenum.WMS,
    devicetypeenum.PQM,
    devicetypeenum.SCB,
  ];
  const listofdevicesdata = await databaseengine.getdevicesbydeviceid(
    dbconnection,
    listofdevices
  );
  const inverterinfo = await databaseengine.getdevicesbydevicetypeid(
    dbconnection,
    devicetypeenum.INVERTER
  );
  let devicedccapacitydata = {};
  inverterinfo.forEach((_devicedata) => {
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
  blockdata = await databaseengine.getlatestdatabydeviceid(
    dbconnection,
    prtimestamp,
    lessertimestamp,
    devicefilterquery
  );
  if (blockdata.length <= 0) {
    return returndata;
  }
  const calculateprdata = (
    blockdata,
    plantmeta,
    logger,
    devicetypeenum,
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
            f.devicemeta.devicetypeid === devicetypeenum.WMS
        );
        const pqmdevice = devicedata.filter(
          (f) =>
            f.devicemeta.devicetypeid &&
            f.devicemeta.devicetypeid === devicetypeenum.PQM
        );
        let wmspoavalue = [];
        let tempwmspoavalue = 0;
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
          tempwmspoavalue = lodash.sumBy(wmspoavalue) / wmspoavalue.length;
        } else {
          tempwmspoavalue = 0;
        }
        returndata.poa = tempwmspoavalue;
        if (tempwmspoavalue >= 50) {
          returndata.calculatedpoa = 1;
          Object.values(inverterinfo).map((x) => {
            let data = { IS_HEALTHY: false, INV_STS: 0, dccapacity: 0 };
            if (
              inverterdevices[x.deviceid] &&
              inverterdevices[x.deviceid].parameters.IS_HEALTHY
            ) {
              data.IS_HEALTHY = inverterdevices[x.deviceid].parameters
                .IS_HEALTHY
                ? inverterdevices[x.deviceid].parameters.IS_HEALTHY
                : false;
              if (
                !(
                  2 ==
                    (2 & inverterdevices[x.deviceid].parameters.INV_RNG_STS) ||
                  8 == (8 & inverterdevices[x.deviceid].parameters.INV_RNG_STS)
                )
              ) {
                data.INV_STS = 1;
              }
            }
            data.dccapacity = devicedccapacitydata[x.deviceid];
            let devdata = { [x.deviceid]: data };
            invdevices = { ...invdevices, ...devdata };
          });
        } else {
          Object.values(inverterinfo).map((x) => {
            let data = { IS_HEALTHY: false, INV_STS: 0, dccapacity: 0 };
            if (
              inverterdevices[x.deviceid] &&
              inverterdevices[x.deviceid].parameters.IS_HEALTHY
            ) {
              data.IS_HEALTHY = inverterdevices[x.deviceid].parameters
                .IS_HEALTHY
                ? inverterdevices[x.deviceid].parameters.IS_HEALTHY
                : false;
            }
            data.dccapacity = devicedccapacitydata[x.deviceid];
            let devdata = { [x.deviceid]: data };
            invdevices = { ...invdevices, ...devdata };
          });
        }
        let padata = Object.values(invdevices).filter((f) => f.INV_STS == 1);
        returndata.devices = { ...returndata.devices, ...invdevices };
        totalinverterdccapacity =
          Object.values(padata).length > 0
            ? lodash.sumBy(padata, "dccapacity")
            : 0;
        calculateddccapacity = isNaN(
          (totalinverterdccapacity / plantmeta.prcalculation.plantdccapacity) *
            100
        )
          ? 0
          : (totalinverterdccapacity /
              plantmeta.prcalculation.plantdccapacity) *
            100;
        returndata.pa = calculateddccapacity;
        return returndata;
      }
      return returndata;
    } catch (err) {
      logger.error(err);
    }
  };
  return calculateprdata(blockdata, plantmeta, logger, devicetypeenum, lodash);
};
