const lodash = require("lodash");
const XLSX = require("xlsx");

const fs = require("fs");
const { format } = require("date-fns");
const devices = require("./mockdata/devices_acme.json");
const blockdevicedata = require("./mockdata/blockdevicedatas.json");
const blocks = require("./mockdata/blocks_acme.json");

module.exports = {
    plantavailabilityreport: async (req, res) => {
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
        var rawdata = blockdevicedata.map((data) => {
            let datavalue = {
                Timestamp: format(
                    new Date(data.localstarttimestamp),
                    "yyyy-MM-dd HH:MM"
                ),
            };
            var devicedatavalue = {};
            Object.entries(inverterdevices).map(([deviceid, devicename]) => {
                const value = Object.entries(data.devices)
                    .map(([devicedataid, devicedata]) => {
                        if (devicedataid == deviceid) {
                            return data.devices[deviceid];
                        }
                    })
                    .filter((f) => f !== undefined);

                const parameters = value[0];
                let devicevalue = 0;
                if (
                    parameters.IS_HEALTHY == true &&
                    !(
                        2 == (2 & parameters.INV_RUN_STS) ||
                        8 == (8 & parameters.INV_RUN_STS)
                    )
                ) {
                    devicevalue = 1;
                } else {
                    devicevalue = 0;
                }
                const newdata = { [devicename]: devicevalue };
                devicedatavalue = { ...devicedatavalue, ...newdata };
            });
            const wmsvalue = Object.fromEntries(
                Object.entries(data.devices).filter(
                    ([devicedataid, devicedata]) =>
                        devicedata.devicemeta.devicetypeid === 7
                )
            );
            const wmspoa = isNaN(
                lodash.mean(
                    Object.values(wmsvalue).filter(
                        (x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-"
                    )
                )
            )
                ? 0
                : lodash.mean(
                    Object.values(wmsvalue).filter(
                        (x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-"
                    )
                );
            let inverterrunning = 0;
            if (wmspoa > 25) {
                inverterrunning = Object.entries(devicedatavalue)
                    .map(([dev, data]) => data)
                    .filter((x) => x == 1).length;
            }
            return {
                ...datavalue,
                ...devicedatavalue,
                POA: wmspoa,
                "Inverter running": inverterrunning,
            };
        });

        const PAdata = lodash.groupBy(rawdata, (x) =>
            format(new Date(x.Timestamp), "yyyy-mm-dd")
        );
        const mainPAData = Object.entries(PAdata).map(([date, data]) => {
            let TotalOperationHours = 0;
            var deviceupTimecount = 0;
            var devicedownTimecount = 0;
            var totalInverterCount = 0;
            data.map((datavalue) => {
                if (datavalue.POA == 0) {
                    TotalOperationHours = TotalOperationHours + 1;
                }
                Object.entries(datavalue).map(([device, value]) => {
                    if (
                        device !== "POA" &&
                        device !== "Inverter running" &&
                        device !== "Timestamp"
                    ) {
                        totalInverterCount = totalInverterCount + 1;
                        if (value !== 0) {
                            deviceupTimecount = deviceupTimecount + 1;
                        } else {
                            devicedownTimecount;
                            devicedownTimecount = +1;
                        }
                    }
                });

            });
            const patotalcalculatedvalue = isNaN((((deviceupTimecount - devicedownTimecount) / (TotalOperationHours * totalInverterCount))) * 100) ? 0 : (((deviceupTimecount - devicedownTimecount) / (TotalOperationHours * totalInverterCount))) * 100
            return {
                Timestamp: date,
                "Total Operation Hrs(Minute)": TotalOperationHours,
                "Inverter Operation Hrs(minute)": deviceupTimecount,
                "Inverter Down(minute)": devicedownTimecount,
                "Plant Availability (%)": patotalcalculatedvalue
            };
        });
        const wb = XLSX.utils.book_new();
        const filename = "PA_Report.xlsx";
        const PArawdata = XLSX.utils.json_to_sheet(rawdata);
        XLSX.utils.book_append_sheet(wb, PArawdata, "Raw Data");
        const PAavailability = XLSX.utils.json_to_sheet(mainPAData);
        XLSX.utils.book_append_sheet(wb, PAavailability, "PA");
        const wb_opts = { bookType: "xlsx", type: "binary" };
        XLSX.writeFile(wb, filename, wb_opts);
        const stream = fs.createReadStream(filename);
        stream.pipe(res);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${`pareport${format(
                new Date(),
                "yyyyMMddHHmmss"
            )}.xlsx`}`
        );
    },
};
