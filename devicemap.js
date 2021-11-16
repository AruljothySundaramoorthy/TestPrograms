const temp = {
    inverterunitfailureid: "028d9acf-0828-4a6c-9e64-61ce2efbdc0f",
    breakdownstartdatetime: "2021-11-12 09:20",
    breakdownenddatetime: "2021-11-12 10:30",
    clipppingstartdatetime: "2021-11-12 10:30",
    clippingenddatetime: "2021-11-12 10:30",
    referencepr: 74.5,
    devices: [
        {
            inverterunitname: "028d9acf-0828-4a6c-9e64-61ce2efbdc0f",
            dccapacityfactorfactor: 4232,
            blockname: "",
            invertername: "",
            inverterunitname: ""
        },
        {
            inverterunitname: "028d9acf-0828-4a6c-9e64-61ce2efbdc0f",
            dccapacityfactor: 4232,
        },
        {
            inverterunitname: "028d9acf-0828-4a6c-9e64-61ce2efbdc0f",
            dccapacityfactor: 4232,
        },
        {
            inverterunitname: "028d9acf-0828-4a6c-9e64-61ce2efbdc0f",
            dccapacityfactor: 4232,
        },
        {
            inverterunitname: "028d9acf-0828-4a6c-9e64-61ce2efbdc0f",
            dccapacityfactor: 4232,
        },
        {
            inverterunitname: "028d9acf-0828-4a6c-9e64-61ce2efbdc0f",
            dccapacityfactor: 4232,
        },
    ],
};

const poa = 10;

const data = temp.devices.map((x) => ({
    ...temp,
    devices: undefined,
    poa,
    ...x,
    energyloss: (x.dccapacityfactor * poa * temp.referencepr) / 1000,
}));
console.log(data);
