const lodash = require("lodash");
const XLSX = require("xlsx");

const fs = require("fs");
const { format } = require("date-fns");
const devices = require("./mockdata/devices_acme.json");
const blockdevicedata = require("./mockdata/blockdevicedatas.json");
const blocks = require("./mockdata/blocks_acme.json");

module.exports = {
    gridavailabilityreport: async (req, res) => {
        const listofdevices = lodash.sortBy(devices, "devicesortorder");
        const blocksinfo = Object.fromEntries(
            blocks.map((x) => [x.blockid, x.blockdisplayname])
        );
        const pqmdevices = Object.fromEntries(
            listofdevices
                .filter((f) => f.devicetypeid === 15)
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
            Object.entries(pqmdevices).map(([deviceid, devicename]) => {
                const value = Object.entries(data.devices)
                    .map(([devicedataid, devicedata]) => {
                        if (devicedataid == deviceid) {
                            return data.devices[deviceid];
                        }
                    })
                    .filter((f) => f !== undefined);

                const parameters = value[0];
                let devicevalue = 0;
                if (parameters.IS_HEALTHY == true) {
                    devicevalue = parameters.PQM_FREQ;
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
                    Object.values(wmsvalue)
                        .map((x) =>
                            x.parameters.WMS_POA && x.parameters.WMS_POA !== "-"
                                ? x.parameters.WMS_POA
                                : undefined
                        )
                        .filter((d) => d !== undefined)
                )
            )
                ? 0
                : lodash.mean(
                    Object.values(wmsvalue)
                        .map((x) =>
                            x.parameters.WMS_POA && x.parameters.WMS_POA !== "-"
                                ? x.parameters.WMS_POA
                                : undefined
                        )
                        .filter((d) => d !== undefined)
                );
            let unavailability = 0;
            if (wmspoa > 25) {
                unavailability = Object.entries(devicedatavalue).map(([dev, data]) =>
                    data <= 47 ? 1 : 0
                );
            }
            return {
                ...datavalue,
                ...devicedatavalue,
                POA: wmspoa,
                "Grid Unavailibility": unavailability,
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
            const gridowntime = lodash.sumBy(data, "Grid Unavailibility");
            data.map((datavalue) => {
                if (datavalue.POA >= 25) {
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
            const gridoperationhours = isNaN(TotalOperationHours - gridowntime)
                ? 0
                : TotalOperationHours - gridowntime;
            const gatotalcalculatedvalue = isNaN(
                (gridoperationhours - gridowntime) / (TotalOperationHours * 100)
            )
                ? 0
                : (gridoperationhours - gridowntime) / (TotalOperationHours * 100);
            return {
                Timestamp: date,
                "Total Operation Hrs(Minute)": TotalOperationHours,
                "OG Grid Operation Hrs(minute)": gridoperationhours,
                "Grid Down(minute)": gridowntime,
                "Grid Availability (%)": gatotalcalculatedvalue,
            };
        });
        const wb = XLSX.utils.book_new();
        const filename = "GA_Report.xlsx";
        const PAavailability = XLSX.utils.json_to_sheet(mainPAData);
        XLSX.utils.book_append_sheet(wb, PAavailability, "GA");
        const PArawdata = XLSX.utils.json_to_sheet(rawdata);
        XLSX.utils.book_append_sheet(wb, PArawdata, "Raw Data");
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
            `attachment; filename=${`gareport${format(
                new Date(),
                "yyyyMMddHHmmss"
            )}.xlsx`}`
        );
    },
};
