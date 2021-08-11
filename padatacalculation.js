
const data = require('./pada')

const startOfDay = require('date-fns/startOfDay');
const endOfDay = require('date-fns/endOfDay');
const parse = require('date-fns/parse');
const format = require('date-fns/format')
const lodash = require("lodash");
const differenceInMinutes = require('date-fns/differenceInMinutes')

try {

    const startdata = startOfDay(new Date());
    const t = lodash.groupBy(data, (x) => {
        const dateval = parse(x.patimestamp, 'yyyyMMddHHmm', new Date())

        return Math.floor(differenceInMinutes(dateval, startdata) / 5)
    })

    const c = Object.keys(t[Object.keys(t)[0]][0].padata.devices).filter((f) => f !== 'PQM1' && f !== 'PQM2')
    const f = Object.fromEntries(Object.entries(t).map((e) =>
        [format(parse(e[1][0].patimestamp, 'yyyyMMddHHmm', new Date()), 'dd-MM-yyyy HH:mm'), Object.fromEntries(c.map((device) =>

            [device, ((lodash.meanBy(e[1], ((ed) => ed.padata.devices[device].INV_STS)) * 100) / 1)]
        ))]
    ))
    console.log(f)

} catch (e) {
    console.log(e)
}