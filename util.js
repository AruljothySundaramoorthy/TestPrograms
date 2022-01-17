
const random = require('random');
const splitfunction = (splitvalue, position, significance) => {
    return splitvalue.split(significance)[position] ? splitvalue.split(significance)[position] : '';

}

const generaterandomnumber = () => {
    const min = 1000000;
    const max = 99999999;
    return random.int(min, max);
}
module.exports = { splitfunction, generaterandomnumber }