// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const inverterdeviceobject = Object.fromEntries(parameter3.map((inverter) => [inverter._id, inverter]));
const {
    EXPORT_ENERGY_TOTAL
} = parameter4;

const inverterDeviceIds = Object.keys(inverterdeviceobject);
const overallDataArray = dbdata.map((timedata) => {
    const internalInverterArray = Object.entries(timedata.data)
        .filter(([inverterid, inverterdata]) => inverterDeviceIds.includes(inverterid) && inverterdata.parameters[EXPORT_ENERGY_TOTAL] > 0)
        .map(([inverterid, inverterdata]) => [inverterid, inverterdata.parameters[EXPORT_ENERGY_TOTAL]]);

    return {
        timestamp: timedata.timstamp,
        INVERTERS: Object.fromEntries(internalInverterArray),
    }
});


const invertersYield = Object.keys(inverterdeviceobject).map((inverterid) => {
    const meterFirstRecord = lodash.first(overallDataArray);
    const meterLastRecord = lodash.last(overallDataArray);
    const exportTotal = meterLastRecord.INVERTERS[inverterid][EXPORT_ENERGY_TOTAL] - meterFirstRecord.INVERTERS[inverterid][EXPORT_ENERGY_TOTAL];
    const { invertercapacity } = inverterdeviceobject[inverterid].devicemeta;
    const inverteryield = parseFloat((exportTotal / invertercapacity).toFixed(3));
    return [inverterid, inverteryield];
});

return Object.fromEntries(invertersYield);