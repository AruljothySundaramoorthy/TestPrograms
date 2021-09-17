const { data } = require("./datablock1");
const ExcelJS = require('exceljs');
const lodash = require("lodash");
const workbook = new ExcelJS.Workbook();
var tempdata = {};
let firstdata = data[0].devices;
let lastdata = data[data.length - 1].devices;
Object.keys(firstdata).map((x) => {
    const tempvalues = firstdata[x].devicemeta;
    let newtempdata = {
        [x]: {
            devicemeta: tempvalues,
            value: 0,
            deviceid: x,
            minvalue: 0,
            maxvalue: 0,
        },
    };
    tempdata = { ...tempdata, ...newtempdata };
});
let inverterdevices = {};
let mfmdevices = {};
let checkmeterdevices = {};
let mainmeterdevices = {};
let pqmdevices = {};

Object.entries(tempdata).map((x) => {
    if (x[1].devicemeta.devicetypeid === 3) {
        inverterdevices = { ...inverterdevices, ...{ [x[0]]: x[1] } };
    }
    if (x[1].devicemeta.devicetypeid === 25) {
        mfmdevices = { ...mfmdevices, ...{ [x[0]]: x[1] } };
    }
    if (x[1].devicemeta.devicetypeid === 21) {
        mainmeterdevices = { ...mainmeterdevices, ...{ [x[0]]: x[1] } };
    }
    if (x[1].devicemeta.devicetypeid === 22) {
        checkmeterdevices = { ...checkmeterdevices, ...{ [x[0]]: x[1] } };
    }
    if (x[1].devicemeta.devicetypeid === 15) {
        pqmdevices = { ...pqmdevices, ...{ [x[0]]: x[1] } };
    }
});
Object.entries(firstdata).map((x) => {
    Object.keys(pqmdevices).forEach((y) => {
        if (x[0] == y) {
            pqmdevices[y].minvalue = x[1].parameters.PQM_TOT_ACT_EXP;
        }
    });
    Object.keys(mfmdevices).forEach((y) => {
        if (x[0] == y) {
            mfmdevices[y].minvalue = x[1].parameters.MFMELITE_TOT_ACT_EXP;
        }
    });
    Object.keys(mainmeterdevices).forEach((y) => {
        if (x[0] == y) {
            if (mainmeterdevices[y].devicemeta.devicename == "MM1") {
                mainmeterdevices[y].minvalue = x[1].parameters.MM1_TOT_ACT_EXP;
            } else {
                mainmeterdevices[y].minvalue = x[1].parameters.MM2_TOT_ACT_EXP;
            }
        }
    });
    Object.keys(checkmeterdevices).forEach((y) => {
        if (x[0] == y) {
            if (checkmeterdevices[y].devicemeta.devicename == "CM1") {
                checkmeterdevices[y].minvalue = x[1].parameters.CM1_TOT_ACT_EXP;
            } else {
                checkmeterdevices[y].minvalue = x[1].parameters.CM2_TOT_ACT_EXP;
            }
        }
    });
});
Object.entries(lastdata).map((x) => {
    Object.keys(pqmdevices).forEach((y) => {
        if (x[0] == y) {
            pqmdevices[y].maxvalue = x[1].parameters.PQM_TOT_ACT_EXP;
        }
    });
    Object.keys(mfmdevices).forEach((y) => {
        if (x[0] == y) {
            mfmdevices[y].maxvalue = x[1].parameters.MFMELITE_TOT_ACT_EXP;
        }
    });
    Object.keys(mainmeterdevices).forEach((y) => {
        if (x[0] == y) {
            if (mainmeterdevices[y].devicemeta.devicename == "MM1") {
                mainmeterdevices[y].maxvalue = x[1].parameters.MM1_TOT_ACT_EXP;
            } else {
                mainmeterdevices[y].maxvalue = x[1].parameters.MM2_TOT_ACT_EXP;
            }
        }
    });
    Object.keys(checkmeterdevices).forEach((y) => {
        if (x[0] == y) {
            if (checkmeterdevices[y].devicemeta.devicename == "CM1") {
                checkmeterdevices[y].maxvalue = x[1].parameters.CM1_TOT_ACT_EXP;
            } else {
                checkmeterdevices[y].maxvalue = x[1].parameters.CM2_TOT_ACT_EXP;
            }
        }
    });
});
const datafunction = (req, res) => {
    data.forEach((e) => {
        Object.keys(inverterdevices).forEach((x) => {
            Object.keys(e.devices).forEach((ed) => {
                if (ed == x) {
                    if (
                        e.devices[ed].parameters.INV_DLY_ACT_EXP > inverterdevices[x].value
                    ) {
                        inverterdevices[x].value = e.devices[ed].parameters.INV_DLY_ACT_EXP;
                    }
                }
            });
        });
    });
    var page1data = {};
    var page2data = {};
    Object.values(inverterdevices).map((x) => {
        page2data = {
            ...page2data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(mfmdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;
        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(checkmeterdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;

        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(mainmeterdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;

        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(pqmdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;

        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    // return page2data;
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    const sheet = workbook.addWorksheet('sheet1');
    sheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    ];
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
        'Content-Disposition',
        `attachment; filename=${`prreport${format(
            new Date(),
            'yyyyMMddHHmmss'
        )}.xlsx`}`
    );
    return workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });
};
console.log(datafunction());
module.exports = { datafunction }