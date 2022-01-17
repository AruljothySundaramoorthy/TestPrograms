const reader = require("xlsx");
const lodash = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { devicesanitize } = require("./devicesanitize");
const random = require('random');

const file = reader.readFile("./CMS_MAPPING.xlsx");

let data = [];
let enumdata = {};
let blocksmap = {};
let blocks;
let devices = [];
const sheets = file.SheetNames;

// const splitfunction = (splitvalue, position, significance) => {
//     return splitvalue.split(significance)[position] ? splitvalue.split(significance)[position] : '';

// }

// const generaterandomnumber = () => {
//     const min = 1000000;
//     const max = 99999999;
//     return random.int(min, max);
// }
// let enums = reader.utils.sheet_to_json(file.Sheets["enum"]);

// reader.utils.sheet_to_json(file.Sheets["blocks"]).map((x) => { console.log(x, { blockid: uuidv4() }) })
// // ENUMS base skeleton
// Object.entries(enums[0]).map((y) => {
//     enumdata = { ...enumdata, [y[0]]: {} };
// });

// // ENUMS data assignment
// enums.map((x) => {
//     Object.entries(x).map((y) => {
//         [enumName, enumValue] = y[1].split(":");
//         const dataval = { [enumName]: enumValue };
//         enumdata[y[0]] = { ...enumdata[y[0]], ...dataval };
//     });
// });

blocks = reader.utils
    .sheet_to_json(file.Sheets["blocks"])
    .map((x) => (x = { ...x, blockid: uuidv4() }));
// Generating Blockmaps by blockname
blocks.map((x) => Object.assign(blocksmap, { [x.blockname]: x }));
devices = reader.utils.sheet_to_json(file.Sheets["devices"]).map((devicedata) => {
    return devicesanitize(devicedata, blocksmap);
    // let devicedata = {
    //     deviceid: uuidv4(),
    //     deviceport: x?.deviceport ? x.deviceport : 999,//TODO: Need to add on excel
    //     devicefetchcron: enumdata.DEVICE_CRON[splitfunction(x.devicedatafetchcron, 0, ':')],
    //     deviceip: x?.deviceip ? x.deviceip : '192.168.1.1', //TODO: Need to add on excel
    //     devicedisplayname: x?.devicedisplayname ? x.devicedisplayname : '', //TODO: Need to add on excel
    //     devicecode: generaterandomnumber(),
    //     devicesortorder: x.devicesortorder,
    //     devicecomments: [],
    //     deviceblockid: blocksmap[x.deviceblockname].blockid,
    //     deviceparentid: '',//TODO Need to add in excel
    //     // deviceblockname: x.deviceblockname,
    //     // devicename: x.devicename,
    //     deviceprotocol: enumdata.DEVICE_PROTOCOL[splitfunction(x.deviceprotocol, 0, ':')],
    //     // devicemake: x.devicemake,
    //     // devicemodel: x.devicemodel,
    //     // devicename: x.devicename,
    //     devicevirtual: x.devicevirtual ? x?.devicevirtual : false,//TODO need to add this column in excel
    //     devicevirtualfuncion: {},
    //     devicestatus: {
    //         communicationalarmenabled: (x.devicestatus?.communicationalarmenabled ?? false),
    //         communicationeventenabled: (x.devicestatus?.communicationeventenabled ?? false),
    //         disable: (x.devicestatus?.disable ?? false),
    //         hidden: (x.devicestatus?.hidden ?? false)
    //     },
    //     devicemeta: {}

    // };

    // switch (devicedata.deviceprotocol) {
    //     case enumdata?.DEVICE_PROTOCOL?.OPCUA:
    //         const opcua = {
    //             endpoint: x['devicemeta.opcua.endpoint'],
    //             password: x['devicemeta.opcua.password'],
    //             securitymode: enumdata.OPCUA_SECURITY_MODE[splitfunction(x['devicemeta.opcua.securitymode'], 0, ':')],
    //             securitypolicy: enumdata.OPCUA_SECURITY_POLICY[splitfunction(x['devicemeta.opcua.securitypolicy'], 0, ':')],
    //             username: x['devicemeta.opcua.username'],

    //         }
    //         devicedata.devicemeta = { ...devicedata.devicemeta, opcua };

    //         break;
    // }
    // return devicedata
});


console.log(data);
