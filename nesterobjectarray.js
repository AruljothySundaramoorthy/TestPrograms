const lodash = require("lodash");
const data = [
    { a: { device1: {} } },
    { a: { device2: {} } },
    { c: { device3: {} } },
    { d: { device4: {} } },
    { e: { device5: {} } },
];

const mergedata = data.reduce((a, b) => (lodash.merge(a, b)));
console.log(mergedata);




