var { data } = require('./inverterkidata')
let dataval = data.sort(function (a, b) {

    return a.device.localeCompare(b.device, undefined, {

        numeric: true,

        sensitivity: "base",

    });
})
dataval.map((x) => {
    let device = x.device.toUpperCase()
    return x = { ...x, device }
})
console.log(dataval);