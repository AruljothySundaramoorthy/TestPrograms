var { differenceInHours } = require("date-fns");
let date1 = new Date()
let date2 = new Date('2021-12-20T16:23:31.228Z')

console.log(differenceInHours(date2, date1))
