const functionbuilder = async (parameter1, parameter2, parameter3, parameter4) => {
    const dbconnection = parameter1;
    const {
        devicebusiness,
        settingbusiness,
        reportbusiness,
        blockbusiness,
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
        workbook,
        req,
        fs,
        res,
        XLSX
    } = parameter3;
    let { startdate, enddate } = parameter4;
    let devicedata = await devicebusiness.showdevicebydeviceid(
        dbconnection,
        devicetypeEnum.INVERTER
    );
    devicedata = JSON.parse(JSON.stringify(devicedata));
    const blockinfo = await blockbusiness.showblockslist(dbconnection);
    startdate = startOfDay(new Date(startdate));
    enddate = endOfDay(new Date(enddate));
    const rawdata = await reportbusiness.plantavailabilityreport(
        dbconnection,
        startdate,
        enddate
    );
    const invAvail = [];
    let invResultObj;
    const strAvail = [];
    let strResultObj;
    const maaAvail = [];
    let maaResultObj;
    const dayAvail = [];
    const deviceinfo = {};
    let sum;
    let invNum;
    let dataNum = 0;
    let maaAvg = 0;
    devicedata.forEach((f) => {
        const a = blockinfo.find((x) => x.blockid === f.blockid);
        deviceinfo[f.deviceid] = `${a.blockdisplayname} ${f.devicedisplayname}`;
    });
    rawdata.forEach((element, index) => {
        if (element.padata && element.padata.devices) {
            const devices = element.padata.devices;
            const dt = format(
                parse(
                    format(new Date(element.palocaltimestamp), "mm"),
                    "mm",
                    new Date()
                ),
                "mm"
            );
            if (index === 0 || dt.charAt(dt.length - 1) === "0") {
                invResultObj = { TimeStamp: element.palocaltimestamp };
                strResultObj = { TimeStamp: element.palocaltimestamp };
                maaResultObj = { TimeStamp: element.palocaltimestamp };
                sum = 0;
                invNum = 0;
            }
            Object.entries(devices).forEach((d, idx) => {
                Object.entries(d).forEach((p) => {
                    if (p[1].INV_STS === 1) {
                        if (invResultObj[[deviceinfo[d[0]]]]) {
                            invResultObj[[deviceinfo[d[0]]]] =
                                p[1].INV_STS === 1
                                    ? invResultObj[[deviceinfo[d[0]]]] + 1
                                    : invResultObj[[deviceinfo[d[0]]]];
                        } else {
                            invResultObj[[deviceinfo[d[0]]]] = 1;
                        }
                        const INV_IP_CRT1 = p[1].INV_IP_CRT1 > 0 ? 1 : 0;
                        const INV_IP_CRT2 = p[1].INV_IP_CRT2 > 0 ? 1 : 0;
                        const INV_IP_CRT3 = p[1].INV_IP_CRT3 > 0 ? 1 : 0;
                        const INV_IP_CRT4 = p[1].INV_IP_CRT4 > 0 ? 1 : 0;
                        const INV_IP_CRT5 = p[1].INV_IP_CRT5 > 0 ? 1 : 0;
                        const INV_IP_CRT6 = p[1].INV_IP_CRT6 > 0 ? 1 : 0;
                        const INV_IP_CRT7 = p[1].INV_IP_CRT7 > 0 ? 1 : 0;
                        const INV_IP_CRT8 = p[1].INV_IP_CRT8 > 0 ? 1 : 0;
                        const INV_IP_CRT9 = p[1].INV_IP_CRT9 > 0 ? 1 : 0;
                        const INV_IP_CRT10 = p[1].INV_IP_CRT10 > 0 ? 1 : 0;
                        const INV_IP_CRT11 = p[1].INV_IP_CRT11 > 0 ? 1 : 0;
                        const INV_IP_CRT12 = p[1].INV_IP_CRT12 > 0 ? 1 : 0;
                        const INV_IP_CRT13 = p[1].INV_IP_CRT13 > 0 ? 1 : 0;
                        const INV_IP_CRT14 = p[1].INV_IP_CRT14 > 0 ? 1 : 0;
                        const INV_IP_CRT15 = p[1].INV_IP_CRT15 > 0 ? 1 : 0;
                        const INV_IP_CRT16 = p[1].INV_IP_CRT16 > 0 ? 1 : 0;
                        const INV_IP_CRT17 = p[1].INV_IP_CRT17 > 0 ? 1 : 0;
                        const INV_IP_CRT18 = p[1].INV_IP_CRT18 > 0 ? 1 : 0;
                        const INV_IP_CRT19 = p[1].INV_IP_CRT19 > 0 ? 1 : 0;
                        const INV_IP_CRT20 = p[1].INV_IP_CRT20 > 0 ? 1 : 0;
                        const INV_IP_CRT21 = p[1].INV_IP_CRT21 > 0 ? 1 : 0;
                        const INV_IP_CRT22 = p[1].INV_IP_CRT22 > 0 ? 1 : 0;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT1`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT1`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT1`] + INV_IP_CRT1
                            : INV_IP_CRT1;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT2`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT2`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT2`] + INV_IP_CRT2
                            : INV_IP_CRT2;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT3`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT3`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT3`] + INV_IP_CRT3
                            : INV_IP_CRT3;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT4`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT4`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT4`] + INV_IP_CRT4
                            : INV_IP_CRT4;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT5`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT5`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT5`] + INV_IP_CRT5
                            : INV_IP_CRT5;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT6`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT6`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT6`] + INV_IP_CRT6
                            : INV_IP_CRT6;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT7`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT7`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT7`] + INV_IP_CRT7
                            : INV_IP_CRT7;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT8`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT8`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT8`] + INV_IP_CRT8
                            : INV_IP_CRT8;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT9`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT9`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT9`] + INV_IP_CRT9
                            : INV_IP_CRT9;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT10`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT10`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT10`] + INV_IP_CRT10
                            : INV_IP_CRT10;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT11`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT11`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT11`] + INV_IP_CRT11
                            : INV_IP_CRT11;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT12`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT12`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT12`] + INV_IP_CRT12
                            : INV_IP_CRT12;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT13`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT13`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT13`] + INV_IP_CRT13
                            : INV_IP_CRT13;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT14`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT14`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT14`] + INV_IP_CRT14
                            : INV_IP_CRT14;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT15`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT15`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT15`] + INV_IP_CRT15
                            : INV_IP_CRT15;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT16`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT16`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT16`] + INV_IP_CRT16
                            : INV_IP_CRT16;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT17`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT17`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT17`] + INV_IP_CRT17
                            : INV_IP_CRT17;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT18`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT18`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT18`] + INV_IP_CRT18
                            : INV_IP_CRT18;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT19`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT19`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT19`] + INV_IP_CRT19
                            : INV_IP_CRT19;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT20`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT20`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT20`] + INV_IP_CRT20
                            : INV_IP_CRT20;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT21`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT21`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT21`] + INV_IP_CRT21
                            : INV_IP_CRT21;
                        strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT22`] = strResultObj[
                            `${deviceinfo[d[0]]} INV_IP_CRT22`
                        ]
                            ? strResultObj[`${deviceinfo[d[0]]} INV_IP_CRT22`] + INV_IP_CRT22
                            : INV_IP_CRT22;
                        sum =
                            sum +
                            INV_IP_CRT1 +
                            INV_IP_CRT2 +
                            INV_IP_CRT3 +
                            INV_IP_CRT4 +
                            INV_IP_CRT5 +
                            INV_IP_CRT6 +
                            INV_IP_CRT7 +
                            INV_IP_CRT8 +
                            INV_IP_CRT9 +
                            INV_IP_CRT10 +
                            INV_IP_CRT11 +
                            INV_IP_CRT12 +
                            INV_IP_CRT13 +
                            INV_IP_CRT14 +
                            INV_IP_CRT15 +
                            INV_IP_CRT16 +
                            INV_IP_CRT17 +
                            INV_IP_CRT18 +
                            INV_IP_CRT19 +
                            INV_IP_CRT20 +
                            INV_IP_CRT21 +
                            INV_IP_CRT22;
                        invNum += 22;
                        if (idx === Object.keys(devices).length - 1) {
                            if (dt.charAt(dt.length - 1) === "9") {
                                const unavailability = (invNum * 10 - sum) / invNum;
                                const availability = 10 - (invNum * 10 - sum) / invNum;
                                strResultObj.Total = sum;
                                strResultObj.Total_Inverter_Number = invNum;
                                strResultObj.Unavailability = unavailability;
                                strResultObj.Availability = availability;
                                maaResultObj.Availability = availability;
                                invAvail.push(invResultObj);
                                strAvail.push(strResultObj);
                                maaAvail.push(maaResultObj);
                                invResultObj = {};
                                strResultObj = {};
                                maaResultObj = {};
                                sum = 0;
                                dataNum += 1;
                                maaAvg += availability;
                            }
                        }
                    }
                });
            });
            if (index === rawdata.length - 1) {
                const daydata = lodash.groupBy(Object.entries(maaAvail), (x) =>
                    format(
                        parse(
                            format(new Date(x[1].TimeStamp), "yyyyMMdd"),
                            "yyyyMMdd",
                            new Date()
                        ),
                        "dd-MM-yyyy"
                    )
                );
                Object.entries(daydata).forEach((dd) => {
                    let avg = 0;
                    dd[1].forEach((d) => {
                        avg += d[1].Availability;
                    });
                    dayAvail.push({ Day: dd[0], Availability: avg / dd[1].length });
                });
            }
        }
    });
    const wb = XLSX.utils.book_new();
    const filename = "PA_Report.xlsx";
    const PRdataSheet1 = XLSX.utils.json_to_sheet(maaAvail);
    XLSX.utils.book_append_sheet(wb, PRdataSheet1, "MAA");
    const PRdataSheet2 = XLSX.utils.json_to_sheet(dayAvail);
    XLSX.utils.book_append_sheet(wb, PRdataSheet2, "Day_Availability");
    const PRdataSheet3 = XLSX.utils.json_to_sheet(invAvail);
    XLSX.utils.book_append_sheet(wb, PRdataSheet3, "Inverter_Availability");
    const PRdataSheet4 = XLSX.utils.json_to_sheet(strAvail);
    XLSX.utils.book_append_sheet(wb, PRdataSheet4, "String_Availability");
    const wbOpts = { bookType: "xlsx", type: "binary" };
    XLSX.writeFile(wb, filename, wbOpts);
    const stream = fs.createReadStream(filename);
    stream.pipe(res);
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${`PA-Report-${format(
            new Date(),
            "yyyyMMddHHmmss"
        )}.xlsx`}`
    );
};
