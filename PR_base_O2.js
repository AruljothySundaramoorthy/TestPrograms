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
  let starttime = parameter3;
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
  const prtimestamp = Date.parse(
    subMinutes(starttime, plantmeta.prcalculation.printerval)
  );
  const lessertimestamp = Date.parse(starttime);
  const listofdevices = [
    devicetypeenum.PQM,
    devicetypeenum.WMS,
    devicetypeenum.MAINMETER,
    devicetypeenum.TVM,
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
    prtimestamp,
    lessertimestamp,
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
    blockdata,
    tref,
    plantmeta,
    logger,
    devicetypeenum
  ) => {
    if (blockdata.length > 0) {
      let previousvalue = blockdata[1];
      let currentvalue = blockdata[0];
      try {
        const tofixedvalue = (valuesnumber) => {
          let number = 0;
          number = parseFloat(valuesnumber.toFixed(3));
          return number;
        };
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
        if (currentereal == undefined && currentereal == null) {
          currentereal = erealsum(
            plantmeta.ogdevicemeta.secondarydevice.devices1,
            currentvalue
          );
        }
        if (currentereal == undefined && currentereal == null) {
          currentereal = erealsum(
            plantmeta.ogdevicemeta.tertiarydevice.devices1,
            currentvalue
          );
        }
        currentereal = tofixedvalue(currentereal);
        lastereal = tofixedvalue(lastereal);
        let ereal = 0;
        if (currentereal - lastereal > 0 && currentereal - lastereal < 3000) {
          ereal = currentereal - lastereal;
        }
        ereal = tofixedvalue(ereal);
        const devicedata = Object.values(currentvalue.devices);
        const wmsdevices = devicedata.filter(
          (f) =>
            f.devicemeta.devicetypeid &&
            f.devicemeta.devicetypeid === devicetypeenum.WMS
        );
        const wmspoavalue = wmsdevices.map((x) => {
          if (
            wmsdevice.parameters.IS_HEALTHY === true &&
            wmsdevice.parameters.WMS_POA &&
            wmsdevice.parameters.WMS_POA > 0
          ) {
            return wmsdevice.parameters.WMS_POA;
          }
        });
        const wmswindspeed = isNaN(
          lodash.sumBy(
            wmsdevices.filter(
              (x) =>
                x.parameters.IS_HEALTHY === true &&
                wmsdevice.parameters.WMS_POA &&
                wmsdevice.parameters.WMS_POA > 0
            ),
            "WMS_POA"
          ) / wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true).length
        )
          ? 0
          : lodash.sumBy(
            wmsdevices.filter(
              (x) =>
                x.parameters.IS_HEALTHY === true &&
                wmsdevice.parameters.WMS_WND_SPD &&
                wmsdevice.parameters.WMS_WND_SPD > 0
            ),
            "WMS_WND_SPD"
          ) /
          wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true).length;
        const wmsambienttemp = isNaN(
          lodash.sumBy(
            wmsdevices.filter(
              (x) =>
                x.parameters.IS_HEALTHY === true &&
                wmsdevice.parameters.WMS_AMB_TEMP &&
                wmsdevice.parameters.WMS_AMB_TEMP > 0
            ),
            "WMS_AMB_TEMP"
          ) / wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true).length
        )
          ? 0
          : lodash.sumBy(
            wmsdevices.filter(
              (x) =>
                x.parameters.IS_HEALTHY === true &&
                wmsdevice.parameters.WMS_POA &&
                wmsdevice.parameters.WMS_POA > 0
            ),
            "WMS_POA"
          ) /
          wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true).length;
        console.log(wmswindspeed, wmsambienttemp);
        const wmsmoduletemp = wmsdevices.map((x) => {
          if (wmsdevice.parameters.IS_HEALTHY === true) {
            if (wmsdevice.parameters.WMS_MDL_TEMP1 > 0) {
              return tofixedvalue(wmsdevice.parameters.WMS_MDL_TEMP1);
            }
            if (wmsdevice.parameters.WMS_MDL_TEMP2 > 0) {
              return tofixedvalue(wmsdevice.parameters.WMS_MDL_TEMP2);
            }
          }
        });
        let treal = isNaN(lodash.meanBy(wmsmoduletemp))
          ? 0
          : tofixedvalue(lodash.meanBy(wmsmoduletemp));
        let temppoavalue = 0;
        calculatedpoavalue = tofixedvalue(lodash.sumBy(wmspoavalue)) || 0;
        temppoavalue = calculatedpoavalue;
        if (calculatedpoavalue > 0) {
          calculatedpoavalue = calculatedpoavalue / wmspoavalue.length;
          temppoavalue = temppoavalue / wmspoavalue.length;
        }
        prdata.poa = tofixedvalue(temppoavalue);
        let gtireal = tofixedvalue(calculatedpoavalue) || 0;
        if (wmspoavalue.length > 0) {
          gtireal = gtireal / 60000;
        }
        let numerator =
          tofixedvalue(
            ereal * plantmeta.prcalculation.globalstandardtestcondition
          ) || 0;
        let numeratorprreal1 =
          tofixedvalue(
            ereal *
            plantmeta.prcalculation.globalstandardtestcondition *
            plantmeta.prcalculation.contractualavailability
          ) || 0;
        let numeratorprreal2 =
          tofixedvalue(
            numeratorprreal1 *
            (1 - plantmeta.prcalculation.modulelineardegradationfactor)
          ) || 0;
        let denaminator =
          tofixedvalue(
            gtireal *
            plantmeta.prcalculation.plantdccapacity *
            (1 -
              plantmeta.prcalculation.temperaturecoefficient *
              ((tref - treal) / 100))
          ) || 0;
        let prreal =
          tofixedvalue(
            numerator === 0 || denaminator === 0
              ? 0
              : (numerator / denaminator) * 100
          ) || 0;
        let prreal1 =
          tofixedvalue(
            numeratorprreal1 === 0 || denaminator === 0
              ? 0
              : (numeratorprreal1 / denaminator) * 100
          ) || 0;
        let prreal2 =
          tofixedvalue(
            numeratorprreal2 === 0 || denaminator === 0
              ? 0
              : (numeratorprreal2 / denaminator) * 100
          ) || 0;
        returndata = {
          ...returndata,
          prdata: {
            ...returndata.prdata,
            ereal,
            gtireal,
            treal,
            tref,
            numerator,
            numeratorprreal1,
            numeratorprreal2,
            denaminator,
            prreal,
            prreal1,
            prreal2,
            poa,
            wmswindspeed,
            wmsambienttemp,
          },
        };
        return returndata;
      } catch (err) {
        logger.error(err);
        return null;
      }
    }
    return returndata;
  };
  return calculateprdata(blockdata, tref, plantmeta, logger, devicetypeenum);
};
