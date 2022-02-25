// const lodash = require('lodash');
const lodash = parameter1;
const dbdata = parameter2;
const { plantACCapacity } = parameter3;
const totaldays = parameter4;

const exportTotal = lodash.sumBy(dbdata, (o) => o.data.todayenergy);

const plantMonthlyACCUF = (exportTotal / (plantACCapacity * 24 * totaldays)) * 100;
return parseFloat(plantMonthlyACCUF.toFixed(3));