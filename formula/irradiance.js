// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const { meterVoltageReference } = parameter3;
const { meterDeviceIds, wmsDeviceIds } = parameter4;
const {
    VOLTAGE_R_PHASE, VOLTAGE_Y_PHASE, VOLTAGE_B_PHASE,
    VOLTAGE_RY_PHASE, VOLTAGE_YB_PHASE, VOLTAGE_BR_PHASE,
    TILTED_IRRADIATION1, TILTED_IRRADIATION2
} = parameter5;


const overallDataArray = dbdata.map((timedata) => {
    const internalWMSArray = Object.entries(timedata.data)
        .filter(([wmsid, wmsdata]) => wmsDeviceIds.includes(wmsid))
        .map(([wmsid, wmsdata]) => lodash.pick(wmsdata.parameters, [TILTED_IRRADIATION1, TILTED_IRRADIATION2]));
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
        [TILTED_IRRADIATION1]: lodash.sum(internalWMSArray.map((p) => lodash.mean([p[TILTED_IRRADIATION1], p[TILTED_IRRADIATION2]].filter((x) => x > 0)))),
        GRID_DOWN: internalMeterArray.every((meter) => !(meter[VOLTAGE_R_PHASE] >= meterVoltageReference || meter[VOLTAGE_RY_PHASE] >= meterVoltageReference)),
    }
});


const irradianceMeasured = lodash.sumBy(overallDataArray, (o) => o[TILTED_IRRADIATION1]);
const downtimeIrradianceToday = lodash.sumBy(overallDataArray.filter((f) => f.GRID_DOWN && f[TILTED_IRRADIATION1] > 20 && f[TILTED_IRRADIATION1] < 1200), (f) => f[TILTED_IRRADIATION1]);
const netIrradianceToday = parseFloat(((irradianceMeasured - downtimeIrradianceToday) / 60000).toFixed(3));
return parseFloat(netIrradianceToday.toFixed(3));