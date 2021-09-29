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
let { startdate, enddate,dailydata } = parameter4;
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
  const d = {
    [`devices.${a.deviceid}`]: 1,
  };
  devicefilterquery = {
    ...devicefilterquery,
    ...d,
  };
});

let blockdata;
try {
  blockdata = await blockdevicedata.getblockdatabydevices(
    dbconnection,
    format(startdate, "yyyyMMddHHmm"),
    format(enddate, "yyyyMMddHHmm"),

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
  const wmspoa = [];
  const wmsghi = [];
  const peekpower = [];
  let plantstarttime;
  let plantstoptime;
  const plantperformanceration = 0;
  let overalltempwmspoa = [];
  let overalltempwmsghi = [];
  let overalltempwmswindspeed = [];
  let overalltempwmsrelativehumidity = [];

  const tempminwmsmoduletemperature = [];
  let tempminwmsambienttemperature = [];
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
  blockdata.forEach((d, idx) => {
    wmscalculationinfoparamters = {
      totalwmslength: 0,
      totalwmspoavalue: 0,
    };
    const wmsdevice = Object.values(d.devices).filter(
      (c) => c.devicemeta.devicetypeid === devicetypeEnum.WMS
    );
    const wmscalculationinfo = wmsdevice.filter(
      (f) => f.parameters.IS_HEALTHY === true && f.parameters.WMS_POA > 0
    );
    if (wmscalculationinfo.length > 0) {
      wmscalculationinfoparamters.totalwmspoavalue += lodash.sumBy(
        wmscalculationinfo,
        (x) => x.parameters.WMS_POA
      );
      wmscalculationinfoparamters.totalwmslength += wmscalculationinfo.length;
    }
    wmstotalpoa = isNaN(
      wmscalculationinfoparamters.totalwmspoavalue /
        wmscalculationinfoparamters.totalwmslength
    )
      ? 0
      : wmscalculationinfoparamters.totalwmspoavalue /
        wmscalculationinfoparamters.totalwmslength;
    if (wmstotalpoa >= 5) {
      data.push(d);
    }
  });

  Object.keys(pqmdevices).forEach((y) => {
    const tempexportvalueunit = listofparameters.find(
      (f) => f.parametername == "PQM_TOT_ACT_EXP"
    );
    const minpqmexportvalues = lodash.minBy(
      Object.values(data),
      (x) => x.devices[y].parameters.PQM_TOT_ACT_EXP
    );
    pqmdevices[y].minexportvalue =
      minpqmexportvalues.devices[y].parameters.PQM_TOT_ACT_EXP || 0;
    const maxpqmexportvalue = lodash.maxBy(
      Object.values(data),
      (x) => x.devices[y].parameters.PQM_TOT_ACT_EXP
    );
    pqmdevices[y].maxexportvalue =
      maxpqmexportvalue.devices[y].parameters.PQM_TOT_ACT_EXP || 0;
    pqmdevices[y].unit = tempexportvalueunit.parameterunit;

    const tempimportvalueunit = listofparameters.find(
      (f) => f.parametername == "PQM_TOT_ACT_IMP"
    );
    const minpqmimportvalues = lodash.minBy(
      Object.values(data),
      (x) => x.devices[y].parameters.PQM_TOT_ACT_IMP
    );
    pqmdevices[y].minpqmimportvalues =
      minpqmimportvalues.devices[y].parameters.PQM_TOT_ACT_IMP || 0;
    const maxpqmimportvalue = lodash.maxBy(
      Object.values(data),
      (x) => x.devices[y].parameters.PQM_TOT_ACT_IMP
    );
    pqmdevices[y].maxpqmimportvalue =
      maxpqmimportvalue.devices[y].parameters.PQM_TOT_ACT_IMP || 0;
    pqmdevices[y].unit = tempimportvalueunit.parameterunit;
  });

  Object.keys(mfmdevices).forEach((y) => {
    const tempexportvalueunit = listofparameters.find(
      (f) => f.parametername == "OGMFM_TOT_ACT_EXP"
    );
    const minpqmexportvalues = lodash.minBy(
      Object.values(data),
      (x) => x.devices[y].parameters.OGMFM_TOT_ACT_EXP
    );
    mfmdevices[y].minexportvalue =
      minpqmexportvalues.devices[y].parameters.OGMFM_TOT_ACT_EXP || 0;
    const maxogmfmexportvalue = lodash.maxBy(
      Object.values(data),
      (x) => x.devices[y].parameters.OGMFM_TOT_ACT_EXP
    );
    mfmdevices[y].maxexportvalue =
      maxogmfmexportvalue.devices[y].parameters.OGMFM_TOT_ACT_EXP || 0;
    mfmdevices[y].unit = tempexportvalueunit.parameterunit;

    const tempimportvalueunit = listofparameters.find(
      (f) => f.parametername == "OGMFM_TOT_ACT_IMP"
    );
    const minpqmimportvalues = lodash.minBy(
      Object.values(data),
      (x) => x.devices[y].parameters.OGMFM_TOT_ACT_IMP
    );
    mfmdevices[y].minimportvalue =
      minpqmimportvalues.devices[y].parameters.OGMFM_TOT_ACT_IMP || 0;
    const maxogmfmimporttvalue = lodash.maxBy(
      Object.values(data),
      (x) => x.devices[y].parameters.OGMFM_TOT_ACT_IMP
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
      const minmainmeterexportvalue = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM1_TOT_ACT_EXP
      );
      mainmeterdevices[y].minexportvalue =
        minmainmeterexportvalue.devices[y].parameters.MM1_TOT_ACT_EXP || 0;
      const maxmainmeterexportvalue = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM1_TOT_ACT_EXP
      );
      mainmeterdevices[y].maxexportvalue =
        maxmainmeterexportvalue.devices[y].parameters.MM1_TOT_ACT_EXP || 0;
      mainmeterdevices[y].unit = tempexportvalueunit.parameterunit;

      const tempimportvalueunit = listofparameters.find(
        (f) => f.parametername == "MM1_TOT_ACT_IMP"
      );
      const minmainmeterimportvalue = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM1_TOT_ACT_IMP
      );
      mainmeterdevices[y].minimportvalue =
        minmainmeterimportvalue.devices[y].parameters.MM1_TOT_ACT_IMP || 0;
      const maxmainmeterimportvalue = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM1_TOT_ACT_IMP
      );
      mainmeterdevices[y].maximportvalue =
        maxmainmeterimportvalue.devices[y].parameters.MM1_TOT_ACT_IMP || 0;
      mainmeterdevices[y].unit = tempimportvalueunit.parameterunit;
    } else {
      const tempexportvalueunit = listofparameters.find(
        (f) => f.parametername == "MM2_TOT_ACT_EXP"
      );
      const minmainmeterexportvalue = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM2_TOT_ACT_EXP
      );
      mainmeterdevices[y].minexportvalue =
        minmainmeterexportvalue.devices[y].parameters.MM2_TOT_ACT_EXP || 0;
      const maxmainmeterexportvalue = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM2_TOT_ACT_EXP
      );
      mainmeterdevices[y].maxexportvalue =
        maxmainmeterexportvalue.devices[y].parameters.MM2_TOT_ACT_EXP || 0;
      mainmeterdevices[y].unit = tempexportvalueunit.parameterunit;

      const tempimportvalueunit = listofparameters.find(
        (f) => f.parametername == "MM2_TOT_ACT_IMP"
      );
      const minmainmeterimportvalue = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM2_TOT_ACT_IMP
      );
      mainmeterdevices[y].minimportvalue =
        minmainmeterimportvalue.devices[y].parameters.MM2_TOT_ACT_IMP || 0;
      const maxmainmeterimportvalue = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.MM2_TOT_ACT_IMP
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
      const mincheckmeterexportvalues = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM1_TOT_ACT_EXP
      );
      checkmeterdevices[y].minexportvalue =
        mincheckmeterexportvalues.devices[y].parameters.CM1_TOT_ACT_EXP || 0;
      const maxcheckmeterexportvalues = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM1_TOT_ACT_EXP
      );
      checkmeterdevices[y].maxexportvalue =
        maxcheckmeterexportvalues.devices[y].parameters.CM1_TOT_ACT_EXP || 0;
      checkmeterdevices[y].unit = tempexportvalueunit.parameterunit;

      const tempimportvalueunit = listofparameters.find(
        (f) => f.parametername == "CM1_TOT_ACT_IMP"
      );
      const mincheckmeterimportvalues = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM1_TOT_ACT_IMP
      );
      checkmeterdevices[y].minimportvalue =
        mincheckmeterimportvalues.devices[y].parameters.CM1_TOT_ACT_IMP || 0;
      const maxcheckmeterimportvalues = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM1_TOT_ACT_IMP
      );
      checkmeterdevices[y].maximportvalue =
        maxcheckmeterimportvalues.devices[y].parameters.CM1_TOT_ACT_IMP || 0;
      checkmeterdevices[y].unit = tempimportvalueunit.parameterunit;
    } else {
      const tempexportvalueunit = listofparameters.find(
        (f) => f.parametername == "CM2_TOT_ACT_EXP"
      );
      const mincheckmeterexportvalues = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM2_TOT_ACT_EXP
      );
      checkmeterdevices[y].minexportvalue =
        mincheckmeterexportvalues.devices[y].parameters.CM2_TOT_ACT_EXP || 0;
      const maxcheckmeterexportvalues = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM2_TOT_ACT_EXP
      );
      checkmeterdevices[y].maxexportvalue =
        maxcheckmeterexportvalues.devices[y].parameters.CM2_TOT_ACT_EXP || 0;
      checkmeterdevices[y].unit = tempexportvalueunit.parameterunit;

      const tempimportvalueunit = listofparameters.find(
        (f) => f.parametername == "CM2_TOT_ACT_IMP"
      );
      const mincheckmeterimportvalues = lodash.minBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM2_TOT_ACT_IMP
      );
      checkmeterdevices[y].minimportvalue =
        mincheckmeterimportvalues.devices[y].parameters.CM2_TOT_ACT_IMP || 0;
      const maxcheckmeterimportvalues = lodash.maxBy(
        Object.values(data),
        (x) => x.devices[y].parameters.CM2_TOT_ACT_IMP
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
              inverterdevices[x].value &&
            e.devices[ed].parameters.INV_DLY_ACT_EXP > 0
          ) {
            inverterdevices[x].value = e.devices[ed].parameters.INV_DLY_ACT_EXP;
          }
        }
      });
    });

    const temppoa = [];
    const tempghi = [];
    const tempvalminwmsghi = [];
    const tempvalminwmspoa = [];
    const tempvalminwmswindspeed = [];
    const tempvalminwmsrelativehumiduty = [];
    const tempmoduletemp = [];
    const tempambienttemp = [];
    Object.values(e.devices).forEach((ed) => {
      if (ed.devicemeta.devicetypeid == 7) {
        const tempmodulevalue = [];
        tempvalminwmswindspeed.push(ed.parameters.WMS_WND_SPD);
        tempvalminwmsrelativehumiduty.push(ed.parameters.WMS_HUM);

        if (ed.parameters.WMS_GHI > 0) {
          tempvalminwmsghi.push(ed.parameters.WMS_GHI);
          tempghi.push(
            parseFloat(
              isNaN(ed.parameters.WMS_GHI) ? 0 : ed.parameters.WMS_GHI || 0,
              0
            )
          );
        }

        if (ed.parameters.WMS_POA > 0) {
          overalltempwmspoa.push(ed.parameters.WMS_POA);
          tempvalminwmspoa.push(ed.parameters.WMS_POA);
          temppoa.push(
            parseFloat(
              isNaN(ed.parameters.WMS_POA) ? 0 : ed.parameters.WMS_POA || 0,
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
        tempambienttemp.push(ed.parameters.WMS_AMB_TEMP);
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

        const tempvalues = isNaN(
          lodash.sumBy(tempmodulevalue) / tempmodulevalue.length
        )
          ? 0
          : lodash.sumBy(tempmodulevalue) / tempmodulevalue.length;
        tempmoduletemp.push(tempvalues);
        wmssurtemp.push(tempvalues);
      }
    });
    wmspoa.push(lodash.sumBy(temppoa) / temppoa.length);
    wmsghi.push(lodash.sumBy(tempghi) / tempghi.length);
    if (tempvalminwmsghi.length > 0) {
      overalltempwmsghi.push(
        isNaN(lodash.meanBy(tempvalminwmsghi))
          ? 0
          : lodash.meanBy(tempvalminwmsghi)
      );
      overalltempwmspoa.push(
        isNaN(lodash.meanBy(tempvalminwmspoa))
          ? 0
          : lodash.meanBy(tempvalminwmspoa)
      );
      overalltempwmswindspeed.push(
        isNaN(lodash.meanBy(tempvalminwmswindspeed))
          ? 0
          : lodash.meanBy(tempvalminwmswindspeed)
      );
      overalltempwmsrelativehumidity.push(
        isNaN(lodash.meanBy(tempvalminwmsrelativehumiduty))
          ? 0
          : lodash.meanBy(tempvalminwmsrelativehumiduty)
      );
      tempminwmsambienttemperature.push(
        isNaN(lodash.meanBy(tempambienttemp))
          ? 0
          : lodash.meanBy(tempambienttemp)
      );
      tempminwmsmoduletemperature.push(
        isNaN(lodash.meanBy(tempmoduletemp)) ? 0 : lodash.meanBy(tempmoduletemp)
      );
    }
    const temppeekpowerdevices = lodash.filter(
      Object.values(e.devices),
      (x) => x.devicemeta.devicetypeid === 15
    );
    peekpower.push(
      lodash.sumBy(temppeekpowerdevices, (x) => x.parameters.PQM_ACT_PWR)
    );
  });
  const page1data = [];
  const page2data = [];
  const page3data = [];
  plantstarttime = new Date(data[0].localstarttimestamp) || new Date();
  plantstoptime =
    new Date(data[data.length - 1].localstarttimestamp) || new Date();
  const plantrunninghours = differenceInHours(plantstoptime, plantstarttime);

  const temppalntstarttime = {
    devicename: "Plant start time",
    value: plantstarttime,
    exportvalue: "-",
    importvalue: "-",
    unit: "Datetime",
  };
  const temppalntstopttime = {
    devicename: "Plant stop time",
    value: plantstoptime,
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
      lodash.sumBy(Object.values(checkmeterdevices), (x) => x.maxexportvalue) -
        lodash.sumBy(Object.values(checkmeterdevices), (x) => x.minexportvalue)
    )
      ? 0
      : lodash.sumBy(
          Object.values(checkmeterdevices),
          (x) => x.maxexportvalue
        ) -
        lodash.sumBy(Object.values(checkmeterdevices), (x) => x.minexportvalue),
    importvalue: "-",
    unit: "kWh",
  };
  page1data.push(checkmetertotalexport);
  const checkmetertotalimport = {
    devicename: "MCR Check meter Total Import",
    value: "-",
    exportvalue: "-",
    importvalue: isNaN(
      lodash.sumBy(Object.values(checkmeterdevices), (x) => x.maximportvalue) -
        lodash.sumBy(Object.values(checkmeterdevices), (x) => x.minimportvalue)
    )
      ? 0
      : lodash.sumBy(
          Object.values(checkmeterdevices),
          (x) => x.maximportvalue
        ) -
        lodash.sumBy(Object.values(checkmeterdevices), (x) => x.minimportvalue),
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
      : lodash.sumBy(Object.values(mainmeterdevices), (x) => x.maxexportvalue) -
        lodash.sumBy(Object.values(mainmeterdevices), (x) => x.minexportvalue),
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
      : lodash.sumBy(Object.values(mainmeterdevices), (x) => x.maximportvalue) -
        lodash.sumBy(Object.values(mainmeterdevices), (x) => x.minimportvalue),
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
  const tempambienttempvalue = lodash.sumBy(wmsambienttemp) / wmssurtemp.length;

  const tempambienttempvaluelegend = listofparameters.find(
    (f) => f.parametername == "WMS_AMB_TEMP"
  );
  const tempwmspoavalue = lodash.sumBy(wmspoa) / 60000;
  const tempwmsghivalue = lodash.sumBy(wmsghi) / 60000;

  const peekpowervalue = isNaN(lodash.maxBy(peekpower) / 1000)
    ? 0
    : lodash.maxBy(peekpower) > 50000
    ? 50000
    : lodash.maxBy(peekpower) / 1000;

  const temppeerpowerdata = {
    devicename: "Peek Power",
    value: peekpowervalue,
    exportvalue: "-",
    importvalue: "-",
    unit: "MW",
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
    value: dailydataobject?.prreal || 0,
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
  tempminwmsambienttemperature = lodash.filter(
    tempminwmsambienttemperature,
    (x) => x > 0
  );

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
    minvalue: lodash.minBy(tempminwmsambienttemperature),
    maxvalue: lodash.maxBy(tempminwmsambienttemperature),
    average: isNaN(lodash.meanBy(tempminwmsambienttemperature))
      ? 0
      : lodash.meanBy(tempminwmsambienttemperature),
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
    { header: "Unit", key: "unit" },
  ];
  page3data.forEach((e, index) => {
    const rowIndex = index + 2;
    sheet3.addRow({
      ...e,
    });
  });
} catch (error) {
  log.error(error);
  return error;
}
