const lodash = require("lodash");
let regaddress = [
    [100, 2],
    [105, 4],
    [110, 4],
    [120, 4],
    [150, 2],
    [180, 2],
    [280, 2],
    [500, 2],
    [350, 2],
    [560, 2],
    [570, 2],
    [1000, 6],
];
regaddress = lodash.sortBy(regaddress, (x) => x[0]);
const series = (start) => {
    let temp = [];
    for (let j = start; j < start + 125; j++) {
        temp.push(j);
    }
    return temp;
};
let regrequired = [];
let currentset = [regaddress[0], 0];
for (let i = 0; i < regaddress.length; i++) {
    if (
        regaddress[i][0] + (regaddress[i][1] - 1) - currentset[0][0] > 125 ||
        (regaddress[i][0] + (regaddress[i][1] - 1) - currentset[0][0] < 125 &&
            i + 1 >= regaddress.length)
    ) {
        regrequired.push(series(currentset[0][0]));
        currentset = [regaddress[i], i];
        if (i + 1 >= regaddress.length) {
            regrequired.push(series(regaddress[i][0]));
        }
    }
}
console.log(regrequired);