var { differenceInHours } = require("date-fns");
let date1 = new Date();
let date2 = new Date("2021-12-20T16:23:31.228Z");

console.log(differenceInHours(date2, date1));
const dfunction = async () => {
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
    const pqmdevicemapinfo = await settingbusiness.getpareportparameters(
        dbconnection
    );
    const rawdata = await reportbusiness.plantavailabilityreport(
        dbconnection,
        startdate,
        enddate
    );
    const deviceinfo = [];
    try {
        devicedata.map((f) => {
            const a = blockinfo.find((x) => x.blockid === f.blockid);
            deviceinfo[f.deviceid] = `${a.blockdisplayname} ${f.devicedisplayname}`;
            return null;
        });
        let inverterpqmmap = {};
        Object.entries(
            pqmdevicemapinfo.plantmeta.pacalculation.pqmdevicemap
        ).forEach((d) => {
            inverterpqmmap = {
                ...inverterpqmmap,
                ...Object.fromEntries(d[1].map((c) => [c, d[0]])),
            };
        });
        const t = lodash.groupBy(rawdata, (x) => {
            const dateval = parse(
                format(new Date(x.palocaltimestamp), "yyyyMMddHHmm"),
                "yyyyMMddHHmm",
                new Date()
            );
            return Math.floor(differenceInMinutes(dateval, startdate) / 5);
        });
        const c = Object.keys(t[Object.keys(t)[0]][0].padata.devices);
        const poadata = [];
        let poatotalavailability = {};
        const maindata = Object.fromEntries(
            Object.entries(t).map((e) => {
                const key = format(
                    parse(
                        format(new Date(e[1][0].palocaltimestamp), "yyyyMMddHHmm"),
                        "yyyyMMddHHmm",
                        new Date()
                    ),
                    "dd-MM-yyyy HH:mm"
                );
                const poavalue = lodash.meanBy(e[1], (x) => x.padata.poa);
                const poapushval = { datestamp: key, poa: poavalue };
                if (poavalue > 50) {
                    const newvalue = { [key]: 1 };
                    poatotalavailability = { ...poatotalavailability, ...newvalue };
                }
                poadata.push(poapushval);
                let page2entries = c
                    .filter((f) => f !== "PQM1" && f !== "PQM2")
                    .map((device) => {
                        const inverteravailability =
                            (lodash.meanBy(e[1], (ed) => ed.padata.devices[device].INV_STS) *
                                100) /
                            1;
                        let inverterminuteavailability = 0;
                        if (poavalue > 50) {
                            inverterminuteavailability =
                                lodash.sumBy(e[1], (ed) => ed.padata.devices[device].INV_STS) /
                                1;
                        }
                        const inverterdccapacity = lodash.sumBy(
                            e[1],
                            (ed) => ed.padata.devices[device].dccapacity
                        );
                        const pqmdevice = inverterpqmmap[device];
                        const dccapacity = e[1].map((x) => ({
                            status:
                                x.padata.devices[pqmdevice] === 1
                                    ? 1
                                    : x.padata.devices[device].INV_STS,
                            dccapccitypqm:
                                x.padata.devices[pqmdevice] === 0
                                    ? x.padata.devices[device].dccapacity *
                                    x.padata.devices[device].INV_STS
                                    : x.padata.devices[device].dccapacity,
                        }));
                        const temppqmavailablity = e[1].map((x) => ({
                            status: x.padata.devices[pqmdevice] === 1 ? 1 : 0,
                        }));
                        const pqmdevicestatus = lodash.sumBy(
                            e[1],
                            (x) => x.padata.devices[pqmdevice]
                        );
                        const totalinverteravailibility =
                            (lodash.sumBy(dccapacity, "dccapccitypqm") / dccapacity.length) *
                            (inverteravailability / 100);
                        let totalinverterstatus = 0;
                        let pqmavailablity = 0;
                        if (poavalue > 50) {
                            totalinverterstatus =
                                lodash.sumBy(dccapacity, "status") / e[1].length;
                            pqmavailablity = lodash.sumBy(temppqmavailablity, "status");
                        }
                        return [
                            deviceinfo[device],
                            {
                                inverteravailability,
                                inverterdccapacity,
                                pqmdevice,
                                dccapacity,
                                pqmdevicestatus,
                                totalinverteravailibility,
                                inverterminuteavailability,
                                totalinverterstatus,
                                poavalue,
                                pqmavailablity,
                            },
                        ];
                    });
                const actualavailability = parseFloat(
                    (
                        (lodash.sumBy(page2entries, (x) => x[1].totalinverteravailibility) /
                            pqmdevicemapinfo.plantmeta.prcalculation.plantdccapacity) *
                        100
                    ).toFixed(3)
                );
                const pqm1 = lodash.sumBy(
                    page2entries.filter(
                        (x) => x[1].pqmdevice === "PQM1" && x[1].pqmdevicestatus === 1
                    )
                );
                const pqm2 = lodash.sumBy(
                    page2entries.filter(
                        (x) => x[1].pqmdevice === "PQM2" && x[1].pqmdevicestatus === 1
                    )
                );
                page2entries = lodash.sortBy(page2entries, (x) => x[1]);
                const page2 = Object.fromEntries(page2entries);
                return [key, { actualavailability, page2, pqm1, pqm2 }];
            })
        );
        const daydata = lodash.groupBy(Object.entries(maindata), (x) => {
            const dateval = parse(x[0], "dd-MM-yyyy HH:mm", new Date());
            return Math.floor(differenceInDays(dateval, startdate) / 1);
        });
        const poadaydata = lodash.groupBy(
            Object.entries(poatotalavailability),
            (x) => {
                const dateval = parse(x[0], "dd-MM-yyyy HH:mm", new Date());
                return Math.floor(differenceInDays(dateval, startdate) / 1);
            }
        );
        const da2data = [];
        const invavailinvAvlRow = [];
        const da2devicdata = [];
        const worksheet5rows = [];
        let currentdaydata = [];
        const devices = Object.keys(Object.values(maindata)[0].page2);
        Object.entries(daydata).map((x, idx) => {
            const datavalue = { datestamp: x[1][0][0], plantavailability: null };
            const data = Object.values(x[1]);
            da2data.push(datavalue);
            const de = data.map((currentdatavalue) => currentdatavalue[1]);
            const rowOBJ = {};
            devices.forEach((device) => {
                let values = 0;
                if (poadaydata[idx] && poadaydata[idx].length > 0) {
                    values =
                        (lodash.sumBy(
                            Object.values(de),
                            (devicedatavalue) =>
                                devicedatavalue.page2[device].totalinverterstatus
                        ) /
                            poadaydata[idx].length) *
                        100;
                }
                invavailinvAvlRow.push({ [device]: values });
                currentdaydata.push(parseFloat(values.toFixed(2)));
                rowOBJ[device] = parseFloat(values.toFixed(2));
                rowOBJ.timestamp = x[1][0][0];
            });
            datavalue.plantavailability = parseFloat(
                lodash.meanBy(currentdaydata).toFixed(3)
            );
            currentdaydata = [];
            worksheet5rows.push(rowOBJ);
            const devicedatavalue = { datestamp: x[1][0][0], invavailinvAvlRow };
            da2devicdata.push(devicedatavalue);
            return null;
        });
        return da2data;
    } catch (e) {
        log.error(e);
    }
};
