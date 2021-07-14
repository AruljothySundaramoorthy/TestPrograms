const schedule = require('node-schedule');

// data=[{},{},{},{}]

schedule.scheduleJob('joba - cronid ', '*/2 * * * * *', function (time) {

    console.log(this.name);

});

const schedule = require('node-schedule');
schedule.scheduleJob('jobb', '*/3 * * * * *', function (time) {

    console.log(this.name);

});
process.stdin.resume();


