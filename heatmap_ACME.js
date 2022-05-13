const lodash = require("lodash");
const XLSX = require("xlsx");

const fs = require("fs");
const { format } = require("date-fns");
const devices = require("./mockdata/devices_acme.json");
const blockdevicedata = require("./mockdata/blockdevicedatas.json");
const blocks = require("./mockdata/blocks_acme.json");

const devicetypeenum = require("@armax_cloud/allspark-data-models/models/enum/devicetype.enum");

const PDFDocument = require('pdfkit-table');

const stringify = require('csv-stringify');
module.exports = {
    getmockheatmap: async (req, res) => {
        try {
            {
                let devicedccapacitydata = {};
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
                Object.entries(inverterdevices).map(([deviceid, devicename]) => {
                    devicedccapacitydata = {
                        ...devicedccapacitydata,
                        [deviceid]: 3150,
                    };
                });

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
                            timestamp: date,
                        };

                        switch (req.body.heatmapname) {
                            case "production":
                                devicevalue.value = lodash.max(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )
                                );
                                break;
                            case "specific-yield":
                                const sum = lodash.sum(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )
                                );
                                devicevalue.value = isNaN(sum / devicedccapacitydata[deviceid])
                                    ? 0
                                    : sum / devicedccapacitydata[deviceid];
                                break;
                            default:
                                const sumvalue = lodash.sum(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )
                                );
                                devicevalue.value = isNaN(
                                    sumvalue / devicedccapacitydata[deviceid]
                                )
                                    ? 0
                                    : sumvalue / devicedccapacitydata[deviceid];
                                break;
                        }
                        devicedata = [...devicedata, devicevalue];
                    });

                    return devicedata;
                });
                const returndata = mainPAData.flat()
                if (req.body.download) {
                    const reportdata = lodash.groupBy(returndata, 'timestamp');
                    const data = Object.entries(reportdata).map(([date, data]) => {
                        let devdata = { 'timestamp': date }
                        data.map((y) => {
                            devdata = { ...devdata, [y.devicename]: y.value }
                        })
                        return devdata
                    })
                    if (req.body.type === 'csv') {
                        stringify(data, {
                            header: true,
                        }).pipe(res);
                        res.setHeader('Content-Type', 'text/csv');
                        res.setHeader(
                            'Content-Disposition',
                            `attachment; filename="reportdata-${new Date()}.csv"`
                        );
                    } else if (req.body.type === 'pdf') {
                        const exportdatatoPDFTable = async (dataArray, response) => {
                            const table = {
                                title: `Project Name: ${dbsettings.plantdisplayname}`,

                                subtitle: `ReportName: ${reportinfo ? reportinfo.reportname : 'Trend Report'
                                    }\nLocation: ${dbsettings.plantlocationmeta.address} ${dbsettings.plantlocationmeta.city
                                    }\nFrom ${format(
                                        new Date(reqstartdate),
                                        'yyyy-mm-dd HH:MM'
                                    )} To ${format(new Date(reqenddate), 'yyyy-mm-dd HH:MM')}\nReport Generated By : ONESCADA\n\n`,
                                headers: Object.keys(dataArray[0]),
                                rows: dataArray.map((x) => Object.values(x)),
                            };
                            const size = [
                                1000,
                                150 * Object.keys(dataArray[0]).length < 891
                                    ? 891
                                    : 150 * Object.keys(dataArray[0]).length,
                            ];
                            const doc = new PDFDocument({
                                margin: 30,
                                size,
                                layout: 'landscape',
                            });
                            doc.image(`data:image/jpeg;base64,${clientimage}`, size[1] - 100 - 30, 6, {
                                fit: [100, 100],
                                align: 'center',
                                valign: 'center',
                            });
                            // file name
                            doc.pipe(response);
                            await doc.table(table, {
                                columnSpacing: 10,
                                padding: 10,
                                align: 'center',
                                prepareHeader: () => {
                                    doc.fontSize(11);
                                },
                                divider: {
                                    header: { disabled: true, width: 2, opacity: 1 },
                                },
                                prepareRow: (
                                    row,
                                    indexColumn,
                                    indexRow,
                                    rectRow,
                                    rectCell
                                ) => {
                                    const { x, y, width, height } = rectCell;
                                    // first line
                                    if (indexColumn === 0) {
                                        doc
                                            .lineWidth(0.5)
                                            .moveTo(x, y)
                                            .lineTo(x, y + height)
                                            .stroke();
                                    }
                                    doc
                                        .lineWidth(0.5)
                                        .moveTo(x + width, y)
                                        .lineTo(x + width, y + height)
                                        .stroke();
                                },
                            });

                            doc.end();
                        };

                        await exportdatatoPDFTable(data, res);
                    } else {
                        stringify(data, {
                            header: true,
                        }).pipe(res);
                        res.setHeader('Content-Type', 'text/csv');
                        res.setHeader(
                            'Content-Disposition',
                            `attachment; filename="reportdata-${new Date()}.csv"`
                        );
                    }
                } else {

                    return res.status(200).send(util.response(returndata));
                }
            }
        } catch (ed) {
            console.log(ed);
        }
    },
    getheatmap: async (req, res) => {
        try {
            let devicefilterquery;

            let devicedccapacitydata = {};
            const { startdate, enddate, heatmapname } = req.body;
            const devicetypes = [devicetypeEnum.INVERTER];
            const devices = await devicebusiness.showdevicebydeviceid(
                dbconnection,
                devicetypes
            );
            devices.forEach((a) => {
                let devicequery = { [`devices.${a.deviceid}`]: 1 };
                devicefilterquery = { ...devicefilterquery, ...devicequery };
            });
            const listofdevices = lodash.sortBy(devices, "devicesortorder");
            const blocks = await blockbusiness.showblockslist(dbconnection);
            const blocksinfo = Object.fromEntries(
                blocks.map((x) => [x.blockid, x.blockdisplayname])
            );
            const inverterdevices = Object.fromEntries(
                listofdevices
                    .filter((f) => f.devicetypeid === devicetypeenum.INVERTER)
                    .map((x) => [
                        x.deviceid,
                        `${blocksinfo[x.blockid]} ${x.devicedisplayname}`,
                    ])
            );
            inverterdevices.forEach((_devicedata) => {
                _devicedata.devicegeneralinfo.forEach((_general) => {
                    if (_general.name == "Installed DC Capacity") {
                        devicedccapacitydata = {
                            ...devicedccapacitydata,
                            [_devicedata.deviceid]: parseFloat(_general.value),
                        };
                    }
                });
            });

            const blockdevicedata = await blockdevicedatamodel(dbconnection)
                .find({
                    localstarttimestamp: {
                        $gte: Date.parse(startdate),
                        $lte: Date.parse(enddate),
                    },
                })
                .lean();

            const data = Object.entries(blockdevicedata).map(([key, data]) => {
                const devicedata = Object.fromEntries(
                    Object.entries(data.devices).filter(
                        ([deviceid, devicedata]) =>
                            devicedata.devicemeta.devicetypeid === devicetypeenum.INVERTER
                    )
                );
                return {
                    localstarttimestamp: data.localstarttimestamp,
                    ...devicedata,
                };
            });

            const processeddailydata = lodash.groupBy(data, (x) =>
                format(new Date(x.localstarttimestamp), "yyyy-MM-dd")
            );
            const dailydata = Object.entries(processeddailydata).map(
                ([date, data]) => {
                    let devicedata = [];
                    Object.entries(inverterdevices).map(([deviceid, devicename]) => {
                        devicevalue = {
                            value: 0,
                            devicename: devicename,
                            timestamp: date,
                        };

                        switch (heatmapname) {
                            case "production":
                                devicevalue.value = lodash.max(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )
                                );
                                break;
                            case "specific-yield":
                                const sum = lodash.sum(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )
                                );
                                devicevalue.value = isNaN(sum / devicedccapacitydata[deviceid])
                                    ? 0
                                    : sum / devicedccapacitydata[deviceid];
                                break;
                            default:
                                const sumvalue = lodash.sum(
                                    Object.values(data).map(
                                        (x) => x[deviceid]?.parameters?.INV_DLY_ACT_EXP || 0
                                    )
                                );
                                devicevalue.value = isNaN(
                                    sumvalue / devicedccapacitydata[deviceid]
                                )
                                    ? 0
                                    : sumvalue / devicedccapacitydata[deviceid];
                                break;
                        }
                        devicedata = [...devicedata, devicevalue];
                    });

                    return devicedata;
                }
            );

            // res.status(200).send(dailydata.flat());
            if (req.body.download) {
                if (req.body.type === 'csv') {
                    stringify(dailydata.flat(), {
                        header: true,
                    }).pipe(res);
                    res.setHeader('Content-Type', 'text/csv');
                    res.setHeader(
                        'Content-Disposition',
                        `attachment; filename="reportdata-${dateinfo}.csv"`
                    );
                } else if (req.body.type === 'pdf') {
                    const exportdatatoPDFTable = async (dataArray, response) => {
                        const table = {
                            title: `Project Name: ${dbsettings.plantdisplayname}`,

                            subtitle: `ReportName: ${reportinfo ? reportinfo.reportname : 'Trend Report'
                                }\nLocation: ${dbsettings.plantlocationmeta.address} ${dbsettings.plantlocationmeta.city
                                }\nFrom ${format(
                                    new Date(reqstartdate),
                                    'yyyy-mm-dd HH:MM'
                                )} To ${format(new Date(reqenddate), 'yyyy-mm-dd HH:MM')}\nReport Generated By : ONESCADA\n\n`,
                            headers: Object.keys(dataArray[0]),
                            rows: dataArray.map((x) => Object.values(x)),
                        };
                        const size = [
                            1000,
                            150 * Object.keys(dataArray[0]).length < 891
                                ? 891
                                : 150 * Object.keys(dataArray[0]).length,
                        ];
                        const doc = new PDFDocument({
                            margin: 30,
                            size,
                            layout: 'landscape',
                        });
                        doc.image(`data:image/jpeg;base64,${clientimage}`, size[1] - 100 - 30, 6, {
                            fit: [100, 100],
                            align: 'center',
                            valign: 'center',
                        });
                        // file name
                        doc.pipe(response);
                        await doc.table(table, {
                            columnSpacing: 10,
                            padding: 10,
                            align: 'center',
                            prepareHeader: () => {
                                doc.fontSize(11);
                            },
                            divider: {
                                header: { disabled: true, width: 2, opacity: 1 },
                            },
                            prepareRow: (
                                row,
                                indexColumn,
                                indexRow,
                                rectRow,
                                rectCell
                            ) => {
                                const { x, y, width, height } = rectCell;
                                // first line
                                if (indexColumn === 0) {
                                    doc
                                        .lineWidth(0.5)
                                        .moveTo(x, y)
                                        .lineTo(x, y + height)
                                        .stroke();
                                }
                                doc
                                    .lineWidth(0.5)
                                    .moveTo(x + width, y)
                                    .lineTo(x + width, y + height)
                                    .stroke();
                            },
                        });

                        doc.end();
                    };

                    await exportdatatoPDFTable(dailydata.flat(), res);
                } else {
                    stringify(dailydata.flat(), {
                        header: true,
                    }).pipe(res);
                    res.setHeader('Content-Type', 'text/csv');
                    res.setHeader(
                        'Content-Disposition',
                        `attachment; filename="reportdata-${dateinfo}.csv"`
                    );
                }
            } else {

                return res.status(200).send(util.response(dailydata.flat()));
            }
        } catch (error) {
            log.error(error);
        }
    },
    getnoralPRreport: async (req, res) => {
        try {
            const rawprdata = [];
            const PQMDevice = devices
                .filter((f) => f.devicetypeid == devicetypeenum.PQM)
                .map((x) => x.deviceid);
            const databyDate = lodash.groupBy(blockdevicedata, (x) =>
                format(new Date(x.localstarttimestamp), "yyyy-MM-dd")
            );
            Object.entries(databyDate).map(([date, data]) => {
                data.map((devicedata, idx) => {
                    let previousvalue =
                        idx - 1 == -1
                            ? 0
                            : lodash.sumBy(
                                Object.values(data[0].devices).filter(
                                    (d) => d.devicemeta.devicetypeid == devicetypeenum.PQM
                                ),
                                (x) => x.parameters.PQM_TOT_ACT_EXP
                            );
                    let currentvalue = lodash.sumBy(
                        Object.values(devicedata.devices).filter(
                            (d) => d.devicemeta.devicetypeid == devicetypeenum.PQM
                        ),
                        (x) => x.parameters.PQM_TOT_ACT_EXP
                    );

                    let wmspoa = isNaN(
                        lodash.meanBy(
                            Object.values(devicedata.devices).filter(
                                (d) => d.devicemeta.devicetypeid == devicetypeenum.WMS
                            ),
                            (x) => x.parameters.WMS_POA
                        )
                    )
                        ? 0
                        : lodash.meanBy(
                            Object.values(devicedata.devices).filter(
                                (d) => d.devicemeta.devicetypeid == devicetypeenum.WMS
                            ),
                            (x) => x.parameters.WMS_POA
                        );
                    rawprdata.push({
                        "Actual Energy Export(kWh)":
                            isFinite(currentvalue - previousvalue) &&
                                isNaN(currentvalue - previousvalue)
                                ? 0
                                : currentvalue - previousvalue,
                        "PQM Active Total Export(kWh)": currentvalue,
                        Timestamp: format(
                            new Date(devicedata.localstarttimestamp),
                            "yyyy-MM-dd"
                        ),
                        "POA (w/m2)": wmspoa,
                    });
                });
            });
            const listofdevices = lodash.sortBy(devices, "devicesortorder");
            const blocksinfo = Object.fromEntries(
                blocks.map((x) => [x.blockid, x.blockdisplayname])
            );
            const gapqmdevices = Object.fromEntries(
                listofdevices
                    .filter((f) => f.devicetypeid === devicetypeenum.PQM)
                    .map((x) => [
                        x.deviceid,
                        `${blocksinfo[x.blockid]} ${x.devicedisplayname}`,
                    ])
            );
            var garawdata = blockdevicedata.map((data) => {
                let datavalue = {
                    Timestamp: format(
                        new Date(data.localstarttimestamp),
                        "yyyy-MM-dd HH:MM"
                    ),
                };
                var devicedatavalue = {};
                Object.entries(gapqmdevices).map(([deviceid, devicename]) => {
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

            const GAdata = lodash.groupBy(garawdata, (x) =>
                format(new Date(x.Timestamp), "yyyy-mm-dd")
            );
            const rawgadata = Object.entries(GAdata).map(([date, data]) => {
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
                    "Grid Availability (%)": gatotalcalculatedvalue,
                };
            });
            const painverterdevices = Object.fromEntries(
                listofdevices
                    .filter((f) => f.devicetypeid === 3)
                    .map((x) => [
                        x.deviceid,
                        `${blocksinfo[x.blockid]} ${x.devicedisplayname}`,
                    ])
            );

            var parawdata = blockdevicedata.map((data) => {
                let datavalue = {
                    Timestamp: format(
                        new Date(data.localstarttimestamp),
                        "yyyy-MM-dd HH:MM"
                    ),
                };
                var padevicedatavalue = {};
                Object.entries(painverterdevices).map(([deviceid, devicename]) => {
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
                    padevicedatavalue = { ...padevicedatavalue, ...newdata };
                });
                const pa_wmsvalue = Object.fromEntries(
                    Object.entries(data.devices).filter(
                        ([devicedataid, devicedata]) =>
                            devicedata.devicemeta.devicetypeid === 7
                    )
                );
                const pa_pqmvalue = Object.fromEntries(
                    Object.entries(data.devices).filter(
                        ([devicedataid, devicedata]) =>
                            devicedata.devicemeta.devicetypeid === 15
                    )
                );
                const pa_wmspoa = isNaN(
                    lodash.mean(
                        Object.values(pa_wmsvalue)
                            .map((x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-")
                            .filter((d) => d !== undefined)
                    )
                )
                    ? 0
                    : lodash.mean(
                        Object.values(pa_wmsvalue)
                            .map(
                                (x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-"
                            )
                            .filter((d) => d !== undefined)
                    );
                const pa_pqmValue = lodash.sum(
                    Object.values(pa_pqmvalue)
                        .map((x) =>
                            x.parameters.PQM_TOT_ACT_EXP &&
                                x.parameters.PQM_TOT_ACT_EXP !== "-"
                                ? x.parameters.PQM_TOT_ACT_EXP
                                : undefined
                        )
                        .filter((d) => d !== undefined)
                );
                let inverterrunning = 0;
                if (pa_wmspoa > 25) {
                    inverterrunning = Object.entries(padevicedatavalue)
                        .map(([dev, data]) => data)
                        .filter((x) => x == 1).length;
                }
                return {
                    ...datavalue,
                    ...padevicedatavalue,
                    POA: pa_wmspoa,
                    "Inverter running": inverterrunning,
                    PQM: pa_pqmValue ? pa_pqmValue : 0,
                };
            });

            const padailydata = lodash.groupBy(parawdata, (x) =>
                format(new Date(x.Timestamp), "yyyy-mm-dd")
            );
            const rawpadata = Object.entries(padailydata).map(([date, data]) => {
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
                            return Number.isSafeInteger(hours) && hours !== 0
                                ? hours / 60
                                : "00";
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
            const prdailydata = lodash.groupBy(rawprdata, (x) =>
                format(new Date(x.Timestamp), "yyyy-mm-dd")
            );
            const calculatedprdata = Object.entries(prdailydata).map(
                ([date, data]) => {
                    const energyvalue = lodash.sumBy(data, "Actual Energy Export(kWh)");
                    const poavalue = lodash.sumBy(data, "POA (w/m2)");
                    return {
                        Timestamp: date,
                        "Energy Export(kWh)": energyvalue,
                        "POA (w/m2)": poavalue,
                    };
                }
            );
            const cumulativevalue = lodash.merge(
                calculatedprdata,
                rawpadata,
                rawgadata
            );
            const rawnormalprdata = cumulativevalue.map((x) => {
                let prvalue =
                    (x["Energy Export(kWh)"] / x["POA (w/m2)"]) *
                    50000 *
                    x["Grid Availability (%)"] *
                    x["Plant Availability (%)"] *
                    100;
                const calculatedprvalue =
                    isNaN(prvalue) || isFinite(prvalue) ? 0 : prvalue;
                return {
                    Timestamp: x.Timestamp,
                    "Energy Export(kWh)": x["Energy Export(kWh)"],
                    "Grid Availability (%)": x["Grid Availability (%)"],
                    "Plant Availability (%)": x["Plant Availability (%)"],
                    "POA(kWh/m2)": x["POA (w/m2)"],
                    "PR (%)": calculatedprvalue,
                };
            });
            console.log(rawnormalprdata);

            const wb = XLSX.utils.book_new();
            const filename = "pareport.xlsx";
            const PRData = XLSX.utils.json_to_sheet(rawnormalprdata);
            XLSX.utils.book_append_sheet(wb, PRData, "PR");
            const PArawdata = XLSX.utils.json_to_sheet(rawprdata);
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
        } catch (e) {
            console.log(e);
        }
    },
};
