// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const { meterVoltageReference } = parameter3;
const { meterDeviceIds } = parameter4;
const {
    VOLTAGE_R_PHASE, VOLTAGE_Y_PHASE, VOLTAGE_B_PHASE,
    VOLTAGE_RY_PHASE, VOLTAGE_YB_PHASE, VOLTAGE_BR_PHASE,
} = parameter5;


const overallDataArray = dbdata.map((timedata) => {
    const internalMeterArray = Object.entries(timedata.data)
        .filter(([meterid, meterdata]) => meterDeviceIds.includes(meterid))
        .map(([meterid, meterdata]) => ({
            [VOLTAGE_R_PHASE]: lodash.mean([
                meterdata.parameters[VOLTAGE_R_PHASE],
                meterdata.parameters[VOLTAGE_Y_PHASE],
                meterdata.parameters[VOLTAGE_B_PHASE]
            ]),
            [VOLTAGE_RY_PHASE]: lodash.mean([
                meterdata.parameters[VOLTAGE_RY_PHASE],
                meterdata.parameters[VOLTAGE_YB_PHASE],
                meterdata.parameters[VOLTAGE_BR_PHASE]
            ]),

        }));

    return {
        timestamp: timedata.timstamp,
        GRID_DOWN: internalMeterArray.every((meter) => !(meter[VOLTAGE_R_PHASE] >= meterVoltageReference || meter[VOLTAGE_RY_PHASE] >= meterVoltageReference)) ? 1 : 0,
    }
});


const griddowntime = lodash.sumBy(overallDataArray, (o) => o.GRID_DOWN) / 60;
const gridavailabletime = (1 - (griddowntime / 24)) * 100;
return parseFloat(gridavailabletime.toFixed(3));