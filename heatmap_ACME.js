const lodash = require("lodash");
const XLSX = require("xlsx");

const fs = require("fs");
const { format } = require("date-fns");
const devices = require("./mockdata/devices_acme.json");
const blockdevicedata = require("./mockdata/blockdevicedatas.json");
const blocks = require("./mockdata/blocks_acme.json");

module.exports = {
    getheatmap: async (req, res) => {
        try {
            {
                const dccapacity = 3125
                const listofdevices = lodash.sortBy(devices, "devicesortorder");
                const blocksinfo = Object.fromEntries(
                    blocks.map((x) => [x.blockid, x.blockdisplayname])
                );
                const inverterdevices = Object.fromEntries(
                    listofdevices
                        .filter((f) => f.devicetypeid === 3)
                        .map((x) => [
                            x.deviceid,
                            `${blocksinfo[x.blockid]} ${x.devicedisplayname}`,
                        ])
                );
                const data = Object.entries(blockdevicedata).map(([key, data]) => {
                    const devicedata = Object.fromEntries(
                        Object.entries(data.devices).filter(
                            ([deviceid, devicedata]) =>
                                devicedata.devicemeta.devicetypeid === 3
                        )
                    );
                    return {
                        localstarttimestamp: data.localstarttimestamp,
                        ...devicedata,
                    };
                });

                const PAdata = lodash.groupBy(data, (x) =>
                    format(new Date(x.localstarttimestamp), "yyyy-MM-dd")
                );
                const mainPAData = Object.entries(PAdata).map(([date, data]) => {
                    let devicedata = [];
                    Object.entries(inverterdevices).map(([deviceid, devicename]) => {
                        devicevalue = {
                            value: 0,
                            devicename: devicename,
                            timestamp: date

                        }

                        switch (req.body.heatmapname) {
                            case 'production':
                                devicevalue.value = lodash.max(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )
                                );
                                break;
                            case 'specific-yield':
                                const sum = lodash.sum(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )

                                );
                                devicevalue.value = isNaN(sum / dccapacity) ? 0 : sum / dccapacity
                                break;
                            default:
                                const sumvalue = lodash.sum(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )

                                );
                                devicevalue.value = isNaN(sumvalue / dccapacity) ? 0 : sumvalue / dccapacity
                                break;

                        }
                        devicedata = [...devicedata, devicevalue]
                        // devicedata = { ...devicedata, ...devicevalue };
                    });
                    // console.log({ devices: devicedata, timestamp: date });
                    return devicedata
                });
                console.log(mainPAData);
                res.status(200).send(mainPAData)
            }
        } catch (ed) {
            console.log(ed);
        }
    },
};
