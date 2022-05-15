try {
    const mongoose = require("mongoose");
    const log =
        require("@armax_cloud/allspark-data-models/lib/logger").getlogger();
    const {
        addMinutes,
        subMinutes,
        format,
        startOfDay,
        endOfDay,
        parse,
        differenceInMinutes,
        differenceInDays,
    } = require("date-fns");
    const lodash = require("lodash");
    const prreport = require("@armax_cloud/allspark-data-models/models/data-models/prdata.model");
    const prsettingtypeenum = require("@armax_cloud/allspark-data-models/models/enum/prsettingtype.enum");
    const prsettingtimestampenum = require("@armax_cloud/allspark-data-models/models/enum/prsettingtimestamp.enum");
    const devicetypeenum = require("@armax_cloud/allspark-data-models/models/enum/devicetype.enum");
    const kafkatopicenum = require("@armax_cloud/allspark-data-models/models/enum/kafkatopic.enum");
    const blockdevicedatamodel = require("@armax_cloud/allspark-data-models/models/data-models/blockdevicedata.model");
    const pareport = require("@armax_cloud/allspark-data-models/models/data-models/padata.model");
    const { SUBDOMAIN } = require("./config");
    const db = require("./databaseengine");
    const utils = require("./util");
    const utilities = require("@armax_cloud/allspark-data-models/lib/utilities");
    const iredis = require("./Iredis");
    let req = {};
    req.dbconnection = utilities.getTenantDB("csbpl");
    db.connect();
    const dbconnection = utilities.getTenantDB(SUBDOMAIN, mongoose.connection);

    const checkfunction = async (datevalue) => {
        try {
            const prpasettingdata = await utils.getsettings(dbconnection);

            const tempfiredate = new Date(datevalue);
            const starttime = subMinutes(tempfiredate, 5);

            const { referencemoduletemperature, prsettingtypeid } =
                prpasettingdata?.plantmeta?.prcalculation?.prsettings;

            let referencetemperatureitem;

            if (prsettingtypeid === prsettingtypeenum.HOURLY) {
                const hourtimestamp = prsettingtimestampenum(prsettingtypeenum.HOURLY);

                const matcheddate = Object.keys(hourtimestamp).find(
                    (m) => format(tempfiredate, "MMMM, do, HH") === hourtimestamp[m].value
                );

                referencetemperatureitem = referencemoduletemperature.find(
                    (f) => f.prsettingtimestampid === matcheddate.key
                );
            } else {
                referencetemperatureitem = referencemoduletemperature.find(
                    (f) => f.prsettingtimestampid === tempfiredate.getMonth() + 1 + 20000
                );
            }

            // const prfunction = utils.asyncfunctionbuilder(
            //   prpasettingdata.plantmeta.prcalculation.prfunction,
            // );
            try {
                const prpasettingdata = await utils.getsettings(dbconnection);

                const prfunction = async (
                    parameter1,
                    parameter2,
                    parameter3,
                    parameter4,
                    parameter5,
                    parameter6,
                    parameter7,
                    parameter8
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
                            temperaturecoefficient:
                                plantmeta.prcalculation.temperaturecoefficient,
                            tref: 0,
                            contractualavailability:
                                plantmeta.prcalculation.contractualavailability,
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
                                value.devices[x] &&
                                    value.devices[x].parameters[
                                    devices[x].energyexportparametername
                                    ] &&
                                    value.devices[x].parameters[
                                    devices[x].energyexportparametername
                                    ] > 0
                                    ? value.devices[x].parameters[
                                    devices[x].energyexportparametername
                                    ]
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
                                    number = valuesnumber
                                        ? parseFloat(valuesnumber.toFixed(3))
                                        : 0;
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
                                let ereal = Math.random() * 10;
                                if (
                                    currentereal - lastereal > 0 &&
                                    currentereal - lastereal < 3000
                                ) {
                                    ereal = currentereal - lastereal;
                                }
                                ereal = tofixedvalue(ereal);
                                const devicedata = Object.values(currentvalue.devices);
                                const wmsdevices = devicedata.filter(
                                    (f) =>
                                        f.devicemeta.devicetypeid &&
                                        f.devicemeta.devicetypeid === devicetypeenum.WMS
                                );
                                const wmspoavalue = wmsdevices.map((wmsdevice) => {
                                    if (
                                        wmsdevice.parameters.IS_HEALTHY === true &&
                                        wmsdevice.parameters.WMS_POA &&
                                        wmsdevice.parameters.WMS_POA > 0
                                    ) {
                                        return wmsdevice.parameters.WMS_POA;
                                    }
                                });
                                const wmswindspeed = isNaN(
                                    lodash.sum(
                                        wmsdevices
                                            .filter(
                                                (x) =>
                                                    x.parameters.IS_HEALTHY === true &&
                                                    x.parameters.WMS_POA &&
                                                    x.parameters.WMS_POA > 0
                                            )
                                            .map((x) => x.parameters.WMS_POA)
                                    ) /
                                    wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true)
                                        .length
                                )
                                    ? 0
                                    : lodash.sum(
                                        wmsdevices
                                            .filter(
                                                (x) =>
                                                    x.parameters.IS_HEALTHY === true &&
                                                    x.parameters.WMS_POA &&
                                                    x.parameters.WMS_POA > 0
                                            )
                                            .map((x) => x.parameters.WMS_POA)
                                    ) /
                                    wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true)
                                        .length;
                                const wmsambienttemp = isNaN(
                                    lodash.sum(
                                        wmsdevices
                                            .filter(
                                                (x) =>
                                                    x.parameters.IS_HEALTHY === true &&
                                                    x.parameters.WMS_AMB_TEMP &&
                                                    x.parameters.WMS_AMB_TEMP > 0
                                            )
                                            .map((x) => x.parameters.WMS_AMB_TEMP)
                                    ) /
                                    wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true)
                                        .length
                                )
                                    ? 0
                                    : lodash.sum(
                                        wmsdevices
                                            .filter(
                                                (x) =>
                                                    x.parameters.IS_HEALTHY === true &&
                                                    x.parameters.WMS_AMB_TEMP &&
                                                    x.parameters.WMS_AMB_TEMP > 0
                                            )
                                            .map((x) => x.parameters.WMS_AMB_TEMP)
                                    ) /
                                    wmsdevices.filter((x) => x.parameters.IS_HEALTHY === true)
                                        .length;
                                const wmsmoduletemp = wmsdevices.map((x) => {
                                    if (x.parameters.IS_HEALTHY === true) {
                                        if (x.parameters.WMS_MDL_TEMP1 > 0) {
                                            return tofixedvalue(x.parameters.WMS_MDL_TEMP1);
                                        }
                                        if (x.parameters.WMS_MDL_TEMP2 > 0) {
                                            return tofixedvalue(x.parameters.WMS_MDL_TEMP2);
                                        }
                                    }
                                });
                                let treal = isNaN(lodash.meanBy(wmsmoduletemp))
                                    ? 0
                                    : tofixedvalue(lodash.meanBy(wmsmoduletemp));
                                let temppoavalue = 0;
                                calculatedpoavalue =
                                    tofixedvalue(lodash.sumBy(wmspoavalue)) || 0;
                                temppoavalue = calculatedpoavalue;
                                if (calculatedpoavalue > 0) {
                                    calculatedpoavalue = calculatedpoavalue / wmspoavalue.length;
                                    temppoavalue = temppoavalue / wmspoavalue.length;
                                }
                                returndata.prdata.poa = tofixedvalue(temppoavalue);
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
                                        (1 -
                                            plantmeta.prcalculation.modulelineardegradationfactor)
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
                    return calculateprdata(
                        blockdata,
                        tref,
                        plantmeta,
                        logger,
                        devicetypeenum
                    );
                };

                const prdata = await prfunction(
                    dbconnection,
                    db,
                    starttime,
                    referencetemperatureitem
                        ? referencetemperatureitem.referencevalue
                        : 0,
                    prpasettingdata.plantmeta,
                    log,
                    {
                        lodash,
                        subMinutes,
                        addMinutes,
                        format,
                    },
                    devicetypeenum,
                    iredis
                );

                const tempprdata = {
                    ...prdata,
                    prtime: starttime,
                    prlocaltimestamp: addMinutes(
                        starttime,
                        prpasettingdata.plantlocationmeta.timezone.utcOffset
                    ),
                    prtimestamp: parseInt(format(starttime, "yyyyMMddHHmm"), 10),
                    subdomain: SUBDOMAIN,
                };

                await db
                    .saveprreport(dbconnection, tempprdata)
                    .catch((e) => log.error(e));
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const callerfunction = async () => {
        var startdate = new Date("2022-05-09 00:08:00");
        for (let i = 0; i <= 5500; i++) {
            startdate = addMinutes(startdate, 1);
            await checkfunction(startdate);
        }
    };
    callerfunction();
} catch (e) {
    console.log(e);
}
