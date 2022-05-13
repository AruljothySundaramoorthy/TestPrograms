
const log = require('@armax_cloud/allspark-data-models/lib/logger').getlogger();
const db = require('./databaseengine');
const {
  addMinutes,
  subMinutes,
  format,
  startOfDay,
  endOfDay,
  parse,
  differenceInMinutes,
  differenceInDays,
} = require('date-fns');
const lodash = require('lodash');
const prreport = require('@armax_cloud/allspark-data-models/models/data-models/prdata.model');
const prsettingtypeenum = require('@armax_cloud/allspark-data-models/models/enum/prsettingtype.enum');
const prsettingtimestampenum = require('@armax_cloud/allspark-data-models/models/enum/prsettingtimestamp.enum');
const devicetypeenum = require('@armax_cloud/allspark-data-models/models/enum/devicetype.enum');
const kafkatopicenum = require('@armax_cloud/allspark-data-models/models/enum/kafkatopic.enum');
const blockdevicedatamodel = require('@armax_cloud/allspark-data-models/models/data-models/blockdevicedata.model');
const pareport = require('@armax_cloud/allspark-data-models/models/data-models/padata.model');
const customisedcompenstatedprreport = async (
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5,
  parameter6,
  parameter7
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
  const blockdevicedata = await blockdevicedatamodel(dbconnection)
    .find({
      localstarttimestamp: {
        $gte: Date.parse(startdate),
        $lte: Date.parse(enddate),
      },
    })
    .lean();
  const rawprdata = [];
  const PQMDevice = devices
    .filter((f) => f.devicetypeid == devicetypeEnum.PQM)
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
              (d) => d.devicemeta.devicetypeid == devicetypeEnum.PQM
            ),
            (x) => x.parameters.PQM_TOT_ACT_EXP
          );
      let currentvalue = lodash.sumBy(
        Object.values(devicedata.devices).filter(
          (d) => d.devicemeta.devicetypeid == devicetypeEnum.PQM
        ),
        (x) => x.parameters.PQM_TOT_ACT_EXP
      );
      let wmspoa = isNaN(
        lodash.meanBy(
          Object.values(devicedata.devices).filter(
            (d) => d.devicemeta.devicetypeid == devicetypeEnum.WMS
          ),
          (x) => x.parameters.WMS_POA
        )
      )
        ? 0
        : lodash.meanBy(
          Object.values(devicedata.devices).filter(
            (d) => d.devicemeta.devicetypeid == devicetypeEnum.WMS
          ),
          (x) => x.parameters.WMS_POA
        );
      rawprdata.push({
        Timestamp: format(
          new Date(devicedata.localstarttimestamp),
          "yyyy-MM-dd"
        ),
        "PQM Active Total Export(kWh)": currentvalue,
        "Actual Energy Export(kWh)":
          isFinite(currentvalue - previousvalue) &&
            isNaN(currentvalue - previousvalue)
            ? 0
            : currentvalue - previousvalue,
        "POA (w/m2)": wmspoa,
      });
    });
  });
  const listofdevices = lodash.sortBy(devices, "devicesortorder");
  const blocks = await blockbusiness.showblockslist(dbconnection);
  const blocksinfo = Object.fromEntries(
    blocks.map((x) => [x.blockid, x.blockdisplayname])
  );
  const gapqmdevices = Object.fromEntries(
    listofdevices
      .filter((f) => f.devicetypeid === devicetypeEnum.PQM)
      .map((x) => [
        x.deviceid,
        `${blocksinfo[x.blockid]} ${x.devicedisplayname}`,
      ])
  );
  var garawdata = blockdevicedata.map((data) => {
    let datavalue = {
      Timestamp: format(new Date(data.localstarttimestamp), "yyyy-MM-dd HH:MM"),
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
        ([devicedataid, devicedata]) => devicedata.devicemeta.devicetypeid === 7
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
      Timestamp: format(new Date(data.localstarttimestamp), "yyyy-MM-dd HH:MM"),
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
          2 == (2 & parameters.INV_RUN_STS) || 8 == (8 & parameters.INV_RUN_STS)
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
        ([devicedataid, devicedata]) => devicedata.devicemeta.devicetypeid === 7
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
          .map((x) => x.parameters.WMS_POA && x.parameters.WMS_POA !== "-")
          .filter((d) => d !== undefined)
      );
    const pa_pqmValue = lodash.sum(
      Object.values(pa_pqmvalue)
        .map((x) =>
          x.parameters.PQM_TOT_ACT_EXP && x.parameters.PQM_TOT_ACT_EXP !== "-"
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
          return Number.isSafeInteger(hours) && hours !== 0 ? hours / 60 : "00";
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
  const calculatedprdata = Object.entries(prdailydata).map(([date, data]) => {
    const energyvalue = lodash.sumBy(data, "Actual Energy Export(kWh)");
    const poavalue = lodash.sumBy(data, "POA (w/m2)");
    return {
      Timestamp: date,
      "Energy Export(kWh)": energyvalue,
      "POA (w/m2)": poavalue,
    };
  });
  const cumulativevalue = lodash.merge(calculatedprdata, rawpadata, rawgadata);
  const rawnormalprdata = cumulativevalue.map((x) => {
    let prvalue =
      (x["Energy Export(kWh)"] / x["POA (w/m2)"]) *
      50000 *
      x["Grid Availability (%)"] *
      x["Plant Availability (%)"] *
      100;
    const calculatedprvalue = isNaN(prvalue) || isFinite(prvalue) ? 0 : prvalue;
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
};



const padata = await pafunction(
  dbconnection,
  db,
  starttime,
  prpasettingdata.plantmeta,
  log,
  {
    lodash,
    addMinutes,
    format,
  },
  devicetypeenum,
).catch((e) => {
  log.error(e);
  return {};
});

const temppadata = {
  padata: { ...padata },
  patime: starttime,
  palocaltimestamp: addMinutes(
    starttime,
    prpasettingdata.plantlocationmeta.timezone.utcOffset,
  ),
  patimestamp: parseInt(
    format(subMinutes(starttime, 1), 'yyyyMMddHHmm'),
    10,
  ),
  subdomain: SUBDOMAIN,
};
await db
  .savepareport(dbconnection, temppadata)
  .catch((e) => log.error(e));