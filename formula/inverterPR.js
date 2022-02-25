// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const inverterdeviceobject = Object.fromEntries(parameter3.map((inverter) => [inverter._id, inverter]));
const { meterVoltageReference } = parameter4;
const { meterDeviceIds, wmsDeviceIds } = parameter5;
const {
    EXPORT_ENERGY_TOTAL, IMPORT_ENERGY_TOTAL,
    VOLTAGE_R_PHASE, VOLTAGE_Y_PHASE, VOLTAGE_B_PHASE,
    VOLTAGE_RY_PHASE, VOLTAGE_YB_PHASE, VOLTAGE_BR_PHASE,
    TILTED_IRRADIATION1, TILTED_IRRADIATION2
} = parameter6;

const inverterDeviceIds = Object.keys(inverterdeviceobject);
const overallDataArray = dbdata.map((timedata) => {
    const internalWMSArray = Object.entries(timedata.data)
        .filter(([wmsid, wmsdata]) => wmsDeviceIds.includes(wmsid))
        .map(([wmsid, wmsdata]) => lodash.pick(wmsdata.parameters, [TILTED_IRRADIATION1, TILTED_IRRADIATION2]));
    const internalMeterArray = Object.entries(timedata.data)
        .filter(([meterid, meterdata]) => meterDeviceIds.includes(meterid) && meterdata.parameters[EXPORT_ENERGY_TOTAL] > 0)
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

    const internalInverterArray = Object.entries(timedata.data)
        .filter(([inverterid, inverterdata]) => inverterDeviceIds.includes(inverterid) && inverterdata.parameters[EXPORT_ENERGY_TOTAL] > 0)
        .map(([inverterid, inverterdata]) => [inverterid, inverterdata.parameters[EXPORT_ENERGY_TOTAL]]);

    return {
        timestamp: timedata.timstamp,
        [TILTED_IRRADIATION1]: lodash.sum(internalWMSArray.map((p) => lodash.mean([p[TILTED_IRRADIATION1], p[TILTED_IRRADIATION2]].filter((x) => x > 0)))),
        GRID_DOWN: internalMeterArray.every((meter) => !(meter[VOLTAGE_R_PHASE] >= meterVoltageReference || meter[VOLTAGE_RY_PHASE] >= meterVoltageReference)),
        INVERTERS: Object.fromEntries(internalInverterArray),
    }
});


const irradianceMeasured = lodash.sumBy(overallDataArray, (o) => o[TILTED_IRRADIATION1]);
const downtimeIrradianceToday = lodash.sumBy(overallDataArray.filter((f) => f.GRID_DOWN && f[TILTED_IRRADIATION1] > 20 && f[TILTED_IRRADIATION1] < 1200), (f) => f[TILTED_IRRADIATION1]);
const netIrradianceToday = parseFloat(((irradianceMeasured - downtimeIrradianceToday) / 60000).toFixed(3));

const inverterPR = Object.keys(inverterdeviceobject).map((inverterid) => {
    const meterFirstRecord = lodash.first(overallDataArray);
    const meterLastRecord = lodash.last(overallDataArray);
    const exportTotal = meterLastRecord.INVERTERS[inverterid][EXPORT_ENERGY_TOTAL] - meterFirstRecord.INVERTERS[inverterid][EXPORT_ENERGY_TOTAL];
    const { invertercapacity } = inverterdeviceobject[inverterid].devicemeta;
    const pr = parseFloat(((exportTotal / (netIrradianceToday * invertercapacity)) * 100).toFixed(3));
    return [inverterid, pr];
});

return Object.fromEntries(inverterPR);