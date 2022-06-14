const datefns = require('date-fns')

var dailydata = [

];

let hourlydata = {
    "plantid": "61f7d6a85d965045c2618041",
    "planttimestamp": 1653378576762,
    "data": {
        "activepower": 123,
        "peakpower": 123,
        "kwhExport": 123,
        "kwhImport": 123,
        "kwhNetExport": 123,
        "temperatureCorrectedPR": 123,
        "pr": 123,
        "pa": 123,
        "ga": 123,
        "accuf": 123,
        "dccuf": 123,
        "co2": 123,
        "gas": 123,
        "coal": 123,
        "poa": 123,
        "yield": 123,
        "inverters": {
            "6221cbac95c19c7003afd86d": {
                "capacity": 123,
                "kwhExport": 123,
                "downtime": 123,
                "pr": 123,
                "yield": 123,
                "ia": 123,
                "efficiency": 123
            },
            "6221cbac95c19c7003afd8af": {
                "capacity": 123,
                "kwhExport": 123,
                "downtime": 123,
                "pr": 123,
                "yield": 123,
                "ia": 123,
                "efficiency": 123
            },
            "6221cbad95c19c7003afd8c5": {
                "capacity": 123,
                "kwhExport": 123,
                "downtime": 123,
                "pr": 123,
                "yield": 123,
                "ia": 123,
                "efficiency": 123
            },
            "6221cbac95c19c7003afd883": {
                "capacity": 123,
                "kwhExport": 123,
                "downtime": 123,
                "pr": 123,
                "yield": 123,
                "ia": 123,
                "efficiency": 123
            },
            "6221cbac95c19c7003afd899": {
                "capacity": 123,
                "kwhExport": 123,
                "downtime": 123,
                "pr": 123,
                "yield": 123,
                "ia": 123,
                "efficiency": 123
            },
            "6221cbad95c19c7003afd8db": {
                "capacity": 123,
                "kwhExport": 123,
                "downtime": 123,
                "pr": 123,
                "yield": 123,
                "ia": 123,
                "efficiency": 123
            }
        }
    }
}

var timestampvalue = datefns.startOfDay(new Date())
for (let i = 0; i < 30; i++) {
    timestampvalue = datefns.addDays(timestampvalue, 1)
    hourlydata.data.pr = Math.floor(Math.random() * 100)
    hourlydata.data.pa = Math.floor(Math.random() * 100)
    hourlydata.data.ga = Math.floor(Math.random() * 100)
    hourlydata.data.accuf = Math.floor(Math.random() * 100)
    hourlydata = { ...hourlydata, planttimestamp: timestampvalue.getTime() }
    dailydata.push(hourlydata);
}
console.log(dailydata)