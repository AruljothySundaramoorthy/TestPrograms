const inverterDowntime = parseFloat(parameter1);
const operationalHours = parseFloat(parameter2);
const invereterAvailability = (1 - (inverterDowntime / operationalHours)) * 100;
return parseFloat(invereterAvailability.toFixed(3));