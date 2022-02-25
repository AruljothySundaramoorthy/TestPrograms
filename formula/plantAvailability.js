// const lodash = require('lodash');
const lodash = parameter1;
const plantCapacity = parseFloat(parameter2);
const inverterDataObject = parameter3;
const operationalHours = arseFloat(parameter4);

const inverterEffectOnPlant = Object.entries(inverterDataObject).map(([inverterid, inverterdata]) => (parseFloat(nverterdata.invertercapacity) / plantCapacity) * parseFloat(inverterdata.inverterdowntime));
const plantUnavailability = lodash.sum(inverterEffectOnPlant) / operationalHours;
const plantAvailability = (1 - plantUnavailability) * 100;
return parseFloat(plantAvailability.toFixed(3));
