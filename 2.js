const { differenceInDays } = require("date-fns/esm");

const ta = async () => {
  const dbconnection = parameter1;
  const { prreport } = parameter2;
  const {
    log,
    lodash,
    parse,
    differenceInMinutes,
    format,
    endOfDay,
    startOfDay,
  } = parameter3;
  let { printerval, startdate, enddate } = parameter4;
  startdate = startOfDay(new Date(startdate));
  enddate = endOfDay(new Date(enddate));
  const rawdata = await prreport(dbconnection)
    .find({ prlocaltimestamp: { $gte: startdate, $lte: enddate } })
    .lean();
  try {
    const parsedrawdata = lodash.groupBy(rawdata, (x) => {
      const dateval = parse(
        format(new Date(x.prlocaltimestamp), "yyyyMMddHHmm"),
        "yyyyMMddHHmm",
        new Date()
      );
      return Math.floor(differenceInDays(dateval, startdate) / 1);
    });
    let prdata = [];
    if (startdate.getFullYear() >= 2022 && startdate.getMonth() >= 3) {
      Object.values(parsedrawdata).forEach((data) => {
        let tempnumerator = 0;
        let tempdenominator = 0;
        let tempprvalue = {
          prlocaltimestamp: 0,
          poa: 0,
          gtireal: 0,
          treal: 0,
          globalstandardtestcondition: 0,
          temperaturecoefficient: 0,
          tref: 0,
          eral: 0,
          plantdccapacity: 0,
          numerator: 0,
          denaminator: 0,
          prreal: 0,
          ppcsetpoint: 0,
          pqmactpower: 0,
          pqmvoltage1: 0,
          pqmvoltage2: 0,
        };
        let ppcsetpointfb = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.ppcactsetpoint)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.ppcactsetpoint);
        let pqmactpowermeas = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.pqmactpower / 1000)
        )
          ? 0
          : lodash.meanBy(
            Object.values(data),
            (x) => x.prdata.pqmactpower / 1000
          );
        let pqmvoltage1meas = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.pqmvoltage1)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.pqmvoltage1);
        let pqmvoltage2meas = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.pqmvoltage2)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.pqmvoltage2);
        let minuteavgpoa1 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa1)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa1);
        let minuteavgpoa2 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa2)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa2);
        let minuteavgpoa3 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa3)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa3);
        let minuteavgpoa4 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa4)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa4);
        let minuteavgpoa5 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa5)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa5);
        let minuteavgpoa6 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa6)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmspoa6);
        let minuiteavgpoaarr = [
          minuteavgpoa1,
          minuteavgpoa2,
          minuteavgpoa3,
          minuteavgpoa4,
          minuteavgpoa5,
          minuteavgpoa6,
        ];
        let minuteavgmodtemp1 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp1)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp1);
        let minuteavgmodtemp2 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp2)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp2);
        let minuteavgmodtemp3 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp3)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp3);
        let minuteavgmodtemp4 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp4)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp4);
        let minuteavgmodtemp5 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp5)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp5);
        let minuteavgmodtemp6 = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp6)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.wmstemp6);
        let minuiteavgmodtemparr = [
          minuteavgmodtemp1,
          minuteavgmodtemp2,
          minuteavgmodtemp3,
          minuteavgmodtemp4,
          minuteavgmodtemp5,
          minuteavgmodtemp6,
        ];
        const getDeviation = (data) => {
          let avgDev = lodash.mean(data);
          let temparr = data;
          let arr = [];
          const calculateDeviation = (avgDev) => {
            let result = temparr.filter(
              (m) =>
                ((avgDev - m) / avgDev) * 100 < 40 &&
                ((avgDev - m) / avgDev) * 100 > -40
            );
            return result;
          };
          const isDeviation = (m) =>
            ((avgDev - m) / avgDev) * 100 < 40 &&
            ((avgDev - m) / avgDev) * 100 > -40;
          do {
            arr = calculateDeviation(avgDev);
            temparr = arr;
            if (arr.length > 0) {
              avgDev = lodash.mean(arr);
            } else {
              avgDev = 0;
            }
          } while (arr.every(isDeviation) === false);
          return avgDev;
        };
        let temppoavalue =
          minuiteavgpoaarr.length > 0 ? getDeviation(minuiteavgpoaarr) : 0;
        Object.values(data).forEach((dataval) => {
          if (dataval.prdata.numerator > 0 && dataval.prdata.denaminator > 0) {
            tempnumerator += parseFloat(dataval.prdata.numerator);
            tempdenominator += parseFloat(dataval.prdata.denaminator);
          }
        });
        (tempprvalue.poa = parseFloat(temppoavalue)),
          (tempprvalue.prlocaltimestamp = data[0].prlocaltimestamp),
          (tempprvalue.gtireal = lodash.meanBy(data, (x) => x.prdata.gtireal)),
          (tempprvalue.treal =
            minuiteavgmodtemparr.length > 0
              ? getDeviation(minuiteavgmodtemparr)
              : 0),
          (tempprvalue.plantdccapacity = data[0].prdata.plantdccapacity);
        tempprvalue.globalstandardtestcondition =
          data[0].prdata.globalstandardtestcondition;
        tempprvalue.temperaturecoefficient =
          data[0].prdata.temperaturecoefficient;
        tempprvalue.tref = data[0].prdata.tref;
        let tempfilterdata = Object.values(data).filter(
          (x) => x.prdata.poa > 0
        );
        tempprvalue.ppcsetpoint = ppcsetpointfb;
        tempprvalue.pqmactpower = pqmactpowermeas;
        tempprvalue.pqmvoltage1 = pqmvoltage1meas;
        tempprvalue.pqmvoltage2 = pqmvoltage2meas;
        if (tempprvalue.poa > 50 && tempfilterdata.length > 0) {
          const numneratorvalue = lodash.sumBy(data, (x) =>
            x.prdata.denaminator > 0 && x.prdata.numerator > 0
              ? x.prdata.numerator
              : 0
          );
          const denaminatorvalue =
            tempprvalue.plantdccapacity *
            (tempprvalue.poa / 6000) *
            (1 - (-0.41 / 100) * (tempprvalue.tref - tempprvalue.treal));
          tempprvalue.eral = lodash.sumBy(
            tempfilterdata,
            (x) => x.prdata.ereal
          );
          if (ppcsetpointfb < 50) {
            if (
              ppcsetpointfb <= pqmactpowermeas + 1 ||
              ppcsetpointfb >= pqmactpowermeas - 1 ||
              (pqmvoltage1meas <= 117 && pqmvoltage1meas <= 117)
            ) {
              tempprvalue.numerator = 0;
              tempprvalue.denaminator = 0;
              tempprvalue.numeratorreal = 0;
              tempprvalue.prreal = 0;
            } else {
              tempprvalue.numerator = parseFloat(numneratorvalue);
              tempprvalue.denaminator = parseFloat(denaminatorvalue);
              tempprvalue.numeratorreal = parseFloat(numneratorvalue);
              tempprvalue.prreal = isNaN(
                (numneratorvalue / denaminatorvalue) * 100
              )
                ? 0
                : (numneratorvalue / denaminatorvalue) * 100;
            }
          } else if (pqmvoltage1meas <= 117 && pqmvoltage1meas <= 117) {
            tempprvalue.numerator = 0;
            tempprvalue.denaminator = 0;
            tempprvalue.numeratorreal = 0;
            tempprvalue.prreal = 0;
          } else {
            tempprvalue.numerator = parseFloat(numneratorvalue);
            tempprvalue.denaminator = parseFloat(denaminatorvalue);
            tempprvalue.numeratorreal = parseFloat(numneratorvalue);
            tempprvalue.prreal = isNaN(
              (parseFloat(numneratorvalue) / parseFloat(denaminatorvalue)) * 100
            )
              ? 0
              : (parseFloat(numneratorvalue) / parseFloat(denaminatorvalue)) *
              100;
          }
        }
        prdata.push(tempprvalue);
      });
    } else {
      Object.values(parsedrawdata).forEach((data) => {
        let tempnumerator = 0;
        let tempdenominator = 0;
        let tempprvalue = {
          prlocaltimestamp: 0,
          poa: 0,
          gtireal: 0,
          treal: 0,
          globalstandardtestcondition: 0,
          temperaturecoefficient: 0,
          tref: 0,
          eral: 0,
          plantdccapacity: 0,
          numerator: 0,
          denaminator: 0,
          prreal: 0,
        };
        let temppoavalue = isNaN(
          lodash.meanBy(Object.values(data), (x) => x.prdata.poa)
        )
          ? 0
          : lodash.meanBy(Object.values(data), (x) => x.prdata.poa);
        Object.values(data).forEach((dataval) => {
          if (dataval.prdata.numerator > 0 && dataval.prdata.denaminator > 0) {
            tempnumerator += parseFloat(dataval.prdata.numerator);
            tempdenominator += parseFloat(dataval.prdata.denaminator);
          }
        });
        (tempprvalue.poa = temppoavalue),
          (tempprvalue.prlocaltimestamp = data[0].prlocaltimestamp),
          (tempprvalue.gtireal = lodash.meanBy(data, (x) => x.prdata.gtireal)),
          (tempprvalue.treal = lodash.meanBy(data, (x) => x.prdata.treal)),
          (tempprvalue.plantdccapacity = data[0].prdata.plantdccapacity);
        tempprvalue.globalstandardtestcondition =
          data[0].prdata.globalstandardtestcondition;
        tempprvalue.temperaturecoefficient =
          data[0].prdata.temperaturecoefficient;
        tempprvalue.tref = data[0].prdata.tref;
        let tempfilterdata = Object.values(data).filter(
          (x) => x.prdata.poa > 0
        );
        if (tempprvalue.poa > 50 && tempfilterdata.length > 0) {
          const numneratorvalue = lodash.sumBy(data, (x) =>
            x.prdata.denaminator > 0 && x.prdata.numerator > 0
              ? x.prdata.numerator
              : 0
          );
          const denaminatorvalue =
            tempprvalue.plantdccapacity *
            (tempprvalue.poa / 6000) *
            (1 - (-0.41 / 100) * (tempprvalue.tref - tempprvalue.treal));
          tempprvalue.eral = lodash.sumBy(
            tempfilterdata,
            (x) => x.prdata.ereal
          );
          tempprvalue.numerator = numneratorvalue;
          tempprvalue.denaminator = denaminatorvalue;
          tempprvalue.numeratorreal = numneratorvalue;
          tempprvalue.prreal = isNaN((numneratorvalue / denaminatorvalue) * 100)
            ? 0
            : (numneratorvalue / denaminatorvalue) * 100;
        }
        prdata.push(tempprvalue);
      });
    }
    return prdata;
  } catch (e) {
    log.error(e);
  }
};
