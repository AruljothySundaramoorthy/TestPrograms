const overallreportfunction = async (
    parameter1,
    parameter2,
    parameter3,
    parameter4
) => {
    const dbconnection = parameter1;
    const {
        prreport,
        devicebusiness,
        settingbusiness,
        parameterbusiness,
        blockdevicedata,
    } = parameter2;
    const {
        log,
        lodash,
        parse,
        differenceInHours,
        differenceInMinutes,
        format,
        endOfDay,
        startOfDay,
        devicetypeEnum,
        workbook,
        util,
    } = parameter3;
    let { startdate, enddate, dailydata } = parameter4;
    const parameterlist = await parameterbusiness.showparameters(dbconnection);
    const helperfunctionsdata = await settingbusiness.gethelperfunctions(
        dbconnection
    );
    const [dailydataobject] = dailydata;
    const listofparameters = JSON.parse(JSON.stringify(parameterlist));
    const listofdevices = [
        devicetypeEnum.INVERTER,
        devicetypeEnum.WMS,
        devicetypeEnum.MAINMETER,
        devicetypeEnum.CHECKMETER,
        devicetypeEnum.PQM,
        devicetypeEnum.METER,
    ];
    let devicefilterquery;
    const listofdevicesdata = await devicebusiness.getdevicesbylistofdevicetypeid(
        dbconnection,
        listofdevices
    );
    listofdevicesdata.forEach((a) => {
        const d = { [`devices.${a.deviceid}`]: 1 };
        devicefilterquery = { ...devicefilterquery, ...d };
    });
    let blockdata;
    try {
        blockdata = await blockdevicedata.getblockdatabydevices(
            dbconnection,
            Date.parse(startdate),
            Date.parse(enddate),
            devicefilterquery
        );
        let tempdevicedata = {};
        const firstdata = blockdata[0].devices;
        const lastdata = blockdata[blockdata.length - 1].devices;
        Object.keys(firstdata).map((x) => {
            const tempvalues = firstdata[x].devicemeta;
            const newtempdata = {
                [x]: {
                    devicemeta: tempvalues,
                    value: 0,
                    deviceid: x,
                    minvalue: 0,
                    maxvalue: 0,
                    minimportvalue: 0,
                    minexportvalue: 0,
                    maximportvalue: 0,
                    maxexportvalue: 0,
                    exportvalue: 0,
                    importvalue: 0,
                    unit: "-",
                },
            };
            tempdevicedata = { ...tempdevicedata, ...newtempdata };
        });
        let inverterdevices = {};
        let mfmdevices = {};
        let checkmeterdevices = {};
        let mainmeterdevices = {};
        let pqmdevices = {};
        let wmsdevices = {};
        const wmssurtemp = [];
        const wmsambienttemp = [];
        const peekpower = [];
        let plantstarttime;
        let plantstoptime;
        const plantperformanceration = 0;
        let overalltempwmspoa = [];
        let overalltempwmsghi = [];
        let overalltempwmswindspeed = [];
        let overalltempwmsrelativehumidity = [];
        let overallambienttemperature = [];
        const tempminwmsmoduletemperature = [];
        Object.entries(tempdevicedata).map((x) => {
            if (x[1].devicemeta.devicetypeid === 3) {
                inverterdevices = { ...inverterdevices, ...{ [x[0]]: x[1] } };
            }
            if (
                x[1].devicemeta.devicetypeid === 25 &&
                (x[1].devicemeta.devicename.startsWith("OG1_MFM") ||
                    x[1].devicemeta.devicename.startsWith("OG2_MFM"))
            ) {
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
            if (x[1].devicemeta.devicetypeid === 7) {
                wmsdevices = { ...wmsdevices, ...{ [x[0]]: x[1] } };
            }
        });
        const data = [];
        const tempmoduletemp = [];
        let tempdatalength = [];
        blockdata.forEach((d, idx) => {
            wmscalculationinfoparamters = {
                totalwmspoalength: 0,
                totalwmspoavalue: 0,
                totalwmsghilength: 0,
                totalwmsghivalue: 0,
                totalwmswindspeedlength: 0,
                totalwmswindspeedvalue: 0,
                totalwmsrelativehumiditylength: 0,
                totalwmsrelativehumidityvalue: 0,
                totalwmsambienttemperaturelength: 0,
                totalwmsambienttemperaturevalue: 0,
            };
            const wmsdevice = Object.values(d.devices).filter(
                (c) => c.devicemeta.devicetypeid === devicetypeEnum.WMS
            );
            const wmscalculationinfo = wmsdevice.filter(
                (f) => f.parameters.IS_HEALTHY === true && f.parameters.WMS_POA > 0
            );
            if (wmscalculationinfo.length > 0) {
                const tempmodulevalue = [];
                tempmodulevalue.push(
                    Object.values(wmscalculationinfo).map(
                        (x) => x.parameters.WMS_MDL_TEMP1
                    )
                );
                tempmodulevalue.push(
                    Object.values(wmscalculationinfo).map(
                        (x) => x.parameters.WMS_MDL_TEMP2
                    )
                );
                tempmodulevalue.push(
                    Object.values(wmscalculationinfo).map(
                        (x) => x.parameters.WMS_MDL_TEMP3
                    )
                );
                tempmodulevalue.push(
                    Object.values(wmscalculationinfo).map(
                        (x) => x.parameters.WMS_MDL_TEMP4
                    )
                );
                const tempvaluesmap = tempmodulevalue
                    .flat()
                    .map((c) => parseFloat(c.toFixed(2)));
                const tempvalues = isNaN(lodash.meanBy(tempvaluesmap))
                    ? 0
                    : lodash.meanBy(tempvaluesmap);
                tempmoduletemp.push(tempvalues);
                wmssurtemp.push(tempvalues);
                tempminwmsmoduletemperature.push(tempvalues);
                wmscalculationinfoparamters.totalwmspoavalue += lodash.sumBy(
                    wmscalculationinfo,
                    (x) => x.parameters.WMS_POA
                );
                wmscalculationinfoparamters.totalwmsghivalue += lodash.sumBy(
                    wmscalculationinfo,
                    (x) => x.parameters.WMS_GHI
                );
                wmscalculationinfoparamters.totalwmsrelativehumidityvalue +=
                    lodash.sumBy(wmscalculationinfo, (x) => x.parameters.WMS_HUM);
                wmscalculationinfoparamters.totalwmsambienttemperaturevalue +=
                    lodash.sumBy(wmscalculationinfo, (x) => x.parameters.WMS_AMB_TEMP);
                wmscalculationinfoparamters.totalwmswindspeedvalue += lodash.sumBy(
                    wmscalculationinfo,
                    (x) => x.parameters.WMS_WND_SPD
                );
                wmscalculationinfoparamters.totalwmspoalength +=
                    wmscalculationinfo.length;
                wmscalculationinfoparamters.totalwmsghilength +=
                    wmscalculationinfo.length;
                wmscalculationinfoparamters.totalwmswindspeedlength +=
                    wmscalculationinfo.length;
                wmscalculationinfoparamters.totalwmsrelativehumiditylength +=
                    wmscalculationinfo.length;
                wmscalculationinfoparamters.totalwmsambienttemperaturelength +=
                    wmscalculationinfo.length;
            }
            wmstotalpoa = isNaN(
                wmscalculationinfoparamters.totalwmspoavalue /
                wmscalculationinfoparamters.totalwmspoalength
            )
                ? 0
                : wmscalculationinfoparamters.totalwmspoavalue /
                wmscalculationinfoparamters.totalwmspoalength;
            wmstotalghi = isNaN(
                wmscalculationinfoparamters.totalwmsghivalue /
                wmscalculationinfoparamters.totalwmsghilength
            )
                ? 0
                : wmscalculationinfoparamters.totalwmsghivalue /
                wmscalculationinfoparamters.totalwmsghilength;
            wmstotalwindspeed = isNaN(
                wmscalculationinfoparamters.totalwmswindspeedvalue /
                wmscalculationinfoparamters.totalwmswindspeedlength
            )
                ? 0
                : wmscalculationinfoparamters.totalwmswindspeedvalue /
                wmscalculationinfoparamters.totalwmswindspeedlength;
            wmstotalrelativehumidity = isNaN(
                wmscalculationinfoparamters.totalwmsrelativehumidityvalue /
                wmscalculationinfoparamters.totalwmsrelativehumiditylength
            )
                ? 0
                : wmscalculationinfoparamters.totalwmsrelativehumidityvalue /
                wmscalculationinfoparamters.totalwmsrelativehumiditylength;
            wmstotalambienttemperature = isNaN(
                wmscalculationinfoparamters.totalwmsambienttemperaturevalue /
                wmscalculationinfoparamters.totalwmsambienttemperaturelength
            )
                ? 0
                : wmscalculationinfoparamters.totalwmsambienttemperaturevalue /
                wmscalculationinfoparamters.totalwmsambienttemperaturelength;
            if (wmstotalpoa >= 5) {
                tempdatalength.push(wmstotalghi);
                overalltempwmspoa.push(wmstotalpoa);
                overalltempwmsghi.push(wmstotalghi);
                overalltempwmswindspeed.push(wmstotalwindspeed);
                overalltempwmsrelativehumidity.push(wmstotalrelativehumidity);
                overallambienttemperature.push(wmstotalambienttemperature);
                data.push(d);
            }
        });
        filterdata = (datavalue, tagname, predicate, deviceid) => {
            let resultvalue;
            const filteredvalue = lodash.filter(
                Object.values(datavalue),
                (x) => typeof x.devices[deviceid].parameters[tagname] == "number"
            );
            if (predicate == "min") {
                resultvalue = lodash.minBy(
                    Object.values(filteredvalue),
                    (x) => x.devices[deviceid].parameters[tagname] > 0
                );
            } else {
                resultvalue = lodash.maxBy(
                    Object.values(blockdata),
                    (x) => x.devices[deviceid].parameters[tagname]
                );
            }
            return resultvalue;
        };
        Object.keys(pqmdevices).forEach((y) => {
            const tempexportvalueunit = listofparameters.find(
                (f) => f.parametername == "PQM_TOT_ACT_EXP"
            );
            const minpqmexportvalues = filterdata(
                blockdata,
                "PQM_TOT_ACT_EXP",
                "min",
                y
            );
            pqmdevices[y].minexportvalue =
                minpqmexportvalues.devices[y].parameters.PQM_TOT_ACT_EXP || 0;
            const maxpqmexportvalue = filterdata(
                blockdata,
                "PQM_TOT_ACT_EXP",
                "max",
                y
            );
            lodash.maxBy(
                Object.values(blockdata),
                (x) => x.devices[y].parameters.PQM_TOT_ACT_EXP
            );
            pqmdevices[y].maxexportvalue =
                maxpqmexportvalue.devices[y].parameters.PQM_TOT_ACT_EXP || 0;
            pqmdevices[y].unit = tempexportvalueunit.parameterunit;
            const tempimportvalueunit = listofparameters.find(
                (f) => f.parametername == "PQM_TOT_ACT_IMP"
            );
            const minpqmimportvalues = filterdata(
                blockdata,
                "PQM_TOT_ACT_IMP",
                "min",
                y
            );
            pqmdevices[y].minimportvalue =
                minpqmimportvalues.devices[y].parameters.PQM_TOT_ACT_IMP || 0;
            const maxpqmimportvalue = filterdata(
                blockdata,
                "PQM_TOT_ACT_IMP",
                "max",
                y
            );
            pqmdevices[y].maximportvalue =
                maxpqmimportvalue.devices[y].parameters.PQM_TOT_ACT_IMP || 0;
            pqmdevices[y].unit = tempimportvalueunit.parameterunit;
        });
        Object.keys(mfmdevices).forEach((y) => {
            const tempexportvalueunit = listofparameters.find(
                (f) => f.parametername == "OGMFM_TOT_ACT_EXP"
            );
            const minpqmexportvalues = filterdata(
                blockdata,
                "OGMFM_TOT_ACT_EXP",
                "min",
                y
            );
            mfmdevices[y].minexportvalue =
                minpqmexportvalues.devices[y].parameters.OGMFM_TOT_ACT_EXP || 0;
            const maxogmfmexportvalue = filterdata(
                blockdata,
                "OGMFM_TOT_ACT_EXP",
                "max",
                y
            );
            mfmdevices[y].maxexportvalue =
                maxogmfmexportvalue.devices[y].parameters.OGMFM_TOT_ACT_EXP || 0;
            mfmdevices[y].unit = tempexportvalueunit.parameterunit;
            const tempimportvalueunit = listofparameters.find(
                (f) => f.parametername == "OGMFM_TOT_ACT_IMP"
            );
            const minpqmimportvalues = filterdata(
                blockdata,
                "OGMFM_TOT_ACT_IMP",
                "min",
                y
            );
            mfmdevices[y].minimportvalue =
                minpqmimportvalues.devices[y].parameters.OGMFM_TOT_ACT_IMP || 0;
            const maxogmfmimporttvalue = filterdata(
                blockdata,
                "OGMFM_TOT_ACT_IMP",
                "max",
                y
            );
            mfmdevices[y].maximportvalue =
                maxogmfmimporttvalue.devices[y].parameters.OGMFM_TOT_ACT_IMP || 0;
            mfmdevices[y].unit = tempimportvalueunit.parameterunit;
        });
        Object.keys(mainmeterdevices).forEach((y) => {
            if (mainmeterdevices[y].devicemeta.devicename == "MM1") {
                const tempexportvalueunit = listofparameters.find(
                    (f) => f.parametername == "MM1_TOT_ACT_EXP"
                );
                const minmainmeterexportvalue = filterdata(
                    blockdata,
                    "MM1_TOT_ACT_EXP",
                    "min",
                    y
                );
                mainmeterdevices[y].minexportvalue =
                    minmainmeterexportvalue.devices[y].parameters.MM1_TOT_ACT_EXP || 0;
                const maxmainmeterexportvalue = filterdata(
                    blockdata,
                    "MM1_TOT_ACT_EXP",
                    "max",
                    y
                );
                mainmeterdevices[y].maxexportvalue =
                    maxmainmeterexportvalue.devices[y].parameters.MM1_TOT_ACT_EXP || 0;
                mainmeterdevices[y].unit = tempexportvalueunit.parameterunit;
                const tempimportvalueunit = listofparameters.find(
                    (f) => f.parametername == "MM1_TOT_ACT_IMP"
                );
                const minmainmeterimportvalue = filterdata(
                    blockdata,
                    "MM1_TOT_ACT_IMP",
                    "min",
                    y
                );
                mainmeterdevices[y].minimportvalue =
                    minmainmeterimportvalue.devices[y].parameters.MM1_TOT_ACT_IMP || 0;
                const maxmainmeterimportvalue = filterdata(
                    blockdata,
                    "MM1_TOT_ACT_IMP",
                    "max",
                    y
                );
                mainmeterdevices[y].maximportvalue =
                    maxmainmeterimportvalue.devices[y].parameters.MM1_TOT_ACT_IMP || 0;
                mainmeterdevices[y].unit = tempimportvalueunit.parameterunit;
            } else {
                const tempexportvalueunit = listofparameters.find(
                    (f) => f.parametername == "MM2_TOT_ACT_EXP"
                );
                const minmainmeterexportvalue = filterdata(
                    blockdata,
                    "MM2_TOT_ACT_EXP",
                    "min",
                    y
                );
                mainmeterdevices[y].minexportvalue =
                    minmainmeterexportvalue.devices[y].parameters.MM2_TOT_ACT_EXP || 0;
                const maxmainmeterexportvalue = filterdata(
                    blockdata,
                    "MM2_TOT_ACT_EXP",
                    "max",
                    y
                );
                mainmeterdevices[y].maxexportvalue =
                    maxmainmeterexportvalue.devices[y].parameters.MM2_TOT_ACT_EXP || 0;
                mainmeterdevices[y].unit = tempexportvalueunit.parameterunit;
                const tempimportvalueunit = listofparameters.find(
                    (f) => f.parametername == "MM2_TOT_ACT_IMP"
                );
                const minmainmeterimportvalue = filterdata(
                    blockdata,
                    "MM2_TOT_ACT_IMP",
                    "min",
                    y
                );
                mainmeterdevices[y].minimportvalue =
                    minmainmeterimportvalue.devices[y].parameters.MM2_TOT_ACT_IMP || 0;
                const maxmainmeterimportvalue = filterdata(
                    blockdata,
                    "MM2_TOT_ACT_IMP",
                    "max",
                    y
                );
                mainmeterdevices[y].maximportvalue =
                    maxmainmeterimportvalue.devices[y].parameters.MM2_TOT_ACT_IMP || 0;
                mainmeterdevices[y].unit = tempimportvalueunit.parameterunit;
            }
        });
        Object.keys(checkmeterdevices).forEach((y) => {
            if (checkmeterdevices[y].devicemeta.devicename == "CM1") {
                const tempexportvalueunit = listofparameters.find(
                    (f) => f.parametername == "CM1_TOT_ACT_EXP"
                );
                const mincheckmeterexportvalues = filterdata(
                    blockdata,
                    "CM1_TOT_ACT_EXP",
                    "min",
                    y
                );
                checkmeterdevices[y].minexportvalue =
                    mincheckmeterexportvalues.devices[y].parameters.CM1_TOT_ACT_EXP || 0;
                const maxcheckmeterexportvalues = filterdata(
                    blockdata,
                    "CM1_TOT_ACT_EXP",
                    "max",
                    y
                );
                checkmeterdevices[y].maxexportvalue =
                    maxcheckmeterexportvalues.devices[y].parameters.CM1_TOT_ACT_EXP || 0;
                checkmeterdevices[y].unit = tempexportvalueunit.parameterunit;
                const tempimportvalueunit = listofparameters.find(
                    (f) => f.parametername == "CM1_TOT_ACT_IMP"
                );
                const mincheckmeterimportvalues = filterdata(
                    blockdata,
                    "CM1_TOT_ACT_IMP",
                    "min",
                    y
                );
                checkmeterdevices[y].minimportvalue =
                    mincheckmeterimportvalues.devices[y].parameters.CM1_TOT_ACT_IMP || 0;
                const maxcheckmeterimportvalues = filterdata(
                    blockdata,
                    "CM1_TOT_ACT_IMP",
                    "max",
                    y
                );
                checkmeterdevices[y].maximportvalue =
                    maxcheckmeterimportvalues.devices[y].parameters.CM1_TOT_ACT_IMP || 0;
                checkmeterdevices[y].unit = tempimportvalueunit.parameterunit;
            } else {
                const tempexportvalueunit = listofparameters.find(
                    (f) => f.parametername == "CM2_TOT_ACT_EXP"
                );
                const mincheckmeterexportvalues = filterdata(
                    blockdata,
                    "CM2_TOT_ACT_EXP",
                    "min",
                    y
                );
                checkmeterdevices[y].minexportvalue =
                    mincheckmeterexportvalues.devices[y].parameters.CM2_TOT_ACT_EXP || 0;
                const maxcheckmeterexportvalues = filterdata(
                    blockdata,
                    "CM2_TOT_ACT_EXP",
                    "max",
                    y
                );
                checkmeterdevices[y].maxexportvalue =
                    maxcheckmeterexportvalues.devices[y].parameters.CM2_TOT_ACT_EXP || 0;
                checkmeterdevices[y].unit = tempexportvalueunit.parameterunit;
                const tempimportvalueunit = listofparameters.find(
                    (f) => f.parametername == "CM2_TOT_ACT_IMP"
                );
                const mincheckmeterimportvalues = filterdata(
                    blockdata,
                    "CM2_TOT_ACT_IMP",
                    "min",
                    y
                );
                checkmeterdevices[y].minimportvalue =
                    mincheckmeterimportvalues.devices[y].parameters.CM2_TOT_ACT_IMP || 0;
                const maxcheckmeterimportvalues = filterdata(
                    blockdata,
                    "CM2_TOT_ACT_IMP",
                    "max",
                    y
                );
                checkmeterdevices[y].maximportvalue =
                    maxcheckmeterimportvalues.devices[y].parameters.CM2_TOT_ACT_IMP || 0;
                checkmeterdevices[y].unit = tempimportvalueunit.parameterunit;
            }
        });
        data.forEach((e) => {
            Object.keys(inverterdevices).forEach((x) => {
                Object.keys(e.devices).forEach((ed) => {
                    if (ed == x) {
                        if (
                            e.devices[ed].parameters.INV_DLY_ACT_EXP >
                            inverterdevices[x].value
                        ) {
                            inverterdevices[x].value =
                                e.devices[ed].parameters.INV_DLY_ACT_EXP;
                        }
                    }
                });
            });
            const temppeekpowerdevices = lodash.filter(
                Object.values(e.devices),
                (x) => x.devicemeta.devicetypeid === 21
            );
            let mainmeterpeekpowervalues = Object.values(temppeekpowerdevices).map(
                (c) => c.parameters.MM1_ACT_PWR || c.parameters.MM2_ACT_PWR || 0
            );
            peekpower.push(
                isNaN(lodash.sumBy(mainmeterpeekpowervalues))
                    ? 0
                    : lodash.sumBy(mainmeterpeekpowervalues)
            );
        });
        const page1data = [];
        const page2data = [];
        const page3data = [];
        overalltempwmspoa = lodash.filter(overalltempwmspoa, (x) => x > 0);
        overalltempwmsghi = lodash.filter(overalltempwmsghi, (x) => x > 0);
        overalltempwmswindspeed = lodash.filter(
            overalltempwmswindspeed,
            (x) => x > 0
        );
        overalltempwmsrelativehumidity = lodash.filter(
            overalltempwmsrelativehumidity,
            (x) => x > 0
        );
        overallambienttemperature = lodash.filter(
            overallambienttemperature,
            (x) => x > 0
        );
        plantstarttime = new Date(data[0].localstarttimestamp) || new Date();
        plantstoptime =
            new Date(data[data.length - 1].localstarttimestamp) || new Date();
        const plantrunninghours = differenceInHours(plantstoptime, plantstarttime);
        const temppalntstarttime = {
            devicename: "Plant start time",
            value: format(plantstarttime, "dd-MM-yyyy HH:mm:ss"),
            exportvalue: "-",
            importvalue: "-",
            unit: "Datetime",
        };
        const temppalntstopttime = {
            devicename: "Plant stop time",
            value: format(plantstoptime, "dd-MM-yyyy HH:mm:ss"),
            exportvalue: "-",
            importvalue: "-",
            unit: "Datetime",
        };
        const temppalntrunningttime = {
            devicename: "Plant running time",
            value: plantrunninghours,
            exportvalue: "-",
            importvalue: "-",
            unit: "Hrs",
        };
        page1data.push(temppalntstarttime);
        page1data.push(temppalntstopttime);
        page1data.push(temppalntrunningttime);
        Object.values(inverterdevices).map((x) => {
            const tempimportvalueunit = listofparameters.find(
                (f) => f.parametername == "INV_DLY_ACT_EXP"
            );
            const tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: x.value,
                unit: tempimportvalueunit.parameterunit,
            };
            page2data.push(tempdata);
        });
        page2data = page2data.sort(function (a, b) {
            return a.devicename.localeCompare(b.devicename, undefined, {
                numeric: true,
                sensitivity: 'base'
            });
        });
        Object.values(mfmdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue)
                ? 0
                : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue)
                ? 0
                : x.maximportvalue - x.minimportvalue;
            const tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: "-",
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit,
            };
            page1data.push(tempdata);
        });
        const mfmtotalexport = {
            devicename: "MFM Total Export",
            value: "-",
            exportvalue: isNaN(
                lodash.sumBy(Object.values(mfmdevices), (x) => x.maxexportvalue) -
                lodash.sumBy(Object.values(mfmdevices), (x) => x.minexportvalue)
            )
                ? 0
                : lodash.sumBy(Object.values(mfmdevices), (x) => x.maxexportvalue) -
                lodash.sumBy(Object.values(mfmdevices), (x) => x.minexportvalue),
            importvalue: "-",
            unit: "kWh",
        };
        page1data.push(mfmtotalexport);
        const mfmtotalimport = {
            devicename: "MFM Total Import",
            value: "-",
            exportvalue: "-",
            importvalue: isNaN(
                lodash.sumBy(Object.values(mfmdevices), (x) => x.maximportvalue) -
                lodash.sumBy(Object.values(mfmdevices), (x) => x.minimportvalue)
            )
                ? 0
                : lodash.sumBy(Object.values(mfmdevices), (x) => x.maximportvalue) -
                lodash.sumBy(Object.values(mfmdevices), (x) => x.minimportvalue),
            unit: "kWh",
        };
        page1data.push(mfmtotalimport);
        Object.values(checkmeterdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue)
                ? 0
                : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue)
                ? 0
                : x.maximportvalue - x.minimportvalue;
            const tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: "-",
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit,
            };
            page1data.push(tempdata);
        });
        const checkmetertotalexport = {
            devicename: "MCR Check meter Total Export",
            value: "-",
            exportvalue: isNaN(
                lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.maxexportvalue
                ) -
                lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.minexportvalue
                )
            )
                ? 0
                : lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.maxexportvalue
                ) -
                lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.minexportvalue
                ),
            importvalue: "-",
            unit: "kWh",
        };
        page1data.push(checkmetertotalexport);
        const checkmetertotalimport = {
            devicename: "MCR Check meter Total Import",
            value: "-",
            exportvalue: "-",
            importvalue: isNaN(
                lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.maximportvalue
                ) -
                lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.minimportvalue
                )
            )
                ? 0
                : lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.maximportvalue
                ) -
                lodash.sumBy(
                    Object.values(checkmeterdevices),
                    (x) => x.minimportvalue
                ),
            unit: "kWh",
        };
        page1data.push(checkmetertotalimport);
        Object.values(mainmeterdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue)
                ? 0
                : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue)
                ? 0
                : x.maximportvalue - x.minimportvalue;
            const tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: "-",
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit,
            };
            page1data.push(tempdata);
        });
        const mainmetertotalexport = {
            devicename: "MCR Main meter Total Export",
            value: "-",
            exportvalue: isNaN(
                lodash.sumBy(Object.values(mainmeterdevices), (x) => x.maxexportvalue) -
                lodash.sumBy(Object.values(mainmeterdevices), (x) => x.minexportvalue)
            )
                ? 0
                : lodash.sumBy(
                    Object.values(mainmeterdevices),
                    (x) => x.maxexportvalue
                ) -
                lodash.sumBy(
                    Object.values(mainmeterdevices),
                    (x) => x.minexportvalue
                ),
            importvalue: "-",
            unit: "kWh",
        };
        page1data.push(mainmetertotalexport);
        const mainmetertotalimport = {
            devicename: "MCR Main meter Total Import",
            value: "-",
            exportvalue: "-",
            importvalue: isNaN(
                lodash.sumBy(Object.values(mainmeterdevices), (x) => x.maximportvalue) -
                lodash.sumBy(Object.values(mainmeterdevices), (x) => x.minimportvalue)
            )
                ? 0
                : lodash.sumBy(
                    Object.values(mainmeterdevices),
                    (x) => x.maximportvalue
                ) -
                lodash.sumBy(
                    Object.values(mainmeterdevices),
                    (x) => x.minimportvalue
                ),
            unit: "kWh",
        };
        page1data.push(mainmetertotalimport);
        Object.values(pqmdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue)
                ? 0
                : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue)
                ? 0
                : x.maximportvalue - x.minimportvalue;
            const tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: "-",
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit,
            };
            page1data.push(tempdata);
        });
        const pqmmetertotalexport = {
            devicename: "PQM meter Total Export",
            value: "-",
            exportvalue: isNaN(
                lodash.sumBy(Object.values(pqmdevices), (x) => x.maxexportvalue) -
                lodash.sumBy(Object.values(pqmdevices), (x) => x.minexportvalue)
            )
                ? 0
                : lodash.sumBy(Object.values(pqmdevices), (x) => x.maxexportvalue) -
                lodash.sumBy(Object.values(pqmdevices), (x) => x.minexportvalue),
            importvalue: "-",
            unit: "kWh",
        };
        page1data.push(pqmmetertotalexport);
        const pqmmetertotalimport = {
            devicename: "PQM meter Total Import",
            value: "-",
            exportvalue: "-",
            importvalue: isNaN(
                lodash.sumBy(Object.values(pqmdevices), (x) => x.maximportvalue) -
                lodash.sumBy(Object.values(pqmdevices), (x) => x.minimportvalue)
            )
                ? 0
                : lodash.sumBy(Object.values(pqmdevices), (x) => x.maximportvalue) -
                lodash.sumBy(Object.values(pqmdevices), (x) => x.minimportvalue),
            unit: "kWh",
        };
        page1data.push(pqmmetertotalimport);
        const tempwmsmoduletempdatavalues =
            lodash.sumBy(wmssurtemp) / wmssurtemp.length;
        const tempwmsmoduletempdatavaluelegend = listofparameters.find(
            (f) => f.parametername == "WMS_MDL_TEMP1"
        );
        const tempambienttempvalue = isNaN(lodash.meanBy(overallambienttemperature))
            ? 0
            : lodash.meanBy(overallambienttemperature);
        const tempambienttempvaluelegend = listofparameters.find(
            (f) => f.parametername == "WMS_AMB_TEMP"
        );
        const tempwmspoavalue = lodash.sumBy(overalltempwmspoa) / 60000;
        const tempwmsghivalue = lodash.sumBy(overalltempwmsghi) / 60000;
        const peekpowervalue = isNaN(lodash.maxBy(peekpower) / 1000)
            ? 0
            : lodash.maxBy(peekpower) > 50000
                ? 50000 / 1000
                : lodash.maxBy(peekpower) / 1000;
        const temppeerpowerdata = {
            devicename: "Peak Power",
            value: peekpowervalue,
            exportvalue: "-",
            importvalue: "-",
            unit: "kW",
        };
        const tempmoduledata = {
            devicename: "Module temp.",
            value: tempwmsmoduletempdatavalues,
            exportvalue: "-",
            importvalue: "-",
            unit: tempwmsmoduletempdatavaluelegend.parameterunit || "-",
        };
        const wmstempambienttempdata = {
            devicename: "Ambient temp.",
            value: tempambienttempvalue,
            exportvalue: "-",
            importvalue: "-",
            unit: tempambienttempvaluelegend.parameterunit || "-",
        };
        const tempghivalue = {
            devicename: "GHI",
            value: tempwmsghivalue,
            exportvalue: "-",
            importvalue: "-",
            unit: "kWh/m2",
        };
        const temppoavalue = {
            devicename: "POA",
            value: tempwmspoavalue,
            exportvalue: "-",
            importvalue: "-",
            unit: "kWh/m2",
        };
        const tempplantperformanceration = {
            devicename: "Performance Ratio(PR)",
            value: dailydataobject.prreal || 0,
            exportvalue: "-",
            importvalue: "-",
            unit: "%",
        };
        const tempcufac = isNaN(
            lodash.sumBy(Object.values(pqmdevices), (x) => x.maxexportvalue) -
            lodash.sumBy(Object.values(pqmdevices), (x) => x.minexportvalue)
        )
            ? 0
            : lodash.sumBy(Object.values(pqmdevices), (x) => x.maxexportvalue) -
            lodash.sumBy(Object.values(pqmdevices), (x) => x.minexportvalue);
        const cufacvalue = {
            devicename: "CUF(AC)",
            value: isNaN((tempcufac / (24 * 50000)) * 100)
                ? 0
                : (tempcufac / (24 * 50000)) * 100,
            exportvalue: "-",
            importvalue: "-",
            unit: "%",
        };
        const cufdcvalue = {
            devicename: "CUF(DC)",
            value: isNaN((tempcufac / (24 * 66052.8)) * 100)
                ? 0
                : (tempcufac / (24 * 66052.8)) * 100,
            exportvalue: "-",
            importvalue: "-",
            unit: "%",
        };
        page1data.push(tempmoduledata);
        page1data.push(wmstempambienttempdata);
        page1data.push(tempghivalue);
        page1data.push(temppoavalue);
        page1data.push(temppeerpowerdata);
        page1data.push(tempplantperformanceration);
        page1data.push(cufacvalue);
        page1data.push(cufdcvalue);
        const tempwmspoavar = {
            devicename: "POA",
            minvalue: lodash.minBy(overalltempwmspoa),
            maxvalue: lodash.maxBy(overalltempwmspoa),
            average: isNaN(lodash.meanBy(overalltempwmspoa))
                ? 0
                : lodash.meanBy(overalltempwmspoa),
            unit: "W/m²",
        };
        page3data.push(tempwmspoavar);
        const tempwmsghivar = {
            devicename: "GHI",
            minvalue: lodash.minBy(overalltempwmsghi),
            maxvalue: lodash.maxBy(overalltempwmsghi),
            average: isNaN(lodash.meanBy(overalltempwmsghi))
                ? 0
                : lodash.meanBy(overalltempwmsghi),
            unit: "W/m²",
        };
        page3data.push(tempwmsghivar);
        const tempwmswindspeedvar = {
            devicename: "Wind Speed",
            minvalue: lodash.minBy(overalltempwmswindspeed),
            maxvalue: lodash.maxBy(overalltempwmswindspeed),
            average: isNaN(lodash.meanBy(overalltempwmswindspeed))
                ? 0
                : lodash.meanBy(overalltempwmswindspeed),
            unit: "m/s",
        };
        page3data.push(tempwmswindspeedvar);
        const tempwmsrelativehumidity = {
            devicename: "Relative Humidity",
            minvalue: lodash.minBy(overalltempwmsrelativehumidity),
            maxvalue: lodash.maxBy(overalltempwmsrelativehumidity),
            average: isNaN(lodash.meanBy(overalltempwmsrelativehumidity))
                ? 0
                : lodash.meanBy(overalltempwmsrelativehumidity),
            unit: "%",
        };
        page3data.push(tempwmsrelativehumidity);
        const tempwmsambienttemperaturevar = {
            devicename: "Ambient temperature",
            minvalue: lodash.minBy(overallambienttemperature),
            maxvalue: lodash.maxBy(overallambienttemperature),
            average: isNaN(lodash.meanBy(overallambienttemperature))
                ? 0
                : lodash.meanBy(overallambienttemperature),
            unit: "°C",
        };
        page3data.push(tempwmsambienttemperaturevar);
        const tempwmsmoduletemperaturevar = {
            devicename: "Module temperature",
            minvalue: lodash.minBy(tempminwmsmoduletemperature),
            maxvalue: lodash.maxBy(tempminwmsmoduletemperature),
            average: isNaN(lodash.meanBy(tempminwmsmoduletemperature))
                ? 0
                : lodash.meanBy(tempminwmsmoduletemperature),
            unit: "°C",
        };
        page3data.push(tempwmsmoduletemperaturevar);
        const sheet = workbook.addWorksheet("Overall data");
        sheet.columns = [
            { header: "Parameter", key: "devicename" },
            { header: "Value", key: "value" },
            { header: "Export", key: "exportvalue" },
            { header: "Import", key: "importvalue" },
            { header: "Unit", key: "unit" },
        ];
        page1data.forEach((e, index) => {
            const rowIndex = index + 2;
            sheet.addRow({ ...e });
        });
        const sheet1 = workbook.addWorksheet("Inverter report");
        sheet1.columns = [
            { header: "Device name", key: "devicename" },
            { header: "Value", key: "value" },
            { header: "Unit", key: "unit" },
        ];
        page2data.forEach((e, index) => {
            const rowIndex = index + 2;
            sheet1.addRow({ ...e });
        });
        const sheet3 = workbook.addWorksheet("WMS Report");
        sheet3.columns = [
            { header: "Parameter", key: "devicename" },
            { header: "Min value", key: "minvalue" },
            { header: "Max Value", key: "maxvalue" },
            { header: "Average", key: "average" },
            { header: "Unit", key: "unit" },
        ];
        page3data.forEach((e, index) => {
            const rowIndex = index + 2;
            sheet3.addRow({ ...e });
        });
    } catch (error) {
        log.error(error);
        return error;
    }
};
