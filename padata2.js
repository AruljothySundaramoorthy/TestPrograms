const data = require("./pada");

const startOfDay = require("date-fns/startOfDay");
const endOfDay = require("date-fns/endOfDay");
const parse = require("date-fns/parse");
const format = require("date-fns/format");
const lodash = require("lodash");
const differenceInMinutes = require("date-fns/differenceInMinutes");
const differenceInDays = require("date-fns/differenceInDays");

try {
    const pqmdevicemap = {
        PQM1: [
            "4348e746-42e4-4646-b01b-46254a35a319",
            "203b1379-db14-4a10-a69f-c11646901008",
            "e304ba96-5aec-497e-a0d6-f1052614c45c",
            "fd736690-9af1-4a17-a6b8-0f3d88a999be",
            "d2da70a7-9cdb-4ee9-b43f-ecd4d97697b4",
            "358dc047-75a3-4916-8af4-8ce33d9d3bf7",
            "63e125e1-75d7-4ecd-be91-19ce65622289",
            "b466286e-7d97-4d82-ada1-22de769c9096",
            "7898deba-e875-44db-a01b-f55b0dd14137",
            "2be436d0-f32f-48ca-802a-aabacfbd5439",
            "2d71485c-bc01-451d-94ee-f8633651a02e",
            "f8710a18-6323-42ae-8a84-6eac07703050",
            "7e336281-7200-4a47-95cf-5d6d28a9fec9",
            "9e559c73-78b9-4af2-bc65-f2449ac502bc",
            "cd718be4-1820-42f9-9731-1bb2ff7dfbf4",
            "2ea5fc5d-f20c-4be8-bac1-4b868c548fd8",
            "026e6776-efb4-46fa-836c-0003095aec35",
        ],
        PQM2: [
            "3e431994-2542-41cb-a537-a900c1f09924",
            "571b4132-199f-4d11-83fb-89088ded13b8",
            "456ca845-4b12-4ad9-b34f-8b3dd8378eae",
            "c3603fb0-2da8-446e-b32d-ecc3095778ed",
            "a4d06943-d145-4bd6-b74e-3994eb1c3ac6",
            "87006202-645e-4964-9e36-ea12eff92275",
            "7b294e9f-85e1-4048-8de9-a086319a4fe3",
            "96222071-7f84-40f1-942b-38ab521592e0",
            "55a7c83b-a6ad-456a-9fb2-d491bf87c5a4",
            "0976c1c1-2f89-4866-9ca5-a444d4ba44a2",
            "2be8ba61-43b9-4eb6-8461-4bf3f239de9d",
            "53a84e7d-4d51-4d29-8ce2-31a2c6f98e3b",
            "c69bbc08-0829-41ef-a331-13eeecbde53e",
            "10df39cf-aef4-4b9a-aa6a-ecf58495e184",
            "6fecd564-7325-4086-abf5-56e4b972791b",
            "20912c44-ff0e-41b1-9b00-f15ad5f9e6b7",
        ],
    };

    const overalldccapacity = 66052.82;
    let inverterpqmmap = {};
    Object.entries(pqmdevicemap).forEach((d) => {
        inverterpqmmap = {
            ...inverterpqmmap,
            ...Object.fromEntries(d[1].map((c) => [c, d[0]])),
        };
    });

    const startdata = startOfDay(new Date());
    const t = lodash.groupBy(data, (x) => {
        const dateval = parse(x.patimestamp, "yyyyMMddHHmm", new Date());

        return Math.floor(differenceInMinutes(dateval, startdata) / 5);
    });

    const c = Object.keys(t[Object.keys(t)[0]][0].padata.devices);
    const f = Object.fromEntries(
        Object.entries(t).map((e) => {
            const key = format(
                parse(e[1][0].patimestamp, "yyyyMMddHHmm", new Date()),
                "dd-MM-yyyy HH:mm"
            );
            const page2entries = c
                .filter((f) => f !== "PQM1" && f !== "PQM2")
                .map((device) => {
                    const inverteravailability =
                        (lodash.meanBy(e[1], (ed) => ed.padata.devices[device].INV_STS) *
                            100) /
                        1;
                    const inverterdccapacity = lodash.sumBy(
                        e[1],
                        (ed) => ed.padata.devices[device].dccapacity
                    );
                    const pqmdevice = inverterpqmmap[device];
                    const dccapacity = e[1].map((x) => ({
                        status: x.padata.devices[device].INV_STS,
                        dccapccitypqm:
                            x.padata.devices[pqmdevice] == 0
                                ? x.padata.devices[device].dccapacity *
                                x.padata.devices[device].INV_STS
                                : x.padata.devices[device].dccapacity,
                    }));
                    const pqmdevicestatus = lodash.sumBy(
                        e[1],
                        (x) => x.padata.devices[pqmdevice]
                    );
                    const totalinverteravailibility =
                        (lodash.sumBy(dccapacity, "dccapccitypqm") / dccapacity.length) *
                        (inverteravailability / 100);
                    return [
                        device,
                        {
                            inverteravailability,
                            inverterdccapacity,
                            pqmdevice,
                            dccapacity,
                            pqmdevicestatus,
                            totalinverteravailibility,
                        },
                    ];
                });
            const actualavailability = parseFloat(
                (
                    (lodash.sumBy(page2entries, (x) => x[1].totalinverteravailibility) /
                        overalldccapacity) *
                    100
                ).toFixed(3)
            );
            const pqm1 = lodash.sumBy(page2entries.filter((x) => x[1].pqmdevice === 'PQM1' && x[1].pqmdevicestatus === 1));
            const pqm2 = lodash.sumBy(page2entries.filter((x) => x[1].pqmdevice === 'PQM2' && x[1].pqmdevicestatus === 1));;

            const page2 = Object.fromEntries(page2entries);

            return [key, { actualavailability, page2, pqm1, pqm2 }];
        })
    );
    console.log(f);
    const daydata = lodash.groupBy(Object.entries(f), (x) => {
        const dateval = parse(x[0], "dd-MM-yyyy HH:mm", new Date());

        return Math.floor(differenceInDays(dateval, startdata) / 1);
    });
    const da2data = Object.entries(daydata).map((x) => {
        return { [x[1][0][0]]: lodash.meanBy(x[1], (y) => { return y[1].actualavailability }) }
    })
    console.log(daydata);
} catch (e) {
    console.log(e);
}
