
const { differenceInMinutes, addMinutes, startOfDay, endOfDay, format, addDays, subDays } = require('date-fns');
const startdate = startOfDay(subDays(new Date(), 2));
const enddate = endOfDay(subDays(new Date(), 1));

function differenceinminutes(date1, date2) {
    return differenceInMinutes(date1, date2);
}
const dateval = differenceinminutes(enddate, startdate);
for (let i = 0; i <= dateval; i++) {
    console.log(i)
    console.log(addMinutes(startdate, i));
}

