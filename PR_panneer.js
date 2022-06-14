const datefns = require("date-fns");

var dailydata = [];
const data = {
    prlocaltimestamp: "",
    prdata: {
        ereal1: 0,
        ereal2: 0,
        ereal3: 0,
        ereal4: 0,
        ereal5: 0,
        ereal6: 0,
        ereal7: 0,
        ereal8: 0,
        ereal9: 0,
        ereal10: 0,
        ereal11: 0,
        ereal12: 0,
        ereal13: 0,
        ereal14: 0,
        ereal15: 0,
        ereal16: 0,
        ereal17: 0,
        ereal18: 0,
        ereal19: 0,
        ereal20: 0,
        ereal21: 0,
        ereal22: 0,
        ereal23: 0,
        ereal24: 0,
        ereal25: 0,
        ereal26: 0,

        gtireal: 0,
        poa_group1: 523.7088,
        poa_group2: 523.7088,
        poa_group3: 523.7088,
        poa_group4: 523.7088,
        treal_group1: 15.289,
        treal_group2: 15.289,
        treal_group3: 15.289,
        treal_group4: 15.289,
        dccap_group1: 36.5,
        dccap_group2: 15.289,
        dccap_group3: 15.289,
        dccap_group4: 15.289,
        globalstandardtestcondition: 1000,
        plantdccapacity: 323.1,
        temperaturecoefficient: -0.004,
        tref: 53.41,
        contractualavailability: 0.8,
        modulelineardegradationfactor: 0.001,
    },
    prtime: "",
    prtimestamp: "",
};

var timestampvalue = datefns.startOfDay(new Date());
for (let i = 0; i < 1440; i++) {
    timestampvalue = datefns.addMinutes(timestampvalue, 1);
    data.prdata.ereal = Math.floor(Math.random() * 100);
    data.prdata.gtireal = Math.floor(Math.random() * 100);
    data.prdata.poa_group1 = Math.floor(Math.random() * 100);
    data.prdata.poa_group2 = Math.floor(Math.random() * 100);
    data.prdata.poa_group3 = Math.floor(Math.random() * 100);
    data.prdata.poa_group4 = Math.floor(Math.random() * 100);
    data.prdata.treal_group1 = Math.floor(Math.random() * 100);
    data.prdata.treal_group2 = Math.floor(Math.random() * 100);
    data.prdata.treal_group3 = Math.floor(Math.random() * 100);
    data.prdata.treal_group4 = Math.floor(Math.random() * 100);
    data.prdata.dccap_group1 = Math.floor(Math.random() * 100);
    data.prdata.dccap_group2 = Math.floor(Math.random() * 100);
    data.prdata.dccap_group3 = Math.floor(Math.random() * 100);
    data.prdata.dccap_group4 = Math.floor(Math.random() * 100);
    data.prdata.ereal1 = Math.floor(Math.random() * 100),
        data.prdata.ereal2 = Math.floor(Math.random() * 100),
        data.prdata.ereal3 = Math.floor(Math.random() * 100),
        data.prdata.ereal4 = Math.floor(Math.random() * 100),
        data.prdata.ereal5 = Math.floor(Math.random() * 100),
        data.prdata.ereal6 = Math.floor(Math.random() * 100),
        data.prdata.ereal7 = Math.floor(Math.random() * 100),
        data.prdata.ereal8 = Math.floor(Math.random() * 100),
        data.prdata.ereal9 = Math.floor(Math.random() * 100),
        data.prdata.ereal10 = Math.floor(Math.random() * 100),
        data.prdata.ereal11 = Math.floor(Math.random() * 100),
        data.prdata.ereal12 = Math.floor(Math.random() * 100),
        data.prdata.ereal13 = Math.floor(Math.random() * 100),
        data.prdata.ereal14 = Math.floor(Math.random() * 100),
        data.prdata.ereal15 = Math.floor(Math.random() * 100),
        data.prdata.ereal16 = Math.floor(Math.random() * 100),
        data.prdata.ereal17 = Math.floor(Math.random() * 100),
        data.prdata.ereal18 = Math.floor(Math.random() * 100),
        data.prdata.ereal19 = Math.floor(Math.random() * 100),
        data.prdata.ereal20 = Math.floor(Math.random() * 100),
        data.prdata.ereal21 = Math.floor(Math.random() * 100),
        data.prdata.ereal22 = Math.floor(Math.random() * 100),
        data.prdata.ereal23 = Math.floor(Math.random() * 100),
        data.prdata.ereal24 = Math.floor(Math.random() * 100),
        data.prdata.ereal25 = Math.floor(Math.random() * 100),
        data.prdata.ereal26 = Math.floor(Math.random() * 100),

        data.prdata.globalstandardtestcondition = Math.floor(Math.random() * 100);
    data.prdata.plantdccapacity = Math.floor(Math.random() * 100);
    data.prdata.temperaturecoefficient = Math.floor(Math.random() * 100);
    data.prdata.tref = Math.floor(Math.random() * 100);
    data.prdata.contractualavailability = Math.floor(Math.random() * 100);
    data.prdata.modulelineardegradationfactor = Math.floor(Math.random() * 100);
    datavalue = { ...data, prlocaltimestamp: timestampvalue.getTime() };
    dailydata.push(datavalue);
}
console.log(dailydata);
