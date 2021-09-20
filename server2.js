try {
    const express = require("express");
    const app = express();
    const port = 3000;

    const startOfDay = require("date-fns/startOfDay");
    const endOfDay = require("date-fns/endOfDay");
    const parse = require("date-fns/parse");
    const format = require("date-fns/format");
    const differenceInMinutes = require("date-fns/differenceInMinutes");
    const differenceInDays = require("date-fns/differenceInDays");

    const differenceInHours = require('date-fns/differenceInHours');
    const ExcelJS = require("exceljs");
    const { data } = require("./datablock1");
    const { parameters } = require("./parameters");
    const lodash = require("lodash");
    const workbook = new ExcelJS.Workbook();

    var tempdata = {};
    let firstdata = data[0].devices;
    let lastdata = data[data.length - 1].devices;
    const listofparameters = parameters;
    Object.keys(firstdata).map((x) => {
        const tempvalues = firstdata[x].devicemeta;
        let newtempdata = {
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
                unit: '-'
            },
        };
        tempdata = { ...tempdata, ...newtempdata };
    });

    let inverterdevices = {};
    let mfmdevices = {};
    let checkmeterdevices = {};
    let mainmeterdevices = {};
    let pqmdevices = {};
    let wmsdevices = {};
    let wmssurtemp = [];
    let wmsambienttemp = [];
    let wmspoa = [];
    let wmsghi = [];
    let peekpower = [];
    let plantstarttime;
    let plantstoptime;
    let plantrunninghours;
    let plantperformanceration = 0;
    Object.entries(tempdata).map((x) => {
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


    // MIN & MAX value logic
    let tempminwmspoa = [];
    let tempwmsmaxpoa = [];
    let overalltempwmspoa = [];
    let tempminwmsghi = [];
    let tempwmsmaxghi = [];
    let overalltempwmsghi = [];
    let tempminwmswindspeed = [];
    let tempwmsmaxwindspeed = [];
    let overalltempwmswindspeed = [];
    let tempminwmsrelativehumidity = [];
    let tempwmsmaxrelativehumidity = [];
    let overalltempwmsrelativehumidity = [];
    Object.keys(wmsdevices).forEach((y) => {
        let tempwmspoaminvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_POA))
        tempminwmspoa.push(tempwmspoaminvalue.devices[y].parameters.WMS_POA)
        let tempwmspoamaxvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_POA))
        tempwmsmaxpoa.push(tempwmspoamaxvalue.devices[y].parameters.WMS_POA)

        let tempwmsghiminvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_GHI))
        tempminwmsghi.push(tempwmsghiminvalue.devices[y].parameters.WMS_GHI)
        let tempwmsghimaxvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_GHI))
        tempwmsmaxghi.push(tempwmsghimaxvalue.devices[y].parameters.WMS_GHI)

        let tempwmswindspeedminvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_WND_SPD))
        tempminwmswindspeed.push(tempwmswindspeedminvalue.devices[y].parameters.WMS_WND_SPD)
        let tempwmswindspeedmaxvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_WND_SPD))
        tempwmsmaxwindspeed.push(tempwmswindspeedmaxvalue.devices[y].parameters.WMS_WND_SPD)

        let tempwmsrelativehumidityminvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_HUM))
        tempminwmsrelativehumidity.push(tempwmsrelativehumidityminvalue.devices[y].parameters.WMS_HUM)
        let tempwmsrelativehumiditymaxvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.WMS_HUM))
        tempwmsmaxrelativehumidity.push(tempwmsrelativehumiditymaxvalue.devices[y].parameters.WMS_HUM)
    });
    Object.keys(pqmdevices).forEach((y) => {
        let temppeekpower = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.PQM_ACT_PWR))
        peekpower.push(temppeekpower.devices[y].parameters.PQM_ACT_PWR)
        let tempexportvalueunit = listofparameters.find((f) => f.parametername == 'PQM_TOT_ACT_EXP')
        let minpqmexportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.PQM_TOT_ACT_EXP))
        pqmdevices[y].minexportvalue = minpqmexportvalues.devices[y].parameters.PQM_TOT_ACT_EXP || 0;
        let maxpqmexportvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.PQM_TOT_ACT_EXP))
        pqmdevices[y].maxexportvalue = maxpqmexportvalue.devices[y].parameters.PQM_TOT_ACT_EXP || 0;
        pqmdevices[y].unit = tempexportvalueunit.parameterunit


        let tempimportvalueunit = listofparameters.find((f) => f.parametername == 'PQM_TOT_ACT_IMP')
        let minpqmimportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.PQM_TOT_ACT_IMP))
        pqmdevices[y].minpqmimportvalues = minpqmimportvalues.devices[y].parameters.PQM_TOT_ACT_IMP || 0;
        let maxpqmimportvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.PQM_TOT_ACT_IMP))
        pqmdevices[y].maxpqmimportvalue = maxpqmimportvalue.devices[y].parameters.PQM_TOT_ACT_IMP || 0;
        pqmdevices[y].unit = tempimportvalueunit.parameterunit;
    });

    Object.keys(mfmdevices).forEach((y) => {
        let tempexportvalueunit = listofparameters.find((f) => f.parametername == 'OGMFM_TOT_ACT_EXP')
        let minpqmexportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.OGMFM_TOT_ACT_EXP))
        mfmdevices[y].minexportvalue = minpqmexportvalues.devices[y].parameters.OGMFM_TOT_ACT_EXP || 0;
        let maxogmfmexportvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.OGMFM_TOT_ACT_EXP))
        mfmdevices[y].maxexportvalue = maxogmfmexportvalue.devices[y].parameters.OGMFM_TOT_ACT_EXP || 0;
        mfmdevices[y].unit = tempexportvalueunit.parameterunit



        let tempimportvalueunit = listofparameters.find((f) => f.parametername == 'OGMFM_TOT_ACT_IMP')
        let minpqmimportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.OGMFM_TOT_ACT_IMP))
        mfmdevices[y].minimportvalue = minpqmimportvalues.devices[y].parameters.OGMFM_TOT_ACT_IMP || 0;
        let maxogmfmimporttvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.OGMFM_TOT_ACT_IMP))
        mfmdevices[y].maximportvalue = maxogmfmimporttvalue.devices[y].parameters.OGMFM_TOT_ACT_IMP || 0;
        mfmdevices[y].unit = tempimportvalueunit.parameterunit

    });



    Object.keys(mainmeterdevices).forEach((y) => {
        if (mainmeterdevices[y].devicemeta.devicename == "MM1") {
            let tempexportvalueunit = listofparameters.find((f) => f.parametername == 'MM1_TOT_ACT_EXP')
            let minmainmeterexportvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.MM1_TOT_ACT_EXP))
            mainmeterdevices[y].minexportvalue = minmainmeterexportvalue.devices[y].parameters.MM1_TOT_ACT_EXP || 0;
            let maxmainmeterexportvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.MM1_TOT_ACT_EXP))
            mainmeterdevices[y].maxexportvalue = maxmainmeterexportvalue.devices[y].parameters.MM1_TOT_ACT_EXP || 0;
            mainmeterdevices[y].unit = tempexportvalueunit.parameterunit



            let tempimportvalueunit = listofparameters.find((f) => f.parametername == 'MM1_TOT_ACT_IMP')
            let minmainmeterimportvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.MM1_TOT_ACT_IMP))
            mainmeterdevices[y].minimportvalue = minmainmeterimportvalue.devices[y].parameters.MM1_TOT_ACT_IMP || 0;
            let maxmainmeterimportvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.MM1_TOT_ACT_IMP))
            mainmeterdevices[y].maximportvalue = maxmainmeterimportvalue.devices[y].parameters.MM1_TOT_ACT_IMP || 0;
            mainmeterdevices[y].unit = tempimportvalueunit.parameterunit
        } else {
            let tempexportvalueunit = listofparameters.find((f) => f.parametername == 'MM2_TOT_ACT_EXP')
            let minmainmeterexportvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.MM2_TOT_ACT_EXP))
            mainmeterdevices[y].minexportvalue = minmainmeterexportvalue.devices[y].parameters.MM2_TOT_ACT_EXP || 0;
            let maxmainmeterexportvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.MM2_TOT_ACT_EXP))
            mainmeterdevices[y].maxexportvalue = maxmainmeterexportvalue.devices[y].parameters.MM2_TOT_ACT_EXP || 0;
            mainmeterdevices[y].unit = tempexportvalueunit.parameterunit



            let tempimportvalueunit = listofparameters.find((f) => f.parametername == 'MM2_TOT_ACT_IMP')
            let minmainmeterimportvalue = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.MM2_TOT_ACT_IMP))
            mainmeterdevices[y].minimportvalue = minmainmeterimportvalue.devices[y].parameters.MM2_TOT_ACT_IMP || 0;
            let maxmainmeterimportvalue = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.MM2_TOT_ACT_IMP))
            mainmeterdevices[y].maximportvalue = maxmainmeterimportvalue.devices[y].parameters.MM2_TOT_ACT_IMP || 0;
            mainmeterdevices[y].unit = tempimportvalueunit.parameterunit
        }
    });


    Object.keys(checkmeterdevices).forEach((y) => {
        if (checkmeterdevices[y].devicemeta.devicename == "CM1") {
            let tempexportvalueunit = listofparameters.find((f) => f.parametername == 'CM1_TOT_ACT_EXP')
            let mincheckmeterexportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.CM1_TOT_ACT_EXP))
            checkmeterdevices[y].minexportvalue = mincheckmeterexportvalues.devices[y].parameters.CM1_TOT_ACT_EXP || 0;
            let maxcheckmeterexportvalues = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.CM1_TOT_ACT_EXP))
            checkmeterdevices[y].maxexportvalue = maxcheckmeterexportvalues.devices[y].parameters.CM1_TOT_ACT_EXP || 0;
            checkmeterdevices[y].unit = tempexportvalueunit.parameterunit


            let tempimportvalueunit = listofparameters.find((f) => f.parametername == 'CM1_TOT_ACT_IMP')
            let mincheckmeterimportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.CM1_TOT_ACT_IMP))
            checkmeterdevices[y].minimportvalue = mincheckmeterimportvalues.devices[y].parameters.CM1_TOT_ACT_IMP || 0;
            let maxcheckmeterimportvalues = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.CM1_TOT_ACT_IMP))
            checkmeterdevices[y].maximportvalue = maxcheckmeterimportvalues.devices[y].parameters.CM1_TOT_ACT_IMP || 0;
            checkmeterdevices[y].unit = tempimportvalueunit.parameterunit
        } else {
            let tempexportvalueunit = listofparameters.find((f) => f.parametername == 'CM2_TOT_ACT_EXP')
            let mincheckmeterexportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.CM2_TOT_ACT_EXP))
            checkmeterdevices[y].minexportvalue = mincheckmeterexportvalues.devices[y].parameters.CM2_TOT_ACT_EXP || 0;
            let maxcheckmeterexportvalues = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.CM2_TOT_ACT_EXP))
            checkmeterdevices[y].maxexportvalue = maxcheckmeterexportvalues.devices[y].parameters.CM2_TOT_ACT_EXP || 0;
            checkmeterdevices[y].unit = tempexportvalueunit.parameterunit

            let tempimportvalueunit = listofparameters.find((f) => f.parametername == 'CM2_TOT_ACT_IMP')
            let mincheckmeterimportvalues = lodash.minBy(Object.values(data), ((x) => x.devices[y].parameters.CM2_TOT_ACT_IMP))
            checkmeterdevices[y].minimportvalue = mincheckmeterimportvalues.devices[y].parameters.CM2_TOT_ACT_IMP || 0;
            let maxcheckmeterimportvalues = lodash.maxBy(Object.values(data), ((x) => x.devices[y].parameters.CM2_TOT_ACT_IMP))
            checkmeterdevices[y].maximportvalue = maxcheckmeterimportvalues.devices[y].parameters.CM2_TOT_ACT_IMP || 0;
            checkmeterdevices[y].unit = tempimportvalueunit.parameterunit
        }
    });


    const datafunction = (req, res) => {
        data.forEach((e) => {
            Object.keys(inverterdevices).forEach((x) => {
                Object.keys(e.devices).forEach((ed) => {
                    if (ed == x) {
                        if (
                            e.devices[ed].parameters.INV_DLY_ACT_EXP >
                            inverterdevices[x].value &&
                            e.devices[ed].parameters.INV_DLY_ACT_EXP > 0
                        ) {
                            inverterdevices[x].value =
                                e.devices[ed].parameters.INV_DLY_ACT_EXP;
                        }
                    }
                });
            });


            let temppoa = [];
            let tempghi = [];
            Object.values(e.devices).forEach((ed) => {


                if (ed.devicemeta.devicetypeid == 7) {
                    let tempmodulevalue = [];
                    overalltempwmswindspeed.push(ed.parameters.WMS_WND_SPD);
                    overalltempwmsrelativehumidity.push(ed.parameters.WMS_HUM)
                    if (ed.parameters.WMS_GHI > 0) {
                        overalltempwmsghi.push(ed.parameters.WMS_GHI)
                        tempghi.push(
                            parseFloat(
                                isNaN(ed.parameters.WMS_GHI)
                                    ? 0
                                    : ed.parameters.WMS_GHI || 0,
                                0
                            )
                        );
                    }

                    if (ed.parameters.WMS_POA > 0) {
                        overalltempwmspoa.push(ed.parameters.WMS_POA)
                        temppoa.push(
                            parseFloat(
                                isNaN(ed.parameters.WMS_POA)
                                    ? 0
                                    : ed.parameters.WMS_POA || 0,
                                0
                            )
                        );
                    }

                    wmsambienttemp.push(
                        parseFloat(
                            isNaN(ed.parameters.WMS_AMB_TEMP)
                                ? 0
                                : ed.parameters.WMS_AMB_TEMP || 0,
                            0
                        )
                    );
                    if (ed.parameters.WMS_MDL_TEMP1 > 1) {
                        tempmodulevalue.push(ed.parameters.WMS_MDL_TEMP1 || 0);
                    }
                    if (ed.parameters.WMS_MDL_TEMP2 > 1) {
                        tempmodulevalue.push(ed.parameters.WMS_MDL_TEMP2 || 0);
                    }
                    if (ed.parameters.WMS_MDL_TEMP3 > 1) {
                        tempmodulevalue.push(ed.parameters.WMS_MDL_TEMP3 || 0);
                    }
                    if (ed.parameters.WMS_MDL_TEMP4 > 1) {
                        tempmodulevalue.push(ed.parameters.WMS_MDL_TEMP4 || 0);
                    }

                    let tempvalues = isNaN(
                        lodash.sumBy(tempmodulevalue) / tempmodulevalue.length
                    )
                        ? 0
                        : lodash.sumBy(tempmodulevalue) / tempmodulevalue.length;

                    wmssurtemp.push(tempvalues);
                }
            });
            wmspoa.push(lodash.sumBy(temppoa) / temppoa.length)
            wmsghi.push(lodash.sumBy(tempghi) / tempghi.length)
        });
        var page1data = [];
        var page2data = [];
        var page3data = [];
        plantstarttime = new Date(tempdata[0]?.localstarttimestamp || new Date())
        plantstoptime = new Date(tempdata[tempdata.length - 1]?.localstarttimestamp || new Date());
        plantrunninghours = format(differenceInHours(plantstoptime, plantstarttime), 'HH:mm')

        let temppalntstarttime = {
            devicename: `Plant start time`,
            value: plantstarttime,
            exportvalue: '-',
            importvalue: '-',
            unit: '-'
        };
        let temppalntstopttime = {
            devicename: `Plant stop time`,
            value: plantstoptime,
            exportvalue: '-',
            importvalue: '-',
            unit: '-'
        };
        let temppalntrunningttime = {
            devicename: `Plant running time`,
            value: plantrunninghours,
            exportvalue: '-',
            importvalue: '-',
            unit: '-'
        };

        page1data.push(temppalntstarttime);
        page1data.push(temppalntstopttime);
        page1data.push(temppalntrunningttime);
        Object.values(inverterdevices).map((x) => {

            let tempimportvalueunit = listofparameters.find((f) => f.parametername == 'INV_DLY_ACT_EXP');

            let tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: x.value,
                unit: tempimportvalueunit.parameterunit
            };

            page2data.push(tempdata);
        });
        Object.values(mfmdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue) ? 0 : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue) ? 0 : x.maximportvalue - x.minimportvalue;

            let tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: '-',
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit
            };
            page1data.push(tempdata);
        });
        Object.values(checkmeterdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue) ? 0 : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue) ? 0 : x.maximportvalue - x.minimportvalue;

            let tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: '-',
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit
            };
            page1data.push(tempdata);
        });
        Object.values(mainmeterdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue) ? 0 : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue) ? 0 : x.maximportvalue - x.minimportvalue;
            let tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: '-',
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit
            };
            page1data.push(tempdata);
        });
        Object.values(pqmdevices).map((x) => {
            x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue) ? 0 : x.maxexportvalue - x.minexportvalue;
            x.importvalue = isNaN(x.maximportvalue - x.minimportvalue) ? 0 : x.maximportvalue - x.minimportvalue;

            let tempdata = {
                devicename: `${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`,
                value: '-',
                exportvalue: x.exportvalue,
                importvalue: x.importvalue,
                unit: x.unit
            };
            page1data.push(tempdata);
        });
        let tempwmsmoduletempdatavalues = lodash.sumBy(wmssurtemp) / wmssurtemp.length;
        let tempwmsmoduletempdatavaluelegend = listofparameters.find((f) => f.parametername == 'WMS_MDL_TEMP1');
        let tempambienttempvalue = lodash.sumBy(wmsambienttemp) / wmssurtemp.length;

        let tempambienttempvaluelegend = listofparameters.find((f) => f.parametername == 'WMS_AMB_TEMP');
        let tempwmspoavalue = (lodash.sumBy(wmspoa)) / 60000;
        let tempwmspoavaluelegend = listofparameters.find((f) => f.parametername == 'WMS_POA');
        let tempwmsghivalue = (lodash.sumBy(wmsghi)) / 60000;
        let tempwmsghivaluelegend = listofparameters.find((f) => f.parametername == 'WMS_GHI');

        let peekpowervalue = lodash.sumBy(peekpower) > 50000 ? 50000 : lodash.sumBy(peekpower);

        let temppeerpowerdata = {
            devicename: `Peek Power`,
            value: peekpowervalue,
            exportvalue: '-',
            importvalue: '-',
            unit: 'MW'
        };
        let tempmoduledata = {
            devicename: `Module temp.`,
            value: tempwmsmoduletempdatavalues,
            exportvalue: '-',
            importvalue: '-',
            unit: tempwmsmoduletempdatavaluelegend.parameterunit || '-'
        };
        let wmstempambienttempdata = {
            devicename: `Ambient temp.`,
            value: tempambienttempvalue,
            exportvalue: '-',
            importvalue: '-',
            unit: tempambienttempvaluelegend.parameterunit || '-'
        };
        let tempghivalue = {
            devicename: `GHI`,
            value: tempwmsghivalue,
            exportvalue: '-',
            importvalue: '-',
            unit: 'kWh/m2'
        };
        let temppoavalue = {
            devicename: `POA`,
            value: tempwmspoavalue,
            exportvalue: '-',
            importvalue: '-',
            unit: 'kWh/m2'
        };
        let tempplantperformanceration = {
            devicename: `Performance Ratio(PR)`,
            value: plantperformanceration,
            exportvalue: '-',
            importvalue: '-',
            unit: '%'
        };


        page1data.push(tempmoduledata);
        page1data.push(wmstempambienttempdata);
        page1data.push(tempghivalue);
        page1data.push(temppoavalue);
        page1data.push(temppeerpowerdata);
        page1data.push(tempplantperformanceration);


        // Object.values(pqmdevices).map((x) => {
        // x.exportvalue = isNaN(x.maxexportvalue - x.minexportvalue) ? 0 : x.maxexportvalue - x.minexportvalue;
        // x.importvalue = isNaN(x.maximportvalue - x.minimportvalue) ? 0 : x.maximportvalue - x.minimportvalue;

        let tempwmspoavar = {
            devicename: `WMS POA`,
            minvalue: lodash.sumBy(tempminwmspoa),
            maxvalue: lodash.sumBy(tempwmsmaxpoa),
            average: isNaN(lodash.sumBy(overalltempwmspoa) / overalltempwmspoa.length) ? 0 : lodash.sumBy(overalltempwmspoa) / overalltempwmspoa.length
        };
        page3data.push(tempwmspoavar);
        let tempwmsghivar = {
            devicename: `WMS GHI`,
            minvalue: lodash.sumBy(tempminwmsghi),
            maxvalue: lodash.sumBy(tempwmsmaxghi),
            average: isNaN(lodash.sumBy(overalltempwmsghi) / overalltempwmsghi.length) ? 0 : lodash.sumBy(overalltempwmsghi) / overalltempwmsghi.length
        };
        page3data.push(tempwmsghivar);

        let tempwmswindspeedvar = {
            devicename: `WMS Wind Speed`,
            minvalue: lodash.sumBy(tempminwmswindspeed),
            maxvalue: lodash.sumBy(tempwmsmaxwindspeed),
            average: isNaN(lodash.sumBy(overalltempwmswindspeed) / overalltempwmswindspeed.length) ? 0 : lodash.sumBy(overalltempwmswindspeed) / overalltempwmswindspeed.length
        };
        page3data.push(tempwmswindspeedvar);
        let tempwmsrelativehumidity = {
            devicename: `WMS Relative Humidity`,
            minvalue: lodash.sumBy(tempminwmsrelativehumidity),
            maxvalue: lodash.sumBy(tempwmsmaxrelativehumidity),
            average: isNaN(lodash.sumBy(overalltempwmsrelativehumidity) / overalltempwmsrelativehumidity.length) ? 0 : lodash.sumBy(overalltempwmsrelativehumidity) / overalltempwmsrelativehumidity.length
        };
        page3data.push(tempwmsrelativehumidity);
        workbook.creator = "ArmaX Automation PVT. Ltd";
        workbook.lastModifiedBy = "ArmaX Automation PVT. Ltd";
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastPrinted = new Date();
        const sheet = workbook.addWorksheet("Overall data");
        sheet.columns = [
            { header: "Parameter", key: "devicename" },
            { header: "Value", key: "value" },
            { header: "Export", key: "exportvalue" },
            { header: "Import", key: "importvalue" },
            { header: "Unit", key: "unit" },
        ];
        // Dump all the data into Excel
        page1data.forEach((e, index) => {
            const rowIndex = index + 2;
            sheet.addRow({
                ...e,
            });
        });
        const sheet1 = workbook.addWorksheet("Inverter report");
        sheet1.columns = [
            { header: "Device name", key: "devicename" },
            { header: "Value", key: "value" },
            { header: "Unit", key: "unit" },
        ];
        // Dump all the data into Excel
        page2data.forEach((e, index) => {
            const rowIndex = index + 2;
            sheet1.addRow({
                ...e,
            });
        });
        const sheet3 = workbook.addWorksheet("WMS Report");
        sheet3.columns = [
            { header: "Parameter", key: "devicename" },
            { header: "Min value", key: "minvalue" },
            { header: "Max Value", key: "maxvalue" },
            { header: "Average", key: "average" },
        ];
        page3data.forEach((e, index) => {
            const rowIndex = index + 2;
            sheet3.addRow({
                ...e,
            });
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${`prreport${format(
                new Date(),
                "yyyyMMddHHmmss"
            )}.xlsx`}`
        );
        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    };
    app.get("/", (req, res) => {
        // res.send('Hello World!')
        datafunction(req, res);
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
} catch (e) {
    console.log(e);
}
