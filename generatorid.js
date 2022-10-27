
const lodash = require("lodash");

const a = ['TNVSC2022001','TNVSC2022009','TNVSC2022007','TNVSC2022004'];

// console.log('TNVSC'+Number(Number(a.split('TNVSC')[1])+1))
console.log(lodash.max(a))