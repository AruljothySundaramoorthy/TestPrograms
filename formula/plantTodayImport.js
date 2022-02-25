// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const { meterDeviceIds } = parameter3;
const {
    IMPORT_ENERGY_TOTAL,
} = parameter4;


const overallDataArray = dbdata.map((timedata) => {
    const internalMeterArray = Object.entries(timedata.data)
        .filter(([meterid, meterdata]) => meterDeviceIds.includes(meterid) && meterdata.parameters[IMPORT_ENERGY_TOTAL] > 0)
        .map(([meterid, meterdata]) => ({
            [IMPORT_ENERGY_TOTAL]: meterdata.parameters[IMPORT_ENERGY_TOTAL],
        }));

    return {
        timestamp: timedata.timstamp,
        [IMPORT_ENERGY_TOTAL]: lodash.sumBy(internalMeterArray, (o) => o[IMPORT_ENERGY_TOTAL]),
    }
});



const meterFirstRecord = lodash.first(overallDataArray);
const meterLastRecord = lodash.last(overallDataArray);
const importotal = meterLastRecord[IMPORT_ENERGY_TOTAL] - meterFirstRecord[IMPORT_ENERGY_TOTAL];
return importotal;