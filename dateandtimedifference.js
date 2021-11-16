const differenceInMinutes = require("date-fns/differenceInMinutes");
const differenceInHours = require("date-fns/differenceInHours");
const { addMinutes } = require("date-fns");
let a = new Date();
let b = new Date('2021-11-16 11:20:33')


const datecheckfunction = () => {

    let runninghours = differenceInHours(a, b);
    const runningminutes = differenceInMinutes(a, b);
    if (!runninghours) {
        runninghours = 0
    }
    const minutes = isNaN((runninghours * 60) - runningminutes) ? 0 : (runninghours * 60) - runningminutes
    const plantrunninghours = `${runninghours}: ${minutes}`;
    console.log(plantrunninghours)

}
datecheckfunction();
