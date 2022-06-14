const devicetypeEnum = require('@armax_cloud/allspark-data-models/models/enum/devicetype.enum')


const func = async (parameter1, parameter2, parameter3, parameter4) => {
  const dbconnection = parameter1;
  const {
    blockdevicedatamodel,
    blockbusiness,
    devicebusiness,
    settingbusiness,
    devicetypeEnum,
    getData,
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
    req,
    PDFDocument,
  } = parameter3;
  let devicefilterquery;
  const { startdate, enddate, reportinfo } = parameter4;
  const devicetypes = [devicetypeEnum.INVERTER, devicetypeEnum.WMS, devicetypeEnum.PQM, devicetypeEnum.METER];
  const devices = await devicebusiness.showdevicebydeviceid(
    dbconnection,
    devicetypes
  );
  devices.forEach((a) => {
    let d = { [`devices.${a.deviceid}`]: 1 };
    devicefilterquery = { ...devicefilterquery, ...d };
  });

  var inverterDevice = devices.filter(
    (f) => f.devicetypeid == devicetypeEnum.INVERTER
  );
  inverterDevice = lodash.sortBy(inverterDevice, "devicesortorder");
  const blockdevicedata = await blockdevicedatamodel(dbconnection)
    .find({
      localstarttimestamp: {
        $gte: Date.parse(startdate),
        $lte: Date.parse(enddate),
      },
    },
      { ...devicefilterquery, _id: 0 })
    .lean();
  const databyDate = lodash.groupBy(blockdevicedata, (x) =>
    format(new Date(x.localstarttimestamp), "yyyy-MM-dd")
  );
  var MainPageData = [];
  Object.entries(databyDate).map(([date, doc]) => {
    var pqmEx = [];
    var pqmIm = [];
    var AUX_TRAFO1 = [];
    var AUX_TRAFO2 = [];
    var poaMean = [];
    doc.map((data) => {
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
      const meterValue = Object.fromEntries(
        Object.entries(data.devices).filter(
          ([devicedataid, devicedata]) =>
            devicedata.devicemeta.devicetypeid === 25
        )
      );
      const pqmExport = Object.values(pqmvalue)
        .map((x) =>
          x.parameters.PQM_TOT_ACT_EXP && x.parameters.PQM_TOT_ACT_EXP !== "-"
            ? x.parameters.PQM_TOT_ACT_EXP
            : undefined
        )
        .filter((d) => d !== undefined);
      if (!isNaN(pqmExport) && isFinite(pqmExport) && pqmExport > 0) {
        pqmEx.push(...pqmExport);
      }
      const pqmImport = Object.values(pqmvalue)
        .map((x) =>
          x.parameters.PQM_TOT_ACT_IMP && x.parameters.PQM_TOT_ACT_IMP !== "-"
            ? x.parameters.PQM_TOT_ACT_IMP
            : undefined
        )
        .filter((d) => d !== undefined);
      if (!isNaN(pqmImport) && isFinite(pqmImport) && pqmImport > 0) {
        pqmIm.push(...pqmImport);
      }
      Object.values(meterValue).map((x) => {
        if (
          x.devicemeta.devicename === "AUX_TRAFO1" &&
          !isNaN(x.parameters.AUX_MFM_TOT_ACT_IMP) &&
          isFinite(x.parameters.AUX_MFM_TOT_ACT_IMP) &&
          x.parameters.AUX_MFM_TOT_ACT_IMP >= 0
        ) {
          AUX_TRAFO1.push(x.parameters.AUX_MFM_TOT_ACT_IMP);
        }
      });
      Object.values(meterValue).map((x) => {
        if (
          x.devicemeta.devicename === "AUX_TRAFO2" &&
          !isNaN(x.parameters.AUX_MFM_TOT_ACT_IMP) &&
          isFinite(x.parameters.AUX_MFM_TOT_ACT_IMP) &&
          x.parameters.AUX_MFM_TOT_ACT_IMP >= 0
        ) {
          AUX_TRAFO2.push(x.parameters.AUX_MFM_TOT_ACT_IMP);
        }
      });
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
      if (wmspoa >= 25) {
        Number(poaMean.push(wmspoa).toFixed(3));
      }
    });
    const datayDay = format(new Date(date), "yyyy-MM-dd");
    var poaSum = Number(lodash.sum(poaMean).toFixed(3));
    var SumOfPOA = Number((poaSum / 60000).toFixed(3));
    var pqmExportMaximum = Number(Math.max(...pqmEx).toFixed(3));
    var pqmExportMinimum = Number(Math.min(...pqmEx).toFixed(3));
    var PQMEnergyExport = pqmExportMaximum - pqmExportMinimum;
    PQMEnergyExport = PQMEnergyExport ? PQMEnergyExport : 0;
    var pqmimportMaximum = Number(Math.max(...pqmIm).toFixed(3));
    var pqmimportMinimum = Number(Math.min(...pqmIm).toFixed(3));
    var PQMEnergyImport = pqmimportMaximum - pqmimportMinimum;
    PQMEnergyImport = PQMEnergyImport ? PQMEnergyImport : 0;
    var auxCum01Maximum = Number(Math.max(...AUX_TRAFO1).toFixed(3));
    var auxCum01Minimun = Number(Math.min(...AUX_TRAFO1).toFixed(3));
    var auxCum01Import = auxCum01Maximum - auxCum01Minimun;
    auxCum01Import = auxCum01Import ? auxCum01Import : 0;
    var auxCum02Maximum = Number(Math.max(...AUX_TRAFO2).toFixed(3));
    var auxCum02Minimun = Number(Math.min(...AUX_TRAFO2).toFixed(3));
    var auxCum02Import = auxCum02Maximum - auxCum02Minimun;
    auxCum02Import = auxCum02Import ? auxCum02Import : 0;
    var sumofAuxCumImport = auxCum01Import + auxCum02Import;
    sumofAuxCumImport = sumofAuxCumImport ? sumofAuxCumImport : 0;
    MainPageData.push({
      Timestamp: datayDay,
      "Day Radiation (kWh/m²)": SumOfPOA ? Number(SumOfPOA.toFixed(3)) : 0,
      "Export energy (MWh)": PQMEnergyExport
        ? Number(PQMEnergyExport.toFixed(3))
        : 0,
      "Import energy (kWh)": PQMEnergyImport
        ? Number(PQMEnergyImport.toFixed(3))
        : 0,
      "Aux consumption1 (MWh)": auxCum01Import
        ? Number(auxCum01Import.toFixed(3))
        : 0,
      "Aux consumption2 (MWh)": auxCum02Import
        ? Number(auxCum02Import.toFixed(3))
        : 0,
      "Total Aux consumption (MWh)": sumofAuxCumImport
        ? Number(sumofAuxCumImport.toFixed(3))
        : 0,
    });
  });

  const intverterData = [];
  Object.entries(databyDate).map(([date, data]) => {
    let inverterRawData = [];
    inverterDevice.map((el) => {
      let deviceid = el.deviceid;
      let DCCapacity = el["devicegeneralinfo"][2]["value"];
      let value = [];
      let DailyGen = [];
      let activePower = [];
      data.map((data) => {
        Object.entries(data.devices).map(([devicedataid, devicedata]) => {
          const inverterName =
            data.devices[deviceid].devicemeta.blockdevicedisplayname;
          if (
            devicedataid == deviceid &&
            data.devices[deviceid]["parameters"]["INV_ACT_PWR"] > 0 &&
            !isNaN(data.devices[deviceid]["parameters"]["INV_ACT_PWR"]) &&
            isFinite(data.devices[deviceid]["parameters"]["INV_ACT_PWR"])
          ) {
            if (
              !isNaN(data.devices[deviceid]["parameters"]["INV_DLY_ACT_EXP"]) &&
              isFinite(
                data.devices[deviceid]["parameters"]["INV_DLY_ACT_EXP"]
              ) &&
              data.devices[deviceid]["parameters"]["INV_DLY_ACT_EXP"] > 0
            ) {
              DailyGen.push(
                data.devices[deviceid]["parameters"]["INV_DLY_ACT_EXP"]
              );
            }
            if (
              !isNaN(data.devices[deviceid]["parameters"]["INV_ACT_PWR"]) &&
              isFinite(data.devices[deviceid]["parameters"]["INV_ACT_PWR"]) &&
              data.devices[deviceid]["parameters"]["INV_ACT_PWR"] > 0
            ) {
              activePower.push(
                data.devices[deviceid]["parameters"]["INV_ACT_PWR"]
              );
            }
            value.push({
              "Device Name": inverterName,
              "Daily Generation":
                data.devices[deviceid]["parameters"]["INV_DLY_ACT_EXP"],
              Time: data.localstarttimestamp,
              "Active Power":
                data.devices[deviceid]["parameters"]["INV_ACT_PWR"],
            });
          }
        });
      });
      if (value.length !== 0) {
        const maxActivePower =
          activePower.length > 0 ? Math.max(...activePower) : 0;
        value = lodash.sortBy(value, "Time");
        const startTime = differenceInMinutes(
          new Date(value[0]["Time"]),
          new Date(date)
        );
        const EndTime = differenceInMinutes(
          new Date(value[value.length - 1]["Time"]),
          new Date(date)
        );
        const MaxGent = DailyGen.length > 0 ? Math.max(...DailyGen) : 0;
        const PR = MaxGent / DCCapacity;
        inverterRawData.push({
          Timestamp: date,
          "Device Name": value[0]["Device Name"],
          "Max Generation":
            DailyGen.length > 0 ? Number(Math.max(...DailyGen).toFixed(3)) : 0,
          "Start Time": startTime,
          "End Time": EndTime,
          DCCapacity: isNaN(Number(DCCapacity.split("K")[0]))
            ? 0
            : Number(DCCapacity.split("K")[0]),
          "Max Active Power": maxActivePower,
        });
      }
    });
    intverterData.push({ Timestamp: date, Inverter: inverterRawData });
  });
  var Inverterdatageneration = [];
  intverterData.forEach((item) => {
    item.Inverter.map((x) => {
      Inverterdatageneration.push({
        Timestamp: x["Timestamp"],
        "Device Name": x["Device Name"],
        "Inverter Energy (kWh)": x["Max Generation"],
      });
    });
  });
  const dbsettings = JSON.parse(await getData("setting"));
  const clientimageresult = await settingbusiness.getClientImage(dbconnection);
  const { clientimage } = clientimageresult;
  let pdfExportData = [
    { title: "Generation & Radiation", data: MainPageData },
    { title: "Inverter Energy", data: Inverterdatageneration },
  ];
  if (req.body.type == "xlsx") {
    const wb = XLSX.utils.book_new();
    const filename = "Gen&Radiation_Report.xlsx";
    const PAavailability = XLSX.utils.json_to_sheet(MainPageData);
    XLSX.utils.book_append_sheet(wb, PAavailability, "Generation & Radiation");
    const PArawdata = XLSX.utils.json_to_sheet(Inverterdatageneration);
    XLSX.utils.book_append_sheet(wb, PArawdata, "Inverter Energy");
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
      `attachment; filename=${`Gen&Radiation_Report${format(
        new Date(),
        "yyyyMMddHHmmss"
      )}.xlsx`}`
    );
  } else if (req.body.type == "pdf") {
    var doc = new PDFDocument({ margin: 30, layout: "landscape" });
    const size = [
      150 * Object.keys(pdfExportData[0].data[0]).length < 891
        ? 891
        : 150 * Object.keys(pdfExportData[0].data[0]).length,
      1000,
    ];
    doc.page.size = size;
    const addlogo = (doc, size) => {
      doc.image(`data:image/jpeg;base64,${clientimage}`, size - 100 - 120, 6, {
        fit: [100, 100],
        align: "center",
        valign: "center",
      });
    };
    addlogo(doc, size[0]);
    doc.pipe(res);
    const exportdatatoPDFTable = async (dataArray, response) => {
      try {
        for (let i = 0; i < dataArray.length; i++) {
          if (i !== 0) {
            const pagesize = [
              150 * Object.keys(dataArray[i].data[0]).length < 891
                ? 891
                : 150 * Object.keys(dataArray[i].data[0]).length,
              1000,
            ];
            doc.addPage({ size: pagesize });
            addlogo(doc, pagesize[0]);
          }
          const table = {
            title: `Project Name: ${dbsettings.clientname}`,
            subtitle: `ReportName: ${dataArray[i].title} Location: ${dbsettings.plantlocationmeta.address
              } ${dbsettings.plantlocationmeta.city} From ${format(
                new Date(req.body.starttime),
                "yyyy-MM-dd HH:mm"
              )} To ${format(
                new Date(req.body.endtime),
                "yyyy-MM-dd HH:mm"
              )} Report Generated By : ONESCADA`,
            headers: Object.keys(dataArray[i].data[0]),
            rows: dataArray[i].data.map((x) => Object.values(x)),
          };
          await doc.table(table, {
            columnSpacing: 10,
            padding: 10,
            align: "center",
            prepareHeader: () => {
              doc.fontSize(11);
            },
            divider: { header: { disabled: true, width: 2, opacity: 1 } },
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
              var { x, y, width, height } = rectCell;
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
        }
        doc.end();
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${`Gen&Radiation_Report${format(
            new Date(),
            "yyyyMMddHHmmss"
          )}.pdf`}`
        );
      } catch (e) {
        log.error(e);
        return res.status(500).send(util.error(e));
      }
    };
    await exportdatatoPDFTable(pdfExportData, res);
  } else {
    const wb = XLSX.utils.book_new();
    const filename = "Gen&Radiation_Report.xlsx";
    const PAavailability = XLSX.utils.json_to_sheet(MainPageData);
    XLSX.utils.book_append_sheet(wb, PAavailability, "Generation & Radiation");
    const PArawdata = XLSX.utils.json_to_sheet(Inverterdatageneration);
    XLSX.utils.book_append_sheet(wb, PArawdata, "Inverter Energy");
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
      `attachment; filename=${`Gen&Radiation_Report${format(
        new Date(),
        "yyyyMMddHHmmss"
      )}.xlsx`}`
    );
  }
};
