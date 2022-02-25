const plantPR = parseFloat(parameter1);
const negativeModuleTemperatureCoefficient = parseFloat(parameter2);
const avgerageModuleTemperatureOfPlantOperationalHours = parseInt(parameter3, 10);
const weatherCorrectedPRType1 = (plantPR * (1 - (negativeModuleTemperatureCoefficient * (avgerageModuleTemperatureOfPlantOperationalHours - 25)))) * 100
return parseFloat(weatherCorrectedPRType1.toFixed(3));