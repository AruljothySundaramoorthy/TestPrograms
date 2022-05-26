const functionbuilder = async (
    parameter1,
    parameter2,
    parameter3,
    parameter4
) => {
    const dbconnection = parameter1;
    const {
        devicebusiness,
        settingbusiness,
        reportbusiness,
        blockbusiness,
        blockdevicedata,
        inverterunitunavailabilitybusiness,
        prdatabusiness,
        devicetypeEnum,
        prreport,
        blockdevicedatamodel,
        operationbusiness,
        parameterbusiness,
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
        fs,
        res,
        PDFDocument,
        stringify,
    } = parameter3;
    var { settingdata, userinput, getData } = parameter4;
    try {
        startdate = startOfDay(new Date(userinput.startdate));
        enddate = endOfDay(new Date(userinput.enddate));
        const blocks = await blockbusiness.showblockslist(dbconnection);
        const blockinfo = Object.fromEntries(
            blocks.map((x) => [x.blockid, x.blockdisplayname])
        );
        const listofdevices = [devicetypeEnum.WMS];
        const listofdevicesdata = await devicebusiness.getdevicesbydeviceid(
            dbconnection,
            listofdevices
        );
        var devices = await devicebusiness.showdevicebydeviceid(
            dbconnection,
            devicetypeEnum.WMS
        );
        devices = lodash.sortBy(devices, "devicesortorder");
        const deviceidsandblockinfo = Object.fromEntries(
            devices.map((x) => [
                x.deviceid,
                ` ${blockinfo[x.blockid]} ${x.devicedisplayname}`,
            ])
        );
        const deviceids = devices.map((x) => x.deviceid);
        const deviceinformations = devices.map((x) => x.deviceid);
        const operations = lodash.uniq(
            devices
                .filter((x) => x.devicetypeid == devicetypeEnum.WMS)
                .map((x) => x.deviceoperations)
                .flat()
        );
        var paramters = await operationbusiness.showoperationsnyoperationsid(
            dbconnection,
            operations
        );
        var parametersinfo = await parameterbusiness.getparametersbyparameterids(
            dbconnection,
            lodash.uniq(paramters.map((x) => x.operationparameters).flat())
        );
        const tagInformations = Object.fromEntries(
            parametersinfo.map((x) => [
                x.parametername,
                `${x.parameterdisplayname} (${x.parameterunit})`,
            ])
        );
        let deviecfilters = {
            starttimestamp: 1,
            localstarttimestamp: 1,
            localstarttime: 1,
        };
        listofdevicesdata.forEach((a) => {
            let d = { [`devices.${a.deviceid}`]: 1 };
            deviecfilters = { ...deviecfilters, ...d };
        });
        const rawdata = await blockdevicedatamodel(dbconnection)
            .find(
                {
                    localstarttime: {
                        $gte: format(startdate, "yyyy-MM-dd HH:mm"),
                        $lte: format(enddate, "yyyy-MM-dd HH:mm"),
                    },
                },
                { ...deviecfilters, _id: 0 }
            )
            .sort({ localstarttime: -1 })
            .lean();
        const TimebasedData = lodash.groupBy(rawdata, (x) => {
            return Math.floor(
                differenceInMinutes(x.localstarttimestamp, startdate) /
                userinput.frequency
            );
        });
        const rawdatavalues = Object.entries(TimebasedData).map(
            ([index, timebaseddata]) => {
                let returndata = {
                    Timestamp: format(
                        new Date(timebaseddata[timebaseddata.length - 1].localstarttime),
                        "yyyy-MM-dd HH:mm"
                    ),
                };
                deviceids.forEach((deviceid) => {
                    const devicedata = timebaseddata.map((x) => x.devices[deviceid]);
                    Object.entries(tagInformations).map(([tag, name]) => {
                        const value = isNaN(
                            lodash.mean(
                                devicedata
                                    .map(
                                        (x) =>
                                            x.parameters &&
                                            x.parameters[tag] &&
                                            x.parameters[tag] !== "-"
                                    )
                                    .filter((x) => x !== undefined)
                            )
                        )
                            ? 0
                            : lodash.mean(
                                devicedata
                                    .map(
                                        (x) =>
                                            x.parameters &&
                                            x.parameters[tag] &&
                                            x.parameters[tag] !== "-"
                                    )
                                    .filter((x) => x !== undefined)
                            );
                        const keyval = `${deviceidsandblockinfo[deviceid]} ${name}`.trim();
                        Object.assign(returndata, { [keyval]: value });
                    });
                });
                return returndata;
            }
        );
        if (userinput.type === "csv") {
            stringify(rawdatavalues, { header: true }).pipe(res);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                `Content-Disposition`,
                `attachment; filename=wmsreport.csv`
            );
        } else if (userinput.type === "pdf") {
            const clientimageresult = await settingbusiness.getClientImage(
                dbconnection
            );
            const { clientimage } = clientimageresult;
            const exportdatatoPDFTable = async (dataArray, response) => {
                const table = {
                    title: `Project Name: ${settingdata.plantdisplayname}`,
                    subtitle: `ReportName:WMS Report \nLocation: ${settingdata.plantlocationmeta.address
                        } ${settingdata.plantlocationmeta.city}\nFrom ${format(
                            new Date(startdate),
                            "yyyy-mm-dd HH:MM"
                        )} To ${format(
                            new Date(enddate),
                            "yyyy-mm-dd HH:MM"
                        )}\nReport Generated By : ONESCADA\n\n`,
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
                    layout: "landscape",
                });
                doc.image(
                    `data:image/jpeg;base64,${clientimage}`,
                    size[1] - 100 - 30,
                    6,
                    { fit: [100, 100], align: "center", valign: "center" }
                );
                doc.pipe(response);
                await doc.table(table, {
                    columnSpacing: 10,
                    padding: 10,
                    align: "center",
                    prepareHeader: () => {
                        doc.fontSize(11);
                    },
                    divider: { header: { disabled: true, width: 2, opacity: 1 } },
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        const { x, y, width, height } = rectCell;
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
            const colums = Object.keys(rawdatavalues[0]);
            await exportdatatoPDFTable(
                rawdatavalues.map((x) => ({ ...lodash.pick(x, colums) })),
                res
            );
        } else {
            stringify(rawdatavalues, { header: true }).pipe(res);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                `Content-Disposition`,
                `attachment; filename=wmsreport.csv`
            );
        }
    } catch (e) {
        log.error(e);
    }
};
