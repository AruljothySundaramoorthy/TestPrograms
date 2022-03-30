const date = require('date-fns');
const moment = require('moment');
const currentdate = new Date('2022-03-21T00:00:00');


// function getreandomnumber() {
//     return Math.floor(Math.random() * (20000 - 1000 + 1) + 1000);
// }
// let data = [];
// for (let i = 0; i <= 18; i++) {

//     let tempdata = {
//         device: `Device ${i + 1}`,
//         Inverter_Energy: Math.floor(Math.random() * (20000 - 1000 + 1) + 1000),
//         Inverter_PR: Math.floor(Math.random() * (20000 - 1000 + 1) + 1000),
//         Inverter: Math.floor(Math.random() * (20000 - 1000 + 1) + 1000),
//     }
//     data.push(tempdata);

// }
const startdate = (moment(moment(new Date()).subtract(30, 'day').toDate()).format(
    'YYYY-MM-DD'
)
)
let dates = [];
for (let i = 0; i <= 30; i++) {
    dates.push(moment(new Date(startdate)).add(i, 'day').format('YYYY-MM-DD'));
}

console.log(dates);