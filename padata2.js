const express = require('express')
const app = express()
const port = 3000

const data = require("./pada");

const startOfDay = require("date-fns/startOfDay");
const endOfDay = require("date-fns/endOfDay");
const parse = require("date-fns/parse");
const format = require("date-fns/format");
const lodash = require("lodash");
const differenceInMinutes = require("date-fns/differenceInMinutes");
const differenceInDays = require("date-fns/differenceInDays");
const ExcelJS = require('exceljs');
const updateprdata = (option, sheet, inputdata, settingparameters, prtype) => {
    let initialheader = '';
    let initialkey = '';
    let initialdata = inputdata[0];
    switch (option) {
        case 'Yearly PR':
            initialheader = 'Year';
            initialkey = 'datestamp';
            break;
        case 'Monthly PR':
            initialheader = 'Month';
            initialkey = 'datestamp';
            break;
        case 'Daily PR':
            initialheader = 'Date';
            initialkey = 'prtime';
            break;
        default:
            initialheader = 'Timestamp';
            initialkey = 'prtime';
    }
    let rawdatacolumn = [
        {
            header: initialheader,
            key: initialkey,
        },
    ];

    Object.keys(initialdata).forEach((key) => {
        if (
            this.checkcondition(prtype, key)
            && settingparameters[key] !== undefined
        ) {
            rawdatacolumn = [
                ...rawdatacolumn,
                {
                    header: settingparameters[key],
                    key,
                },
            ];
        }
    });

    sheet.columns = rawdatacolumn;
    let rows = [];
    if (option === 'Monthly PR') {
        rows = inputdata.map((m) => {
            const datestamp = format(
                new Date(`${m.datestamp}-01 00:00:00`),
                'MMMMMMM'
            );
            return { ...m, datestamp };
        });
    } else if (option === 'Raw PR') {
        rows = inputdata.map((m) => ({
            ...m,
            prtime: m.prtime,
        }));
    } else {
        rows = inputdata;
    }
    sheet.addRows(rows);
};
const updatepadata = (option, sheet, inputdata) => {
    let initialheader = '';
    let initialkey = '';
    let initialdata = inputdata[0];
    switch (option) {
        case 'MAA':
            initialheader = 'Date';
            initialkey = 'datestamp';
            break;
        default:
            initialheader = 'Timestamp';
            initialkey = 'timeStamp';
            initialdata = inputdata[0].padata;
    }
    let rawdatacolumn = [
        {
            header: initialheader,
            key: initialkey,
        },
    ];

    Object.keys(initialdata).forEach((key) => {
        if (key !== 'datestamp') {
            rawdatacolumn = [
                ...rawdatacolumn,
                {
                    header: key,
                    key,
                },
            ];
        }
    });

    sheet.columns = rawdatacolumn;
    let rows = [];
    if (option === 'Raw PA') {
        rows = inputdata.map((m) => ({
            ...m.padata,
            patime: m.patime,
        }));
    } else {
        rows = inputdata;
    }
    sheet.addRows(rows);
};
const functionbuilder = async (req, res) => {

    const workbook = new ExcelJS.Workbook();
    try {
        const pqmdevicemap = {
            PQM1: [
                "4348e746-42e4-4646-b01b-46254a35a319",
                "203b1379-db14-4a10-a69f-c11646901008",
                "e304ba96-5aec-497e-a0d6-f1052614c45c",
                "fd736690-9af1-4a17-a6b8-0f3d88a999be",
                "d2da70a7-9cdb-4ee9-b43f-ecd4d97697b4",
                "358dc047-75a3-4916-8af4-8ce33d9d3bf7",
                "63e125e1-75d7-4ecd-be91-19ce65622289",
                "b466286e-7d97-4d82-ada1-22de769c9096",
                "7898deba-e875-44db-a01b-f55b0dd14137",
                "2be436d0-f32f-48ca-802a-aabacfbd5439",
                "2d71485c-bc01-451d-94ee-f8633651a02e",
                "f8710a18-6323-42ae-8a84-6eac07703050",
                "7e336281-7200-4a47-95cf-5d6d28a9fec9",
                "9e559c73-78b9-4af2-bc65-f2449ac502bc",
                "cd718be4-1820-42f9-9731-1bb2ff7dfbf4",
                "2ea5fc5d-f20c-4be8-bac1-4b868c548fd8",
                "026e6776-efb4-46fa-836c-0003095aec35",
            ],
            PQM2: [
                "3e431994-2542-41cb-a537-a900c1f09924",
                "571b4132-199f-4d11-83fb-89088ded13b8",
                "456ca845-4b12-4ad9-b34f-8b3dd8378eae",
                "c3603fb0-2da8-446e-b32d-ecc3095778ed",
                "a4d06943-d145-4bd6-b74e-3994eb1c3ac6",
                "87006202-645e-4964-9e36-ea12eff92275",
                "7b294e9f-85e1-4048-8de9-a086319a4fe3",
                "96222071-7f84-40f1-942b-38ab521592e0",
                "55a7c83b-a6ad-456a-9fb2-d491bf87c5a4",
                "0976c1c1-2f89-4866-9ca5-a444d4ba44a2",
                "2be8ba61-43b9-4eb6-8461-4bf3f239de9d",
                "53a84e7d-4d51-4d29-8ce2-31a2c6f98e3b",
                "c69bbc08-0829-41ef-a331-13eeecbde53e",
                "10df39cf-aef4-4b9a-aa6a-ecf58495e184",
                "6fecd564-7325-4086-abf5-56e4b972791b",
                "20912c44-ff0e-41b1-9b00-f15ad5f9e6b7",
            ],
        };
        const blockinfo = [
            {
                blocksortorder: 1,
                blockdisplayname: "MCR",
                blockid: "576201aa-d1bb-4283-88a5-0563d2b371bd",
            },
            {
                blocksortorder: 10,
                blockdisplayname: "IS8",
                blockid: "e36eb571-02a0-42d8-ae06-748da91e8a91",
            },
            {
                blocksortorder: 11,
                blockdisplayname: "IS9",
                blockid: "bfb15c42-14ab-4bbd-a537-239a396fa4f8",
            },
            {
                blocksortorder: 12,
                blockdisplayname: "IS10",
                blockid: "747548aa-c149-4ef1-9d69-675db6273330",
            },
            {
                blocksortorder: 13,
                blockdisplayname: "IS11",
                blockid: "c8b2d063-8dfe-423d-bc41-b755a9fce6a2",
            },
            {
                blocksortorder: 14,
                blockdisplayname: "IS12",
                blockid: "c5ece262-6ebf-4f79-a475-9c5e115c8657",
            },
            {
                blocksortorder: 15,
                blockdisplayname: "IS13",
                blockid: "6090798e-cebe-44fc-8b36-07073c53b1e4",
            },
            {
                blocksortorder: 16,
                blockdisplayname: "IS14",
                blockid: "86590b9a-c1dd-46a7-a358-9b10b5eb7b8e",
            },
            {
                blocksortorder: 17,
                blockdisplayname: "IS15",
                blockid: "04ccdc9a-b53a-442a-8909-adb7c8ce8d0f",
            },
            {
                blocksortorder: 18,
                blockdisplayname: "IS16",
                blockid: "d3f34ed6-492e-45ae-a174-3e06fad95a38",
            },
            {
                blocksortorder: 19,
                blockdisplayname: "IS17",
                blockid: "d6dc8a84-137b-4270-9739-87277ce8b113",
            },
            {
                blocksortorder: 4,
                blockdisplayname: "IS2",
                blockid: "4409d334-43bc-4911-bfd9-c9cd0c08bd03",
            },
            {
                blocksortorder: 2,
                blockdisplayname: "PPC",
                blockid: "5c8177ce-fc8d-4ff8-a207-cbfdc2132a12",
            },
            {
                blocksortorder: 3,
                blockdisplayname: "IS1",
                blockid: "f19d37cb-b7f2-4f8f-80ff-01de8b2f9b4d",
            },
            {
                blocksortorder: 6,
                blockdisplayname: "IS4",
                blockid: "c2ac4a74-70ee-426e-b43e-2d21d4e932f4",
            },
            {
                blocksortorder: 7,
                blockdisplayname: "IS5",
                blockid: "e3f384f3-29ee-45cf-811e-52f738aa233c",
            },
            {
                blocksortorder: 8,
                blockdisplayname: "IS6",
                blockid: "bfba02c2-ace2-45ca-ab07-ed2b5ca55321",
            },
            {
                blocksortorder: 9,
                blockdisplayname: "IS7",
                blockid: "4f544a2b-9440-4cf1-8164-ae978d196171",
            },
            {
                blocksortorder: 5,
                blockdisplayname: "IS3",
                blockid: "eb8e9aa9-0117-4338-b878-9cef7c3466c3",
            },
        ];
        const devicedata = [
            {
                devicesortorder: 1008,
                devicename: "INV1",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "f19d37cb-b7f2-4f8f-80ff-01de8b2f9b4d",
                deviceid: "55a7c83b-a6ad-456a-9fb2-d491bf87c5a4",
            },
            {
                devicesortorder: 1009,
                devicename: "INV2",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "f19d37cb-b7f2-4f8f-80ff-01de8b2f9b4d",
                deviceid: "0976c1c1-2f89-4866-9ca5-a444d4ba44a2",
            },
            {
                devicesortorder: 2010,
                devicename: "INV3",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "4409d334-43bc-4911-bfd9-c9cd0c08bd03",
                deviceid: "2be8ba61-43b9-4eb6-8461-4bf3f239de9d",
            },
            {
                devicesortorder: 2011,
                devicename: "INV4",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "4409d334-43bc-4911-bfd9-c9cd0c08bd03",
                deviceid: "53a84e7d-4d51-4d29-8ce2-31a2c6f98e3b",
            },
            {
                devicesortorder: 3008,
                devicename: "INV5",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "eb8e9aa9-0117-4338-b878-9cef7c3466c3",
                deviceid: "4348e746-42e4-4646-b01b-46254a35a319",
            },
            {
                devicesortorder: 3009,
                devicename: "INV6",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "eb8e9aa9-0117-4338-b878-9cef7c3466c3",
                deviceid: "203b1379-db14-4a10-a69f-c11646901008",
            },
            {
                devicesortorder: 4010,
                devicename: "INV7",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "c2ac4a74-70ee-426e-b43e-2d21d4e932f4",
                deviceid: "e304ba96-5aec-497e-a0d6-f1052614c45c",
            },
            {
                devicesortorder: 4011,
                devicename: "INV8",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "c2ac4a74-70ee-426e-b43e-2d21d4e932f4",
                deviceid: "fd736690-9af1-4a17-a6b8-0f3d88a999be",
            },
            {
                devicesortorder: 5008,
                devicename: "INV9",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "e3f384f3-29ee-45cf-811e-52f738aa233c",
                deviceid: "456ca845-4b12-4ad9-b34f-8b3dd8378eae",
            },
            {
                devicesortorder: 5009,
                devicename: "INV10",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "e3f384f3-29ee-45cf-811e-52f738aa233c",
                deviceid: "c3603fb0-2da8-446e-b32d-ecc3095778ed",
            },
            {
                devicesortorder: 6010,
                devicename: "INV11",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "bfba02c2-ace2-45ca-ab07-ed2b5ca55321",
                deviceid: "a4d06943-d145-4bd6-b74e-3994eb1c3ac6",
            },
            {
                devicesortorder: 6011,
                devicename: "INV12",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "bfba02c2-ace2-45ca-ab07-ed2b5ca55321",
                deviceid: "87006202-645e-4964-9e36-ea12eff92275",
            },
            {
                devicesortorder: 7008,
                devicename: "INV13",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "4f544a2b-9440-4cf1-8164-ae978d196171",
                deviceid: "63e125e1-75d7-4ecd-be91-19ce65622289",
            },
            {
                devicesortorder: 7009,
                devicename: "INV14",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "4f544a2b-9440-4cf1-8164-ae978d196171",
                deviceid: "b466286e-7d97-4d82-ada1-22de769c9096",
            },
            {
                devicesortorder: 8010,
                devicename: "INV15",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "e36eb571-02a0-42d8-ae06-748da91e8a91",
                deviceid: "7898deba-e875-44db-a01b-f55b0dd14137",
            },
            {
                devicesortorder: 8011,
                devicename: "INV16",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "e36eb571-02a0-42d8-ae06-748da91e8a91",
                deviceid: "2be436d0-f32f-48ca-802a-aabacfbd5439",
            },
            {
                devicesortorder: 13008,
                devicename: "INV25",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "6090798e-cebe-44fc-8b36-07073c53b1e4",
                deviceid: "c69bbc08-0829-41ef-a331-13eeecbde53e",
            },
            {
                devicesortorder: 13009,
                devicename: "INV26",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "6090798e-cebe-44fc-8b36-07073c53b1e4",
                deviceid: "10df39cf-aef4-4b9a-aa6a-ecf58495e184",
            },
            {
                devicesortorder: 14010,
                devicename: "INV27",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "86590b9a-c1dd-46a7-a358-9b10b5eb7b8e",
                deviceid: "6fecd564-7325-4086-abf5-56e4b972791b",
            },
            {
                devicesortorder: 14011,
                devicename: "INV28",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "86590b9a-c1dd-46a7-a358-9b10b5eb7b8e",
                deviceid: "20912c44-ff0e-41b1-9b00-f15ad5f9e6b7",
            },
            {
                devicesortorder: 16009,
                devicename: "INV30",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "d3f34ed6-492e-45ae-a174-3e06fad95a38",
                deviceid: "9e559c73-78b9-4af2-bc65-f2449ac502bc",
            },
            {
                devicesortorder: 16010,
                devicename: "INV31",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "d3f34ed6-492e-45ae-a174-3e06fad95a38",
                deviceid: "cd718be4-1820-42f9-9731-1bb2ff7dfbf4",
            },
            {
                devicesortorder: 17011,
                devicename: "INV32",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "d6dc8a84-137b-4270-9739-87277ce8b113",
                deviceid: "2ea5fc5d-f20c-4be8-bac1-4b868c548fd8",
            },
            {
                devicesortorder: 17012,
                devicename: "INV33",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "d6dc8a84-137b-4270-9739-87277ce8b113",
                deviceid: "026e6776-efb4-46fa-836c-0003095aec35",
            },
            {
                devicesortorder: 9012,
                devicename: "INV17",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "bfb15c42-14ab-4bbd-a537-239a396fa4f8",
                deviceid: "7b294e9f-85e1-4048-8de9-a086319a4fe3",
            },
            {
                devicesortorder: 9013,
                devicename: "INV18",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "bfb15c42-14ab-4bbd-a537-239a396fa4f8",
                deviceid: "96222071-7f84-40f1-942b-38ab521592e0",
            },
            {
                devicesortorder: 10014,
                devicename: "INV19",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "747548aa-c149-4ef1-9d69-675db6273330",
                deviceid: "3e431994-2542-41cb-a537-a900c1f09924",
            },
            {
                devicesortorder: 10015,
                devicename: "INV20",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "747548aa-c149-4ef1-9d69-675db6273330",
                deviceid: "571b4132-199f-4d11-83fb-89088ded13b8",
            },
            {
                devicesortorder: 11012,
                devicename: "INV21",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "c8b2d063-8dfe-423d-bc41-b755a9fce6a2",
                deviceid: "358dc047-75a3-4916-8af4-8ce33d9d3bf7",
            },
            {
                devicesortorder: 11013,
                devicename: "INV22",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "c8b2d063-8dfe-423d-bc41-b755a9fce6a2",
                deviceid: "2d71485c-bc01-451d-94ee-f8633651a02e",
            },
            {
                devicesortorder: 12014,
                devicename: "INV23",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "c5ece262-6ebf-4f79-a475-9c5e115c8657",
                deviceid: "d2da70a7-9cdb-4ee9-b43f-ecd4d97697b4",
            },
            {
                devicesortorder: 12015,
                devicename: "INV24",
                devicedisplayname: "Inverter2",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "c5ece262-6ebf-4f79-a475-9c5e115c8657",
                deviceid: "f8710a18-6323-42ae-8a84-6eac07703050",
            },
            {
                devicesortorder: 15006,
                devicename: "INV29",
                devicedisplayname: "Inverter1",
                devicetypeid: 3,
                deviceunhealthypolling: 4,
                blockid: "04ccdc9a-b53a-442a-8909-adb7c8ce8d0f",
                deviceid: "7e336281-7200-4a47-95cf-5d6d28a9fec9",
            },
        ];
        let deviceinfo = [];
        devicedata.map((f) => {

            var a = blockinfo.find((x) => x.blockid == f.blockid)
            deviceinfo[f.deviceid] = `${a.blockdisplayname} ${f.devicedisplayname}`

        })
        console.log(deviceinfo)
        const overalldccapacity = 66052.82;
        let inverterpqmmap = {};
        Object.entries(pqmdevicemap).forEach((d) => {
            inverterpqmmap = {
                ...inverterpqmmap,
                ...Object.fromEntries(d[1].map((c) => [c, d[0]])),
            };
        });

        const startdata = startOfDay(new Date());
        const t = lodash.groupBy(data, (x) => {
            const dateval = parse(x.patimestamp, "yyyyMMddHHmm", new Date());

            return Math.floor(differenceInMinutes(dateval, startdata) / 5);
        });

        const c = Object.keys(t[Object.keys(t)[0]][0].padata.devices);
        const maindata = Object.fromEntries(
            Object.entries(t).map((e) => {
                const key = format(
                    parse(e[1][0].patimestamp, "yyyyMMddHHmm", new Date()),
                    "dd-MM-yyyy HH:mm"
                );
                let page2entries = c
                    .filter((f) => f !== "PQM1" && f !== "PQM2")
                    .map((device) => {
                        const inverteravailability =
                            (lodash.meanBy(e[1], (ed) => ed.padata.devices[device].INV_STS) *
                                100) /
                            1;
                        const inverterdccapacity = lodash.sumBy(
                            e[1],
                            (ed) => ed.padata.devices[device].dccapacity
                        );
                        const pqmdevice = inverterpqmmap[device];
                        const dccapacity = e[1].map((x) => ({
                            status: x.padata.devices[device].INV_STS,
                            dccapccitypqm:
                                x.padata.devices[pqmdevice] == 0
                                    ? x.padata.devices[device].dccapacity *
                                    x.padata.devices[device].INV_STS
                                    : x.padata.devices[device].dccapacity,
                        }));
                        const pqmdevicestatus = lodash.sumBy(
                            e[1],
                            (x) => x.padata.devices[pqmdevice]
                        );
                        const totalinverteravailibility =
                            (lodash.sumBy(dccapacity, "dccapccitypqm") / dccapacity.length) *
                            (inverteravailability / 100);
                        console.log(deviceinfo);
                        return [
                            deviceinfo[device],
                            {
                                inverteravailability,
                                inverterdccapacity,
                                pqmdevice,
                                dccapacity,
                                pqmdevicestatus,
                                totalinverteravailibility,
                            },
                        ];
                    });
                const actualavailability = parseFloat(
                    (
                        (lodash.sumBy(page2entries, (x) => x[1].totalinverteravailibility) /
                            overalldccapacity) *
                        100
                    ).toFixed(3)
                );
                const pqm1 = lodash.sumBy(
                    page2entries.filter(
                        (x) => x[1].pqmdevice === "PQM1" && x[1].pqmdevicestatus === 1
                    )
                );
                const pqm2 = lodash.sumBy(
                    page2entries.filter(
                        (x) => x[1].pqmdevice === "PQM2" && x[1].pqmdevicestatus === 1
                    )
                );
                page2entries = lodash.sortBy(page2entries, (x) => x[1])
                const page2 = Object.fromEntries(page2entries);

                return [key, { actualavailability, page2, pqm1, pqm2 }];
            })
        );

        const daydata = lodash.groupBy(Object.entries(maindata), (x) => {
            const dateval = parse(x[0], "dd-MM-yyyy HH:mm", new Date());

            return Math.floor(differenceInDays(dateval, startdata) / 1);
        });
        const da2data = []
        let datavalue = { datestamp: 0, value: 0 }
        // return {
        Object.entries(daydata).map((x) => {
            datavalue.datestamp = x[1][0][0]

            datavalue.value = lodash.meanBy(x[1], (y) => {
                return y[1].actualavailability;
            })

            da2data.push(datavalue)
        })
        // = Object.entries(daydata).map((x) => {
        // return {
        //     [x[1][0][0]]: lodash.meanBy(x[1], (y) => {
        //         return y[1].actualavailability;
        //     }),
        // };
        // });
        const sheet = workbook.addWorksheet('MAA');
        await updatepadata(
            'MAA',
            sheet,
            da2data
        );
        // workbook.addWorksheet('INV_AVAIL');
        // await updatepadata(
        //     'INV_AVAIL',
        //     sheet,
        //     da2data
        // );

        let worksheet = workbook.addWorksheet('INV_AVAIL');
        // console.log(maindata);
        const inv_avl_colmn = [{ header: 'Timestamp', key: 'timestamp' }];
        const unique_column_name = {};
        const inv_avl_row = []
        for (timestamp in maindata) {
            let inv_avl_row_obj = [];
            inv_avl_row_obj.push(timestamp);
            for (device in maindata[timestamp].page2) {
                unique_column_name[device] = { header: device, key: device }
                inv_avl_row_obj.push(maindata[timestamp].page2[device].inverteravailability);
            }
            inv_avl_row.push(inv_avl_row_obj)

        }

        for (columnname in unique_column_name) {
            inv_avl_colmn.push({ header: columnname, key: columnname })
        }
        worksheet.columns = inv_avl_colmn
        worksheet.addRows(inv_avl_row);
        // await workbook.xlsx.writeFile('data_swift.xlsx')



        workbook.addWorksheet('WEIGHTED_AVAIL');
        worksheet = workbook.getWorksheet('WEIGHTED_AVAIL');
        const inv_weighted_colmn = [{ header: 'Timestamp', key: 'timestamp' }];
        const unique_weighted_column_name = [];
        const unique_weightedpqm_column_name = {};
        let unique_weightedavailability = 0;
        const inv_weighted_row = []
        for (timestamp in maindata) {
            let inv_weighted_row_obj = [];
            inv_weighted_row_obj.push(timestamp);
            for (device in maindata[timestamp].page2) {
                // unique_weighted_column_name[device] = { header: device, key: device }
                inv_weighted_row_obj.push(maindata[timestamp].page2[device].inverterdccapacity);
                if (!unique_weighted_column_name.includes(device)) {
                    unique_weighted_column_name.push(device)
                    unique_weightedavailability += maindata[timestamp].page2[device].totalinverteravailibility


                }
                if (unique_weightedpqm_column_name[maindata[timestamp].page2[device].pqmdevice] == undefined) {
                    unique_weightedpqm_column_name[maindata[timestamp].page2[device].pqmdevice] = maindata[timestamp].page2[device].pqmdevicestatus
                } else {
                    unique_weightedpqm_column_name[maindata[timestamp].page2[device].pqmdevice] += maindata[timestamp].page2[device].pqmdevicestatus
                }




            }
            for (keys in unique_weightedpqm_column_name) {
                inv_weighted_row_obj.push(unique_weightedpqm_column_name[keys])
            }
            inv_weighted_row_obj.push((unique_weightedavailability / overalldccapacity) * 100)
            inv_weighted_row.push(inv_weighted_row_obj)

        }


        for (let i = 0; i < unique_weighted_column_name.length; i++) {
            inv_weighted_colmn.push({ header: unique_weighted_column_name[i], key: unique_weighted_column_name[i] })
        }

        for (pqm in unique_weightedpqm_column_name) {

            inv_weighted_colmn.push({ header: pqm, key: pqm })
        }
        inv_weighted_colmn.push({ header: 'Availability', key: 'Availability' })
        // for (columnname in unique_weighted_pqm_column_name) {
        // }
        // inv_weighted_colmn.push({ header: columnname, key: columnname })
        worksheet.columns = inv_weighted_colmn
        worksheet.addRows(inv_weighted_row);

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${`pareport${format(
                new Date(),
                'yyyyMMddHHmmss'
            )}.xlsx`}`
        );
        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (e) {
        console.log(e);
    }
}

app.get('/', (req, res) => {
    // res.send('Hello World!')
    functionbuilder(req, res)

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})