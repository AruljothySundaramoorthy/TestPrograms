const unitmap = {
    Hz: [
        {
            name: "Hertz",
            displayname: "Hertz",
            unit: "Hz",
            scale: 1,
            default: true,
        },
    ],
    A: [
        {
            name: "Current",
            displayname: "Current",
            unit: "A",
            scale: 1,
            default: true,
        },
    ],
    V: [
        {
            name: "Volt",
            displayname: "Volt",
            unit: "V",
            scale: 1,
            default: true,
        },
    ],
    W: [
        {
            name: "Watt",
            displayname: "Watt",
            unit: "W",
            scale: 1,
            default: true,
        },
    ],
    Wh: [
        {
            name: "kilowatt hour",
            displayname: "kilowatt hour",
            unit: "Wh",
            scale: 1,
            default: true,
        },
    ],
    Var: [
        {
            name: "Volt-Amps Reactive",
            displayname: " Volt-Amps Reactive",
            unit: "Var",
            scale: 1,
            default: true,
        },
    ],
    Va: [
        {
            name: "volt-ampere",
            displayname: "volt-ampere",
            unit: "Va",
            scale: 1,
            default: true,
        },
    ],
    Vah: [
        {
            name: "volt-ampere hours",
            displayname: "volt-ampere hours",
            unit: "Vah",
            scale: 1,
            default: true,
        },
    ],
    "°C": [
        {
            name: "Coulomb",
            displayname: "Coulomb",
            unit: "°C",
            scale: 1,
            default: true,
        },
    ],
    Inches: [
        {
            name: "inches",
            displayname: "inches",
            unit: "Inches",
            scale: 1,
            default: true,
        },
    ],
    "m/s": [
        {
            name: "Meter per second",
            displayname: "Meter per second",
            unit: "m/s",
            scale: 1,
            default: true,
        },
    ],
    kg: [
        {
            name: "Kilo gram",
            displayname: "Kilo gram",
            unit: "kg",
            scale: 1,
            default: true,
        },
    ],
    min: [
        {
            name: "minute",
            displayname: "minute",
            unit: "min",
            scale: 1,
            default: true,
        },
    ],
    Ω: [
        {
            name: "Ohm",
            displayname: "Ohm",
            unit: "Ω",
            scale: 1,
            default: true,
        },
    ],
    "%": [
        {
            name: "percentage",
            displayname: "percentage",
            unit: "%",
            scale: 1,
            default: true,
        },
    ],
    ms: [
        {
            name: "maximum speed",
            displayname: "maximum speed",
            unit: "ms",
            scale: 1,
            default: true,
        },
    ],
    mm: [
        {
            name: "millimeter",
            displayname: "millimeter",
            unit: "mm",
            scale: 1,
            default: true,
        },
    ],
    mbar: [
        {
            name: "pressure",
            displayname: "pressure",
            unit: "mbar",
            scale: 1,
            default: true,
        },
    ],
    deg: [
        {
            name: "degree",
            displayname: "degree",
            unit: "deg",
            scale: 1,
            default: true,
        },
    ],
    bps: [
        {
            name: "bits per second",
            displayname: "bits per second",
            unit: "bps",
            scale: 1,
            default: true,
        },
    ],
    h: [
        {
            name: "hour",
            displayname: "hour",
            unit: "h",
            scale: 1,
            default: true,
        },
    ],
    kPa: [
        {
            name: "Kilo pascal",
            displayname: "Kilo pascal",
            unit: "kPa",
            scale: 1,
            default: true,
        },
    ],
    "kWh/m²": [
        {
            name: "Irradiance",
            displayname: "Irradiance",
            unit: "kWh/m²",
            scale: 1,
            default: true,
        },
    ],
    S: [
        {
            name: "Siemens",
            displayname: "Siemens",
            unit: "S",
            scale: 1,
            default: true,
        },
    ],
};

let userUnitMap = {};
Object.entries(unitmap).map(([key, value]) => {
    const mainvalue = value.find((item) => item.default) || value[0];
    if (mainvalue) {

        Object.assign(userUnitMap, { [key]: mainvalue.unit });
    }
})
console.log(unitmap);