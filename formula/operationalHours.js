// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = lodash.sortBy(parameter2, (s) => s.timestamp);
const { wmsDeviceIds } = parameter3;
const {
    TILTED_IRRADIATION1, TILTED_IRRADIATION2
} = parameter4;

const overallDataArray = dbdata.map((timedata) => {
    const internalWMSArray = Object.entries(timedata.data)
        .filter(([wmsid, wmsdata]) => wmsDeviceIds.includes(wmsid))
        .map(([wmsid, wmsdata]) => lodash.mean([
            wmsdata.parameters[TILTED_IRRADIATION1],
            wmsdata.parameters[TILTED_IRRADIATION2]
        ].filter((f) => f !== undefined)));

    const wmsMean = lodash.mean(internalWMSArray);
    return wmsMean > 100 ? 1 : 0;
});


return lodash.sum(overallDataArray);