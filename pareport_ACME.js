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
            const pqmvalue = Object.fromEntries(
                Object.entries(data.devices).filter(
                    ([devicedataid, devicedata]) =>
                        devicedata.devicemeta.devicetypeid === 15
                )
            );
            const wmspoa = isNaN(
                lodash.mean(
                    Object.values(wmsvalue)
                        .map((x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-")
                        .filter((d) => d !== undefined)
                )
            )
                ? 0
                : lodash.mean(
                    Object.values(wmsvalue)
                        .map((x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-")
                        .filter((d) => d !== undefined)
                );
            const pqmValue = lodash.sum(
                Object.values(pqmvalue)
                    .map((x) =>
                        x.parameters.PQM_TOT_ACT_EXP && x.parameters.PQM_TOT_ACT_EXP !== "-"
                            ? x.parameters.PQM_TOT_ACT_EXP
                            : undefined
                    )
                    .filter((d) => d !== undefined)
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
                PQM: pqmValue ? pqmValue : 0,
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
                if (datavalue.POA >= 25 || datavalue.PQM >= 2000) {
                    TotalOperationHours = TotalOperationHours + 1;
                }
                Object.entries(datavalue).map(([device, value]) => {
                    if (
                        device !== "POA" &&
                        device !== "Inverter running" &&
                        device !== "Timestamp" &&
                        device !== "PQM"
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
            const patotalcalculatedvalue = isNaN(
                ((deviceupTimecount - devicedownTimecount) /
                    (TotalOperationHours * totalInverterCount)) *
                100
            )
                ? 0
                : ((deviceupTimecount - devicedownTimecount) /
                    (TotalOperationHours * totalInverterCount)) *
                100;
            const calculatehours = (value, context) => {
                switch (context) {
                    case "hours":
                        let hours = value / 60;
                        if (Number.isSafeInteger(hours) && hours !== 0) {
                            const tempvalu = hours * 60;
                            TotalOperationHours = TotalOperationHours - tempvalu;
                        }
                        return (Number.isSafeInteger(hours) && hours !== 0) ? hours / 60 : "00";
                    case "minutes":
                        let num = value.toString().length > 1 ? value : `0${value}`;

                        return num;
                }
            };
            const OperationalHours = `${calculatehours(
                TotalOperationHours,
                "hours"
            )}:${calculatehours(TotalOperationHours, "minutes")}`;
            const deviceUpTimneHours = `${calculatehours(
                deviceupTimecount,
                "hours"
            )}:${calculatehours(deviceupTimecount, "minutes")}`;
            const deviceDownTimneHours = `${calculatehours(
                devicedownTimecount,
                "hours"
            )}:${calculatehours(devicedownTimecount, "minutes")}`;
            return {
                Timestamp: date,
                "Total Operation Hrs(Minute)": OperationalHours,
                "Inverter Operation Hrs(minute)": deviceUpTimneHours,
                "Inverter Down(minute)": deviceDownTimneHours,
                "Plant Availability (%)": patotalcalculatedvalue,
            };
        });
        const wb = XLSX.utils.book_new();
        const filename = "PA_Report.xlsx";
        const PAavailability = XLSX.utils.json_to_sheet(mainPAData);
        XLSX.utils.book_append_sheet(wb, PAavailability, "PA");
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
            `attachment; filename=${`pareport${format(
                new Date(),
                "yyyyMMddHHmmss"
            )}.xlsx`}`
        );
    },
};





// PA ACME
const functionbuilder = async (
    parameter1,
    parameter2,
    parameter3,
    parameter4
) => {
    const dbconnection = parameter1;
    const {
        blockdevicedatamodel,
        devicebusiness,
        settingbusiness,
        devicetypeEnum,
    } = parameter2;
    const {
        log,
        lodash,
        startOfDay,
        endOfDay,
        parse,
        differenceInMinutes,
        differenceInDays,
        format,
        util,
        XLSX,
        workbook,
        fs,
        res,
    } = parameter3;
    let devicefilterquery;
    const { startdate, enddate, settingdata } = parameter4;
    const devicetypes = [devicetypeEnum.INVERTER, devicetypeEnum.WMS];
    const devices = await devicebusiness.showdevicebydeviceid(
        dbconnection,
        devicetypes
    );
    devices.forEach((a) => {
        let d = { [`devices.${a.deviceid}`]: 1 };

        devicefilterquery = { ...devicefilterquery, ...d };
    });
    const listofdevices = lodash.sortBy(devices, 'devicesortorder');
    const blocks = await blockbusiness.showblockslist(dbconnection)
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
    const blockdevicedata = await blockdevicedatamodel(dbconnection).find({
        localstarttimestamp: { $gte: Date.parse(startdate), $lte: Date.parse(enddate) }
    }).lean();


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
        const pqmvalue = Object.fromEntries(
            Object.entries(data.devices).filter(
                ([devicedataid, devicedata]) =>
                    devicedata.devicemeta.devicetypeid === 15
            )
        );
        const wmspoa = isNaN(
            lodash.mean(
                Object.values(wmsvalue)
                    .map((x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-")
                    .filter((d) => d !== undefined)
            )
        )
            ? 0
            : lodash.mean(
                Object.values(wmsvalue)
                    .map((x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-")
                    .filter((d) => d !== undefined)
            );
        const pqmValue = lodash.sum(
            Object.values(pqmvalue)
                .map((x) =>
                    x.parameters.PQM_TOT_ACT_EXP && x.parameters.PQM_TOT_ACT_EXP !== "-"
                        ? x.parameters.PQM_TOT_ACT_EXP
                        : undefined
                )
                .filter((d) => d !== undefined)
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
            PQM: pqmValue ? pqmValue : 0,
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
            if (datavalue.POA >= 25 || datavalue.PQM >= 2000) {
                TotalOperationHours = TotalOperationHours + 1;
            }
            Object.entries(datavalue).map(([device, value]) => {
                if (
                    device !== "POA" &&
                    device !== "Inverter running" &&
                    device !== "Timestamp" &&
                    device !== "PQM"
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
        const patotalcalculatedvalue = isNaN(
            ((deviceupTimecount - devicedownTimecount) /
                (TotalOperationHours * totalInverterCount)) *
            100
        )
            ? 0
            : ((deviceupTimecount - devicedownTimecount) /
                (TotalOperationHours * totalInverterCount)) *
            100;
        const calculatehours = (value, context) => {
            switch (context) {
                case "hours":
                    let hours = value / 60;
                    if (Number.isSafeInteger(hours) && hours !== 0) {
                        const tempvalu = hours * 60;
                        TotalOperationHours = TotalOperationHours - tempvalu;
                    }
                    return (Number.isSafeInteger(hours) && hours !== 0) ? hours / 60 : "00";
                case "minutes":
                    let num = value.toString().length > 1 ? value : `0${value}`;

                    return num;
            }
        };
        const OperationalHours = `${calculatehours(
            TotalOperationHours,
            "hours"
        )}:${calculatehours(TotalOperationHours, "minutes")}`;
        const deviceUpTimneHours = `${calculatehours(
            deviceupTimecount,
            "hours"
        )}:${calculatehours(deviceupTimecount, "minutes")}`;
        const deviceDownTimneHours = `${calculatehours(
            devicedownTimecount,
            "hours"
        )}:${calculatehours(devicedownTimecount, "minutes")}`;
        return {
            Timestamp: date,
            "Total Operation Hrs(Minute)": OperationalHours,
            "Inverter Operation Hrs(minute)": deviceUpTimneHours,
            "Inverter Down(minute)": deviceDownTimneHours,
            "Plant Availability (%)": patotalcalculatedvalue,
        };
    });
    const wb = XLSX.utils.book_new();
    const filename = "PA_Report.xlsx";
    const PAavailability = XLSX.utils.json_to_sheet(mainPAData);
    XLSX.utils.book_append_sheet(wb, PAavailability, "PA");
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
        `attachment; filename=${`pareport${format(
            new Date(),
            "yyyyMMddHHmmss"
        )}.xlsx`}`
    );
};