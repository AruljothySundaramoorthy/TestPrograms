// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const { plantACCapacity } = parameter3;
const { meterDeviceIds } = parameter4;
const {
    EXPORT_ENERGY_TOTAL,
} = parameter5;


const overallDataArray = dbdata.map((timedata) => {
    const internalMeterArray = Object.entries(timedata.data)
        .filter(([meterid, meterdata]) => meterDeviceIds.includes(meterid) && meterdata.parameters[EXPORT_ENERGY_TOTAL] > 0)
        .map(([meterid, meterdata]) => ({
            [EXPORT_ENERGY_TOTAL]: meterdata.parameters[EXPORT_ENERGY_TOTAL],
        }));

    return {
        timestamp: timedata.timstamp,
        [EXPORT_ENERGY_TOTAL]: lodash.sumBy(internalMeterArray, (o) => o[EXPORT_ENERGY_TOTAL]),
    }
});



const meterFirstRecord = lodash.first(overallDataArray);
const meterLastRecord = lodash.last(overallDataArray);
const exportTotal = meterLastRecord[EXPORT_ENERGY_TOTAL] - meterFirstRecord[EXPORT_ENERGY_TOTAL];

const plantACCUF = (exportTotal / (plantACCapacity * 24)) * 100;
return parseFloat(plantACCUF.toFixed(3));