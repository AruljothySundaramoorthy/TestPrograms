// const moment = require('moment');

// console.log(moment(new Date('2022-02-02')).startOf('day'))


const { addMonths, addYears } = require('date-fns')

const monthadded = addMonths(new Date(), 6);
const yearsadded = addYears(new Date(), 1);
console.log(monthadded, yearsadded)