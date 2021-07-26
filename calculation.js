// const prtime = 'parameter1';
// const previousvalue = 'parameter2';
// const currentvalue = 'parameter3';
// const tref = 'parameter4';
// const plantmeta = 'parameter5';
// const logger = 'parameter6';
// const lodash = 'parameter7';
// const devicetypeenum = 'parameter8';

const lodash = require('lodash');

const erealsum = (devices, value, parametername) => {
    const tempereal = devices.map((device) => {
        const temapvalue = value.devices[device].parameters[parametername]
            && value.devices[device].parameters[parametername] > 0
            ? value.devices[device].parameters[parametername]
            : 0;
        return temapvalue;
    });

    return lodash.sum(tempereal) || 0;
};

module.exports = {
    calculateprdata(prtime, previousvalue, currentvalue, tref, plantmeta, logger, devicetypeenum) {
        const dataref = {
            ereal: 0,
            gtireal: 0,
            treal: 0,
            globalstandardtestcondition:
                plantmeta.prcalculation.globalstandardtestcondition,
            plantdccapacity: plantmeta.prcalculation.plantdccapacity,
            temperaturecoefficient: plantmeta.prcalculation.temperaturecoefficient,
            tref: 0,
            contractualavailability: plantmeta.prcalculation.contractualavailability,
            modulelineardegradationfactor:
                plantmeta.prcalculation.modulelineardegradationfactor,
            numerator: 0,
            numeratorprreal1: 0,
            numeratorprreal2: 0,
            denaminator: 0,
            prreal: 0,
            prreal1: 0,
            prreal2: 0,
        };

        let returndata = {
            prtime,
            prdata: { ...dataref },
        };

        try {
            let lastereal = erealsum(
                plantmeta.ogdevicemeta.primarydevice.devices,
                previousvalue,
                plantmeta.ogdevicemeta.primarydevice.energyexportparametername,
            );
            if (!lastereal) {
                lastereal = erealsum(
                    plantmeta.ogdevicemeta.secondarydevice.devices,
                    previousvalue,
                    plantmeta.ogdevicemeta.secondarydevice.energyexportparametername,
                );
            }
            if (!lastereal) {
                lastereal = erealsum(
                    plantmeta.ogdevicemeta.tertiarydevice.devices,
                    previousvalue,
                    plantmeta.ogdevicemeta.tertiarydevice.energyexportparametername,
                );
            }

            let currentereal = erealsum(
                plantmeta.ogdevicemeta.primarydevice.devices,
                currentvalue,
                plantmeta.ogdevicemeta.primarydevice.energyexportparametername,
            );
            if (!currentereal) {
                currentereal = erealsum(
                    plantmeta.ogdevicemeta.secondarydevice.devices,
                    currentvalue,
                    plantmeta.ogdevicemeta.secondarydevice.energyexportparametername,
                );
            }
            if (!currentereal) {
                currentereal = erealsum(
                    plantmeta.ogdevicemeta.tertiarydevice.devices,
                    currentvalue,
                    plantmeta.ogdevicemeta.tertiarydevice.energyexportparametername,
                );
            }

            const ereal = lastereal - currentereal;
            const devicedata = Object.values(currentvalue.devices);
            const wmsdevices = devicedata.filter(
                (f) => f.devicemeta.devicetypeid
                    && f.devicemeta.devicetypeid === devicetypeenum.WMS,
            );
            const wmspoavalue = [];
            const wmsmoduletemp = [];
            wmsdevices.forEach((wmsdevice) => {
                if (
                    wmsdevice.parameters.IS_HEALTHY === true
                    && wmsdevice.parameters.WMS_POA_TOT
                    && wmsdevice.parameters.WMS_POA_TOT > 0
                ) {
                    wmspoavalue.push(wmsdevice.parameters.WMS_POA_TOT);
                }

                if (wmsdevice.parameters.IS_HEALTHY === true) {
                    const wmssurtemp = [];
                    if (wmsdevice.parameters.WMS_MDL_TEMP1 > 0) {
                        wmssurtemp.push(wmsdevice.parameters.WMS_MDL_TEMP1);
                    }

                    if (wmsdevice.parameters.WMS_MDL_TEMP2 > 0) {
                        wmssurtemp.push(wmsdevice.parameters.WMS_MDL_TEMP2);
                    }

                    wmsmoduletemp.push(
                        wmssurtemp.reduce((a, b) => a + b) / wmssurtemp.length,
                    );
                }
            });

            const treal = wmsmoduletemp.length > 0
                ? wmsmoduletemp.reduce((a, b) => a + b) / wmsmoduletemp.length
                : 0;
            const gtireal = wmspoavalue.length > 0
                ? wmspoavalue.reduce((a, b) => a + b) / wmspoavalue.length
                : 0;
            const numerator = ereal * plantmeta.prcalculation.globalstandardtestcondition;

            const numeratorprreal1 = ereal
                * plantmeta.prcalculation.globalstandardtestcondition
                * plantmeta.prcalculation.contractualavailability;
            const numeratorprreal2 = numeratorprreal1
                * (1 - plantmeta.prcalculation.modulelineardegradationfactor);

            const denaminator = gtireal
                * plantmeta.prcalculation.plantdccapacity
                * (1
                    - plantmeta.prcalculation.temperaturecoefficient
                    * ((tref - treal) / 100));
            const prreal = numerator === 0 || denaminator === 0
                ? 0
                : (numerator / denaminator) * 100;
            const prreal1 = numeratorprreal1 === 0 || denaminator === 0
                ? 0
                : (numeratorprreal1 / denaminator) * 100;
            const prreal2 = numeratorprreal2 === 0 || denaminator === 0
                ? 0
                : (numeratorprreal2 / denaminator) * 100;

            returndata = {
                ...returndata,
                prdata: {
                    ...returndata.prdata,
                    ereal,
                    gtireal,
                    treal,
                    tref,
                    numerator,
                    numeratorprreal1,
                    numeratorprreal2,
                    denaminator,
                    prreal,
                    prreal1,
                    prreal2,
                },
            };
            return returndata;
        } catch (err) {
            logger.error(err);
            return returndata;
        }
    },
};





const e = parameter1,
    a = parameter2,
    r = parameter3,
    t = parameter4,
    c = parameter5,
    i = parameter6,
    n = parameter7,
    p = parameter8,
    d = (e, a, r) => {
        const t = e.map((e) => {
            return a.devices[e].parameters[r] && a.devices[e].parameters[r] > 0 ? a.devices[e].parameters[r] : 0;
        });
        return n.sum(t) || 0;
    };
let o = {
    prtime: e,
    prdata: {
        ...{
            ereal: 0,
            gtireal: 0,
            treal: 0,
            globalstandardtestcondition: c.prcalculation.globalstandardtestcondition,
            plantdccapacity: c.prcalculation.plantdccapacity,
            temperaturecoefficient: c.prcalculation.temperaturecoefficient,
            tref: 0,
            contractualavailability: c.prcalculation.contractualavailability,
            modulelineardegradationfactor: c.prcalculation.modulelineardegradationfactor,
            numerator: 0,
            numeratorprreal1: 0,
            numeratorprreal2: 0,
            denaminator: 0,
            prreal: 0,
            prreal1: 0,
            prreal2: 0,
        },
    },
};
try {
    let e = d(c.ogdevicemeta.primarydevice.devices, a, c.ogdevicemeta.primarydevice.energyexportparametername);
    e || (e = d(c.ogdevicemeta.secondarydevice.devices, a, c.ogdevicemeta.secondarydevice.energyexportparametername)), e || (e = d(c.ogdevicemeta.tertiarydevice.devices, a, c.ogdevicemeta.tertiarydevice.energyexportparametername));
    let n = d(c.ogdevicemeta.primarydevice.devices, r, c.ogdevicemeta.primarydevice.energyexportparametername);
    n || (n = d(c.ogdevicemeta.secondarydevice.devices, r, c.ogdevicemeta.secondarydevice.energyexportparametername)), n || (n = d(c.ogdevicemeta.tertiarydevice.devices, r, c.ogdevicemeta.tertiarydevice.energyexportparametername));
    const l = n - e,
        m = Object.values(r.devices).filter((e) => e.devicemeta.devicetypeid && e.devicemeta.devicetypeid === p.WMS),
        s = [],
        v = [];
    m.forEach((e) => {
        if ((!0 === e.parameters.IS_HEALTHY && e.parameters.WMS_POA && e.parameters.WMS_POA > 0 && s.push(e.parameters.WMS_POA), !0 === e.parameters.IS_HEALTHY)) {
            const a = [];
            e.parameters.WMS_MDL_TEMP1 > 0 && a.push(e.parameters.WMS_MDL_TEMP1), e.parameters.WMS_MDL_TEMP2 > 0 && a.push(e.parameters.WMS_MDL_TEMP2), v.push(a.reduce((e, a) => e + a) / a.length);
        }
    });
    const u = v.length > 0 ? v.reduce((e, a) => e + a) / v.length : 0,
        g = s.length > 0 ? s.reduce((e, a) => e + a) / s.length : 0,
        y = l * c.prcalculation.globalstandardtestcondition,
        M = l * c.prcalculation.globalstandardtestcondition * c.prcalculation.contractualavailability,
        _ = M * (1 - c.prcalculation.modulelineardegradationfactor),
        f = (g / 60000) * c.prcalculation.plantdccapacity * (1 - c.prcalculation.temperaturecoefficient * ((t - u) / 100)),
        T = 0 === y || 0 === f ? 0 : (y / f) * 100,
        h = 0 === M || 0 === f ? 0 : (M / f) * 100,
        S = 0 === _ || 0 === f ? 0 : (_ / f) * 100;
    return (o = { ...o, prdata: { ...o.prdata, ereal: l, gtireal: g, treal: u, tref: t, numerator: y, numeratorprreal1: M, numeratorprreal2: _, denaminator: f, prreal: T, prreal1: h, prreal2: S } });
} catch (e) {
    return i.error(e), o;
}
