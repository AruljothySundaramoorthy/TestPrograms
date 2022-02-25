// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const inverterdeviceobject = Object.fromEntries(parameter3.map((inverter) => [inverter._id, inverter]));
const { meterDeviceIds, wmsDeviceIds } = parameter4;
const {
    ACT_PWR,
    TILTED_IRRADIATION1, TILTED_IRRADIATION2
} = parameter5;

const inverterDeviceIds = Object.keys(inverterdeviceobject);
const overallDataArray = dbdata.map((timedata) => {
    const internalWMSArray = Object.entries(timedata.data)
        .filter(([wmsid, wmsdata]) => wmsDeviceIds.includes(wmsid))
        .map(([wmsid, wmsdata]) => lodash.mean([
            wmsdata.parameters[TILTED_IRRADIATION1],
            wmsdata.parameters[TILTED_IRRADIATION2]
        ].filter((f) => f !== undefined)));

    const wmsMean = lodash.mean(internalWMSArray);
    const internalInverterArray = Object.entries(timedata.data)
        .filter(([inverterid]) => inverterDeviceIds.includes(inverterid))
        .map(([inverterid, inverterdata]) => [
            inverterid,
            wmsMean > 100 && inverterdata.parameters[ACT_PWR] <= 0 ? 1 : 0
        ]);
    return {
        timestamp: timedata.timstamp,
        INVERTERS: Object.fromEntries(internalInverterArray),
    }
});


const inverterPR = Object.keys(inverterdeviceobject).map((inverterid) => {
    const inverteravailability = lodash.sumBy(overallDataArray, (x) => x.INVERTERS[inverterid]);
    return [inverterid, inverteravailability];
});
