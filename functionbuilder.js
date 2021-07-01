








function a(
    parameter1,
    parameter2,
    parameter3,
    parameter4,
    parameter5,
    parameter6,
    parameter7,
    parameter8) {
    const e = parameter1,
        a = parameter2,
        r = parameter3,
        t = parameter4,
        c = parameter5,
        i = parameter6,
        n = parameter7,
        p = parameter8,
        d = (e, a, r) => {
            const t = e.map(e => {
                return a.devices[e].parameters[r] && a.devices[e].parameters[r] > 0 ? a.devices[e].parameters[r] : 0
            });
            return n.sum(t) || 0
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
                prreal2: 0
            }
        }
    };
    try {
        let e = d(c.ogdevicemeta.primarydevice.devices, a, c.ogdevicemeta.primarydevice.energyexportparametername);
        e || (e = d(c.ogdevicemeta.secondarydevice.devices, a, c.ogdevicemeta.secondarydevice.energyexportparametername)), e || (e = d(c.ogdevicemeta.tertiarydevice.devices, a, c.ogdevicemeta.tertiarydevice.energyexportparametername));
        let n = d(c.ogdevicemeta.primarydevice.devices, r, c.ogdevicemeta.primarydevice.energyexportparametername);
        n || (n = d(c.ogdevicemeta.secondarydevice.devices, r, c.ogdevicemeta.secondarydevice.energyexportparametername)), n || (n = d(c.ogdevicemeta.tertiarydevice.devices, r, c.ogdevicemeta.tertiarydevice.energyexportparametername));
        const l = n - e,
            m = Object.values(r.devices).filter(e => e.devicemeta.devicetypeid && e.devicemeta.devicetypeid === p.WMS),
            s = [],
            v = [];
        m.forEach(e => {
            if (!0 === e.parameters.IS_HEALTHY && e.parameters.WMS_POA && e.parameters.WMS_POA > 0 && s.push(e.parameters.WMS_POA), !0 === e.parameters.IS_HEALTHY) {
                const a = [];
                e.parameters.WMS_MDL_TEMP1 > 0 && a.push(e.parameters.WMS_MDL_TEMP1), e.parameters.WMS_MDL_TEMP2 > 0 && a.push(e.parameters.WMS_MDL_TEMP2), v.push(a.reduce((e, a) => e + a) / a.length)
            }
        });
        const u = v.length > 0 ? v.reduce((e, a) => e + a) / v.length : 0,
            g = s.length > 0 ? s.reduce((e, a) => e + a) / s.length : 0,
            y = l * c.prcalculation.globalstandardtestcondition,
            M = l * c.prcalculation.globalstandardtestcondition * c.prcalculation.contractualavailability,
            _ = M * (1 - c.prcalculation.modulelineardegradationfactor),
            f = (g / 60000) * c.prcalculation.plantdccapacity * (1 - c.prcalculation.temperaturecoefficient * ((t - u) / 100)),
            T = 0 === y || 0 === f ? 0 : y / f * 100,
            h = 0 === M || 0 === f ? 0 : M / f * 100,
            S = 0 === _ || 0 === f ? 0 : _ / f * 100;
        return o = {
            ...o,
            prdata: {
                ...o.prdata,
                ereal: l,
                gtireal: g,
                treal: u,
                tref: t,
                numerator: y,
                numeratorprreal1: M,
                numeratorprreal2: _,
                denaminator: f,
                prreal: T,
                prreal1: h,
                prreal2: S
            }
        }
    } catch (e) {
        return i.error(e), o
    }
}