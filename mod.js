const datefns = require('date-fns')


var startdate = datefns.startOfDay(new Date());

for (let i = 0; i <= 1440; i++) {
    startdate = datefns.addMinutes(startdate, i);
    var minute = startdate.getMinutes();
    if (minute % 5 == 0) {
        console.log('timevalue', startdate, '5 Minute', minute)
    }
    if (minute % 10 == 0) {
        console.log('timevalue', startdate, '10 Minute', minute)
    }
    if (minute % 15 == 0) {
        console.log('timevalue', startdate, '15Minute', minute)
    }
}

// console.log(20 % 20 == 5)