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
    .find({ prlocaltimestamp: { $gte: startdate, $lt: enddate } })
    .lean();
try {
    const parsedrawdata = lodash.groupBy(rawdata, (x) => {
        const dateval = parse(
            format(new Date(x.prlocaltimestamp), "yyyyMMddHHmm"),
            "yyyyMMddHHmm",
            new Date()
        );
        return Math.floor(differenceInMinutes(dateval, ,) / 1440);
    });
    let prdata = [];
    Object.values(parsedrawdata).forEach((data) => {
        let tempnumerator = 0;
        let tempdenominator = 0;
        let temppoa = lodash.meanBy(data, (x) => x.prdata.poa);
        Object.values(data).forEach((dataval) => {
            if (dataval.prdata.numerator > 0 && dataval.prdata.denaminator > 0) {
                tempnumerator += dataval.prdata.numerator;
                tempdenominator += dataval.prdata.denaminator;
            }
        });
        let tempprvalue = {
            prlocaltimestamp: 0,
            numerator: 0,
            denaminator: 0,
            prreal: 0,
        };
        tempprvalue.prlocaltimestamp = data[0].prlocaltimestamp;
        if (temppoa > 50) {
            (tempprvalue.numerator = tempnumerator),
                (tempprvalue.denaminator = tempdenominator),
                (tempprvalue.prreal = isNaN((tempnumerator / tempdenominator) * 100)
                    ? 0
                    : (tempnumerator / tempdenominator) * 100);
        }
        prdata.push(tempprvalue);
    });
    return prdata;
} catch (e) {
    log.error(e);
}
