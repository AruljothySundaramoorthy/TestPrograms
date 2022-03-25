const lodash = require('lodash')

const data = [
    {
        date: "2022-01-01T18:30:00.000Z",
        insolationPOA: 4567.0125,
        exportYear: -689119149.0456808,
        importYear: -10565.37403999814,
        PR: 68.64793778801844,
        ACCUF: 4.292643678160921,
        DCCUF: 5.074919540229884,
        yield: -0.3242183908045975,
        tPR: null,
        wPR: -11.051890080428956,
        windDirection: 44.49135902636917,
        windSpeed: 18.80628803245436,
        pa: null,
        ga: 100,
    },
    {
        date: "2021-12-31T18:30:00.000Z",
        insolationPOA: 47.633,
        exportYear: 2704483.0102800895,
        importYear: 4846.735132500062,
        PR: 78.01555555555555,
        ACCUF: 21.348888888888887,
        DCCUF: 17.198888888888888,
        yield: 4.127777777777777,
        tPR: null,
        wPR: 82.0725,
        windDirection: 47.281666666666666,
        windSpeed: 13.62,
        pa: 88.40333333333334,
        ga: 100,
    },
];



Object.entries(datavalue).forEach(([key, value]) => {
    datavalue[key] = lodash.sumBy(data, ((x) => x[key]));
})
console.log(datavalue)
