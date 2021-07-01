const schedule = require('node-schedule');

// data=[{},{},{},{}]

schedule.scheduleJob('joba - cronid ', '*/2 * * * * *', function (time) {

    console.log(this.name);

});

schedule.scheduleJob('jobb', '*/3 * * * * *', function (time) {

    console.log(this.name);

});
process.stdin.resume();


1. function builder for testings
2.
