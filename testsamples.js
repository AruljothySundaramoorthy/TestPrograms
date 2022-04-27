const lodash = require('lodash')
const applicationparameter = require('@armax_cloud/allspark-data-models/models/enum/applicationparameter.enum')

// // const a = [
// //   'activepower',
// //   'kwhExportToday',
// //   'kwhExportTotal',
// //   'kwhImportToday',
// //   'kwhImportTotal',
// //   'kwhNetExportToday',
// //   'kwhNetExportTotal',
// //   'yield',
// //   'PR',
// //   'PA',
// //   'GA',
// //   'ACCUF',
// //   'DCCUF',
// //   'CO2',
// //   'GAS',
// //   'COAL',
// //   'POA',
// //   'peakpower',
// //   'temperatureCorrectedPR',
// // ];
// // const b = ['id', 'salary',];
// // const lodash = require('lodash');
// // const employeedata = require('./mockdata/MOCK_DATA_EMPLOYEE.json');
// // function testdata() {

// //   // const datra = Object.fromEntries(a.map((item) => [item, Math.random()]));
// //   // console.log(datra)
// //   const datga = Object.fromEntries(b.map((item) => [item, (lodash.sumBy(employeedata, item) * 1000)]));
// //   console.log(datga)

// // }

// // testdata();

// // plants = '61f7d6a85d965045c2618041, 61f7d6b35d965045c26180f2,61f7d6bd5d965045c26181a5';

// // const plant = Object.fromEntries(plants.split(',').map((item) => [item, { daily: {}, weekly: {}, monthly: {}, yearly: {} }]));
// // cosole.log(plant);

// const data = {
//     0: "NONE",
//     1: "PLC",
//     2: "PPC",
//     3: "INVERTER",
//     4: "INVERTERUNIT",
//     5: "SMB",
//     6: "SCB",
//     7: "WMS",
//     8: "SMS",
//     9: "UPS",
//     10: "ANNUNCIATOR",
//     11: "RELAY",
//     12: "AUXMETER",
//     13: "NCU",
//     14: "SPC",
//     15: "PQM",
//     16: "PROMETER",
//     17: "SWITCH",
//     18: "PC",
//     19: "BATTERYCHARGER",
//     20: "SMARTLOGGER",
//     21: "MAINMETER",
//     22: "CHECKMETER",
//     23: "GPS",
//     24: "FAS",
//     25: "METER",
//     26: "TVM",
//     27: "VCB",
//     28: "TRANSFORMER",
//     29: "LTPANEL",
//     30: "PLCPANEL",
//     31: "CCTV",
//     32: "LBS",
//     33: "RTCC",
//     34: "PRINTER",
//     35: "FIREWALL",
//     36: "RTU",
//     37: "SAS",
//     38: "NIFPS",
//     39: "PYRANOMETER",
//     40: "PVMODULETEMPSENSOR",
// };

// var swapdataayElements = function (data, indexA, indexB) {
//     var temp = data[indexA];
//     data[indexA] = data[indexB];
//     data[indexB] = temp;
// };
// console.log(swapdataayElements(data, 0, 1));
// const checkfunction = async (
//     parameter1,
//     parameter2,
//     parameter3,
//     parameter4
// ) => {
//     const dbconnection = parameter1;
//     const { prreport } = parameter2;
//     const {
//         log,
//         lodash,
//         parse,
//         differenceInMinutes,
//         format,
//         endOfDay,
//         startOfDay,
//     } = parameter3;
//     let { printerval, startdate, enddate } = parameter4;
//     startdate = startOfDay(new Date(startdate));
//     enddate = endOfDay(new Date(enddate));
//     const rawdata = await prreport(dbconnection)
//         .find({ prlocaltimestamp: { $gte: startdate, $lte: enddate } })
//         .lean();
//     try {
//         const parsedrawdata = lodash.groupBy(rawdata, (x) => {
//             const dateval = parse(
//                 format(new Date(x.prlocaltimestamp), "yyyyMMddHHmm"),
//                 "yyyyMMddHHmm",
//                 new Date()
//             );
//             return Math.floor(differenceInMinutes(dateval, startdate) / printerval);
//         });
//         let prdata = [];
//         Object.values(parsedrawdata).forEach((data) => {
//             let tempnumerator = 0;
//             let tempdenominator = 0;
//             let tempprvalue = {
//                 prlocaltimestamp: 0,
//                 poa: 0,
//                 gtireal: 0,
//                 treal: 0,
//                 globalstandardtestcondition: 0,
//                 temperaturecoefficient: 0,
//                 tref: 0,
//                 eral: 0,
//                 plantdccapacity: 0,
//                 numerator: 0,
//                 denaminator: 0,
//                 prreal: 0,
//             };
//             let temppoavalue = isNaN(
//                 lodash.sumBy(Object.values(data), (x) => x.prdata.poa)
//             )
//                 ? 0
//                 : lodash.sumBy(Object.values(data), (x) => x.prdata.poa);
//             Object.values(data).forEach((dataval) => {
//                 if (dataval.prdata.numerator > 0 && dataval.prdata.denaminator > 0) {
//                     tempnumerator += parseFloat(dataval.prdata.numerator.toFixed(3));
//                     tempdenominator += parseFloat(dataval.prdata.denaminator.toFixed(3));
//                 }
//             });
//             (tempprvalue.poa = temppoavalue),
//                 (tempprvalue.prlocaltimestamp = data[0].prlocaltimestamp),
//                 (tempprvalue.gtireal = lodash.meanBy(data, (x) => x.prdata.gtireal)),
//                 (tempprvalue.treal = lodash.meanBy(data, (x) => x.prdata.treal)),
//                 (tempprvalue.plantdccapacity = data[0].prdata.plantdccapacity);
//             tempprvalue.globalstandardtestcondition =
//                 data[0].prdata.globalstandardtestcondition;
//             tempprvalue.temperaturecoefficient =
//                 data[0].prdata.temperaturecoefficient;
//             tempprvalue.tref = data[0].prdata.tref;
//             let tempfilterdata = Object.values(data).filter((x) => x.prdata.poa > 50);
//             if (tempprvalue.poa > 50 && tempfilterdata.length > 0) {
//                 const numneratorvalue = lodash.sumBy(tempfilterdata, (x) =>
//                     x.prdata.denaminator > 0 && x.prdata.numerator > 0
//                         ? x.prdata.numerator
//                         : 0
//                 );
//                 const denaminatorvalue = lodash.sumBy(tempfilterdata, (x) =>
//                     x.prdata.denaminator > 0 && x.prdata.numerator > 0
//                         ? x.prdata.denaminator
//                         : 0
//                 );
//                 tempprvalue.eral = lodash.sumBy(tempfilterdata, (x) => x.prdata.ereal);
//                 tempprvalue.numerator = numneratorvalue;
//                 tempprvalue.denaminator = denaminatorvalue;
//                 tempprvalue.numeratorreal = numneratorvalue;
//                 tempprvalue.prreal = isNaN((numneratorvalue / denaminatorvalue) * 100)
//                     ? 0
//                     : (numneratorvalue / denaminatorvalue) * 100;
//             }
//             prdata.push(tempprvalue);
//         });
//         return prdata;
//     } catch (e) {
//         log.error(e);
//     }
// };

// const { dbconnection, iredis, kafkaproducer } = parameter1;
// const { cronjob } = parameter2;
// const { adm, ade, log, lodash } = parameter3;
// try {
//     const inverterdata = JSON.parse(
//         await iredis.getData("csbpl-server-internal-DEVICETYPE-3")
//     );
//     var inverterData = [];
//     for (let i = 0; i < inverterdata.length; i++) {
//         const data = JSON.parse(await iredis.getData(inverterdata[i]));
//         if (data) {
//             inverterData.push(data.parameters.IS_HEALTHY);
//         }
//     }
//     const temppadata = {
//         totalInverter: inverterData.length,
//         communicatedInverter: inverterData.filter((item) => item === true).length,
//         modbusaddress: 3000,
//         modbusvalue: 200,
//         modbusfunctioncode: 1,
//         modbusdatatype: 6,
//     };
//     await kafkaproducer
//         .sendMessage(
//             temppadata,
//             new Date().getTime().toString(),
//             `${ade.kafkatopic.MODBUSSERVERDATA}`
//         )
//         .catch((e) => {
//             log.error(e);
//         });
// } catch (e) {
//     log.error(e);
// }






const healthywms = [
    {
        devicedatacron: {
            index: 2,
            cron: "0/3 * * * * *",
        },
        devicemodbusmeta: {
            devicemodbusunitid: 1,
        },
        deviceopcuameta: {
            deviceopcuaendpoint: null,
        },
        deviceip: "192.168.2.11",
        devicesortorder: 2023,
        devicedefaultaggregate: 0,
        menudisplay: true,
        devicesubscriptions: [
            "Vd9COm4BH9iu",
            "t6W8egeIzLjt",
        ],
        dependencydevices: [
        ],
        devicecommunicationalarmenabled: true,
        devicecommunicationeventenabled: false,
        updatedat: "2022-03-31T10:53:44.782Z",
        _id: "6246cfcc9fc9cb0014ca0d0a",
        devicename: "WMS",
        devicedisplayname: "WMS",
        devicetypeid: 7,
        deviceport: 502,
        deviceprotocol: 1,
        deviceunhealthypolling: 4,
        devicegeneralinfo: [
            {
                updatedat: "2022-04-22T16:51:48.094Z",
                _id: "6262dd248f366900148bd12a",
                name: "MODEL",
                value: "MEATECH",
                updatedby: "Developer(dev@armaxindia.com)",
            },
        ],
        blockid: "b873c6f5-7ad7-4a3b-aaf7-a6a86958bff6",
        updatedby: "Developer(dev@armaxindia.com)",
        devicecode: 1000440,
        deviceid: "adb0c84d-6a5f-4820-96b3-04042a711424",
        redundant: false,
        blockip: [
            "192.168.2.14",
        ],
        devicemeta: {
            devicetypeid: 7,
            devicename: "WMS",
            devicedisplayname: "WMS",
            blockdevicedisplayname: "IS2-WMS",
            blockname: "IS2",
        },
        parameters: {
            WMS_BAT_VLT: 13.92,
            WMS_AMB_TEMP: 40.516,
            WMS_HUM: 6.938,
            WMS_INST_RAIN: 0,
            WMS_TOT_RAIN: 0,
            WMS_GHI: 561.87,
            WMS_GHI_DW: 73.236,
            WMS_POA: 578.539,
            WMS_POA_DW: 78.071,
            WMS_WND_SPD: 0.89,
            WMS_WND_DIR: 186.67,
            WMS_BAR_PRES: null,
            WMS_MDL_TEMP1: null,
            WMS_CLOUD_COVER: -22.153,
            WMS_DIFFUSE: null,
            WMS_DIRECT: null,
            WMS_GLOBAL: null,
            WMS_MDL_TEMP2: null,
            IS_HEALTHY: true,
        },
        metadata: {
            WMS_BAT_VLT: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_AMB_TEMP: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_HUM: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_INST_RAIN: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            WMS_TOT_RAIN: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            WMS_GHI: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_GHI_DW: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_POA: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_POA_DW: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_WND_SPD: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_WND_DIR: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_BAR_PRES: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            WMS_MDL_TEMP1: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            WMS_CLOUD_COVER: {
                timestamp: "2022-04-23T10:45:12.037Z",
            },
            WMS_DIFFUSE: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            WMS_DIRECT: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            WMS_GLOBAL: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            WMS_MDL_TEMP2: {
                timestamp: "2022-04-23T05:19:51.022Z",
            },
            IS_HEALTHY: {
                timestamp: "2022-04-23T10:45:13.055Z",
            },
        },
        starttime: "2022-04-23T10:45:13.066Z",
        endtime: "2022-04-23T10:45:13.066Z",
        starttimestamp: "202204231045",
        endtimestamp: "202204231045",
        localstarttime: "2022-04-23T16:15:13.066Z",
        localstarttimestamp: 1650730513066,
    },
    {
        devicedatacron: {
            index: 2,
            cron: "0/3 * * * * *",
        },
        devicemodbusmeta: {
            devicemodbusunitid: 1,
        },
        deviceopcuameta: {
            deviceopcuaendpoint: null,
        },
        deviceip: "192.168.4.11",
        devicesortorder: 4024,
        devicedefaultaggregate: 0,
        menudisplay: true,
        devicesubscriptions: [
            "Vd9COm4BH9iu",
            "t6W8egeIzLjt",
        ],
        dependencydevices: [
        ],
        devicecommunicationalarmenabled: true,
        devicecommunicationeventenabled: false,
        updatedat: "2022-03-22T03:40:39.047Z",
        _id: "623ee492f5b8810014cbe3a4",
        devicename: "WMS",
        devicedisplayname: "WMS",
        devicetypeid: 7,
        deviceport: 502,
        deviceprotocol: 1,
        deviceunhealthypolling: 4,
        devicegeneralinfo: [
            {
                updatedat: "2022-04-22T16:51:48.101Z",
                _id: "6262dd248f366900148bd184",
                name: "MODEL",
                value: "MEATECH",
                updatedby: "Developer(dev@armaxindia.com)",
            },
        ],
        blockid: "641d2ec7-7dad-4697-b735-e3bc1a1d1110",
        updatedby: "Developer(dev@armaxindia.com)",
        devicecode: 1000438,
        deviceid: "0ad7ae29-a22b-4b80-a383-2bdfa3cb0561",
        redundant: false,
        blockip: [
            "192.168.4.14",
        ],
        devicemeta: {
            devicetypeid: 7,
            devicename: "WMS",
            devicedisplayname: "WMS",
            blockdevicedisplayname: "IS4-WMS",
            blockname: "IS4",
        },
        parameters: {
            WMS_BAT_VLT: 13.635,
            WMS_AMB_TEMP: 40.323,
            WMS_HUM: 6.744,
            WMS_INST_RAIN: 0,
            WMS_TOT_RAIN: 0,
            WMS_GHI: 585.198,
            WMS_GHI_DW: 195.656,
            WMS_POA: 596.348,
            WMS_POA_DW: 190.438,
            WMS_WND_SPD: 1.13,
            WMS_WND_DIR: 185.62,
            WMS_BAR_PRES: 973.8,
            WMS_MDL_TEMP1: 43.815,
            WMS_CLOUD_COVER: 0.177,
            WMS_DIFFUSE: 0,
            WMS_DIRECT: 2.338459879154962e+23,
            WMS_GLOBAL: 2.7246422861940864e+23,
            WMS_MDL_TEMP2: 43.941,
            IS_HEALTHY: true,
        },
        metadata: {
            WMS_BAT_VLT: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_AMB_TEMP: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_HUM: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_INST_RAIN: {
                timestamp: "2022-04-22T17:45:09.069Z",
            },
            WMS_TOT_RAIN: {
                timestamp: "2022-04-22T17:45:09.069Z",
            },
            WMS_GHI: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_GHI_DW: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_POA: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_POA_DW: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_WND_SPD: {
                timestamp: "2022-04-23T10:45:15.034Z",
            },
            WMS_WND_DIR: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_BAR_PRES: {
                timestamp: "2022-04-23T10:42:24.013Z",
            },
            WMS_MDL_TEMP1: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            WMS_CLOUD_COVER: {
                timestamp: "2022-04-23T10:43:03.029Z",
            },
            WMS_DIFFUSE: {
                timestamp: "2022-04-22T17:45:09.069Z",
            },
            WMS_DIRECT: {
                timestamp: "2022-04-22T17:45:09.069Z",
            },
            WMS_GLOBAL: {
                timestamp: "2022-04-22T17:45:09.069Z",
            },
            WMS_MDL_TEMP2: {
                timestamp: "2022-04-23T10:45:24.023Z",
            },
            IS_HEALTHY: {
                timestamp: "2022-04-23T10:45:25.110Z",
            },
        },
        starttime: "2022-04-23T10:45:25.119Z",
        endtime: "2022-04-23T10:45:25.119Z",
        starttimestamp: "202204231045",
        endtimestamp: "202204231045",
        localstarttime: "2022-04-23T16:15:25.119Z",
        localstarttimestamp: 1650730525119,
    },
    {
        devicedatacron: {
            index: 2,
            cron: "0/3 * * * * *",
        },
        devicemodbusmeta: {
            devicemodbusunitid: 1,
        },
        deviceopcuameta: {
            deviceopcuaendpoint: null,
        },
        deviceip: "192.168.9.11",
        devicesortorder: 9023,
        devicedefaultaggregate: 0,
        menudisplay: true,
        devicesubscriptions: [
            "Vd9COm4BH9iu",
            "t6W8egeIzLjt",
        ],
        dependencydevices: [
        ],
        devicecommunicationalarmenabled: true,
        devicecommunicationeventenabled: false,
        updatedat: "2022-03-31T10:53:44.782Z",
        _id: "6246cfcc9fc9cb0014ca0d10",
        devicename: "WMS",
        devicedisplayname: "WMS",
        devicetypeid: 7,
        deviceport: 502,
        deviceprotocol: 1,
        deviceunhealthypolling: 4,
        devicegeneralinfo: [
            {
                updatedat: "2022-04-22T16:51:48.119Z",
                _id: "6262dd248f366900148bd26d",
                name: "MODEL",
                value: "MEATECH",
                updatedby: "Developer(dev@armaxindia.com)",
            },
        ],
        blockid: "c1a6618a-0cf6-407f-a146-60a8fd3dc845",
        updatedby: "Developer(dev@armaxindia.com)",
        devicecode: 1000442,
        deviceid: "49603fa3-c009-4144-988c-e654d2e663b7",
        redundant: false,
        blockip: [
            "192.168.9.14",
        ],
        devicemeta: {
            devicetypeid: 7,
            devicename: "WMS",
            devicedisplayname: "WMS",
            blockdevicedisplayname: "IS9-WMS",
            blockname: "IS9",
        },
        parameters: {
            WMS_BAT_VLT: 13.824,
            WMS_AMB_TEMP: 40.569,
            WMS_HUM: 6.804,
            WMS_INST_RAIN: 0,
            WMS_TOT_RAIN: 0,
            WMS_GHI: 549.753,
            WMS_GHI_DW: 159.551,
            WMS_POA: 633.377,
            WMS_POA_DW: 160.24,
            WMS_WND_SPD: 4.59,
            WMS_WND_DIR: 316.4,
            WMS_BAR_PRES: null,
            WMS_MDL_TEMP1: null,
            WMS_CLOUD_COVER: -26.809,
            WMS_DIFFUSE: null,
            WMS_DIRECT: null,
            WMS_GLOBAL: null,
            WMS_MDL_TEMP2: null,
            IS_HEALTHY: true,
        },
        metadata: {
            WMS_BAT_VLT: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_AMB_TEMP: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_HUM: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_INST_RAIN: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            WMS_TOT_RAIN: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            WMS_GHI: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_GHI_DW: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_POA: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_POA_DW: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_WND_SPD: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_WND_DIR: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_BAR_PRES: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            WMS_MDL_TEMP1: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            WMS_CLOUD_COVER: {
                timestamp: "2022-04-23T10:45:12.066Z",
            },
            WMS_DIFFUSE: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            WMS_DIRECT: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            WMS_GLOBAL: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            WMS_MDL_TEMP2: {
                timestamp: "2022-04-23T06:59:30.023Z",
            },
            IS_HEALTHY: {
                timestamp: "2022-04-23T10:45:13.047Z",
            },
        },
        starttime: "2022-04-23T10:45:13.054Z",
        endtime: "2022-04-23T10:45:13.054Z",
        starttimestamp: "202204231045",
        endtimestamp: "202204231045",
        localstarttime: "2022-04-23T16:15:13.054Z",
        localstarttimestamp: 1650730513054,
    },
    {
        devicedatacron: {
            index: 2,
            cron: "0/3 * * * * *",
        },
        devicemodbusmeta: {
            devicemodbusunitid: 1,
        },
        deviceopcuameta: {
            deviceopcuaendpoint: null,
        },
        deviceip: "192.168.15.11",
        devicesortorder: 15023,
        devicedefaultaggregate: 0,
        menudisplay: true,
        devicesubscriptions: [
            "Vd9COm4BH9iu",
            "t6W8egeIzLjt",
        ],
        dependencydevices: [
        ],
        devicecommunicationalarmenabled: true,
        devicecommunicationeventenabled: false,
        updatedat: "2022-03-31T10:53:44.782Z",
        _id: "6246cfcc9fc9cb0014ca0d13",
        devicename: "WMS",
        devicedisplayname: "WMS",
        devicetypeid: 7,
        deviceport: 502,
        deviceprotocol: 1,
        deviceunhealthypolling: 4,
        devicegeneralinfo: [
            {
                updatedat: "2022-04-22T16:51:48.139Z",
                _id: "6262dd248f366900148bd371",
                name: "MODEL",
                value: "MEATECH",
                updatedby: "Developer(dev@armaxindia.com)",
            },
        ],
        blockid: "a9961dea-5173-492d-bd87-2ddf18d90106",
        updatedby: "Developer(dev@armaxindia.com)",
        devicecode: 1000443,
        deviceid: "fad1a2f4-e6ec-41dc-b2ba-a286d7154358",
        redundant: false,
        blockip: [
            "192.168.15.14",
        ],
        devicemeta: {
            devicetypeid: 7,
            devicename: "WMS",
            devicedisplayname: "WMS",
            blockdevicedisplayname: "IS15-WMS",
            blockname: "IS15",
        },
        parameters: {
            WMS_BAT_VLT: 13.94,
            WMS_AMB_TEMP: 40.468,
            WMS_HUM: 7.017,
            WMS_INST_RAIN: 0,
            WMS_TOT_RAIN: 0,
            WMS_GHI: 596.992,
            WMS_GHI_DW: 188.592,
            WMS_POA: 714.36,
            WMS_POA_DW: 200.018,
            WMS_WND_SPD: 1.86,
            WMS_WND_DIR: 293.55,
            WMS_BAR_PRES: "-",
            WMS_MDL_TEMP1: 325282401615872,
            WMS_CLOUD_COVER: -26.663,
            WMS_DIFFUSE: "-",
            WMS_DIRECT: "-",
            WMS_GLOBAL: "-",
            WMS_MDL_TEMP2: 121870082899968,
            IS_HEALTHY: true,
        },
        metadata: {
            WMS_BAT_VLT: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_AMB_TEMP: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_HUM: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_INST_RAIN: {
                timestamp: "2022-04-22T18:22:51.061Z",
            },
            WMS_TOT_RAIN: {
                timestamp: "2022-04-22T18:22:51.061Z",
            },
            WMS_GHI: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_GHI_DW: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_POA: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_POA_DW: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_WND_SPD: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_WND_DIR: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_BAR_PRES: {
                timestamp: "-",
            },
            WMS_MDL_TEMP1: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_CLOUD_COVER: {
                timestamp: "2022-04-23T10:45:12.054Z",
            },
            WMS_DIFFUSE: {
                timestamp: "-",
            },
            WMS_DIRECT: {
                timestamp: "-",
            },
            WMS_GLOBAL: {
                timestamp: "-",
            },
            WMS_MDL_TEMP2: {
                timestamp: "2022-04-23T10:44:54.119Z",
            },
            IS_HEALTHY: {
                timestamp: "2022-04-23T10:45:13.052Z",
            },
        },
        starttime: "2022-04-23T10:45:13.096Z",
        endtime: "2022-04-23T10:45:13.096Z",
        starttimestamp: "202204231045",
        endtimestamp: "202204231045",
        localstarttime: "2022-04-23T16:15:13.096Z",
        localstarttimestamp: 1650730513096,
    },
];

const wmsactivecount = healthywms.length;
if (healthywms && healthywms.length > 0 && wmsactivecount > 0) {
    const data = {
        averagepoa: (lodash.sumBy(healthywms, (wmsvalue) => wmsvalue.parameters[applicationparameter.WMS_POA.key])) / wmsactivecount,
        totalpoa: (lodash.sumBy(healthywms, (wmsvalue) => wmsvalue.parameters[applicationparameter.WMS_TOT_POA.key])) / wmsactivecount,
        averageghi: (lodash.sumBy(healthywms, (wmsvalue) => wmsvalue.parameters[applicationparameter.WMS_GHI.key])) / wmsactivecount,
        totalghi: (lodash.sumBy(healthywms, (wmsvalue) => wmsvalue.parameters[applicationparameter.WMS_TOT_GHI.key])) / wmsactivecount,
        moduletemp: (lodash.sumBy(healthywms, (wmsvalue) => ((wmsvalue.parameters[applicationparameter.WMS_MDL_TEMP1.key] !== '-' || wmsvalue.parameters[applicationparameter.WMS_MDL_TEMP1.key] !== undefined ? wmsvalue.parameters[applicationparameter.WMS_MDL_TEMP1.key] : 0) +
            (wmsvalue.parameters[applicationparameter.WMS_MDL_TEMP2.key] !== '-' || wmsvalue.parameters[applicationparameter.WMS_MDL_TEMP2.key] !== undefined ? wmsvalue.parameters[applicationparameter.WMS_MDL_TEMP2.key] : 0)
        ) / 2)) / wmsactivecount,
        ambienttemp: (lodash.sumBy(healthywms, (wmsvalue) => wmsvalue.parameters[applicationparameter.WMS_AMB_TEMP.key])) / wmsactivecount,
        relativehum: (lodash.sumBy(healthywms, (wmsvalue) => wmsvalue.parameters[applicationparameter.WMS_HUM.key])) / wmsactivecount,
        windspeed: (lodash.sumBy(healthywms, (wmsvalue) => wmsvalue.parameters[applicationparameter.WMS_WND_SPD.key])) / wmsactivecount,
        wmscount: {
            totalcount: healthywms.length,
            totalhealthycount: wmsactivecount,
            colorcode:
                wmsactivecount === 0
                    ? 'count-less'
                    : wmsactivecount > 0 && wmsactivecount !== healthywms.length
                        ? 'count-mismatch'
                        : 'count-equal',
        },
    };
    console.log(data)
}