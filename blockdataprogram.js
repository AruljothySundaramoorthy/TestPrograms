const { data } = require("./datablock1");

const lodash = require("lodash");

var tempdata = {};
Object.keys(data[0].devices).map((x) => {
    const tempvalues = data[0].devices[x].devicemeta;
    let newtempdata = { [x]: { devicemeta: tempvalues, value: 0, deviceid: x } };
    tempdata = { ...tempdata, ...newtempdata };
});
let inverterdevices = {};
Object.entries(tempdata).map((x) => {
    if (x[1].devicemeta.devicetypeid === 3) {
        inverterdevices = { ...inverterdevices, ...{ [x[0]]: x[1] } };
    }
});
const datafunction = () => {
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
    var page2data = [];
    Object.values(inverterdevices).map((x) => {
        page2data.push({
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        });
    });
    return page2data;
};
console.log(datafunction());
