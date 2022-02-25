const exportToday = parseFloat(parameter1);
const plantCapacity = parseFloat(parameter2);
const noOfDaysInMonth = parseInt(parameter3, 10);
const cuf = (exportToday / (24 * plantCapacity * noOfDaysInMonth)) * 100;
return parseFloat(cuf.toFixed(3));