const lodash = require('lodash');

const data = [
    {
        "plant": "A01 PSEPL",
        "energy_actual": 31320.31,
        "energy_expected": 41307.56,
        "energy_dev": -24.18,
        "irr_actual": 7.55,
        "irr_expected": 7.34,
        "irr_dev": 2.86,
        "pa_actual": 100,
        "pa_expected": 99.5,
        "pa_dev": 0.5,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 74.08,
        "pr_expected": 69.35,
        "pr_dev": 6.82,
        "dccuf_actual": 23.29,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A02 NSPPL",
        "energy_actual": 127610.88,
        "energy_expected": 143994.17,
        "energy_dev": -11.38,
        "irr_actual": 6.41,
        "irr_expected": 2.74,
        "irr_dev": "NA",
        "pa_actual": 70.41,
        "pa_expected": 99.5,
        "pa_dev": -29.24,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 86.58,
        "pr_expected": 79.05,
        "pr_dev": 9.53,
        "dccuf_actual": 23.13,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A03 SSPPL",
        "energy_actual": 69533.7,
        "energy_expected": 89618.26,
        "energy_dev": -22.41,
        "irr_actual": 7.28,
        "irr_expected": 2.81,
        "irr_dev": "NA",
        "pa_actual": 63.97,
        "pa_expected": 99.5,
        "pa_dev": -35.71,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 75.8,
        "pr_expected": 77.31,
        "pr_dev": -1.95,
        "dccuf_actual": 23,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A04 SDPIPL",
        "energy_actual": 0,
        "energy_expected": 0,
        "energy_dev": 0,
        "irr_actual": 0,
        "irr_expected": 6.71,
        "irr_dev": -100,
        "pa_actual": 0,
        "pa_expected": 99.5,
        "pa_dev": -100,
        "ga_actual": 0,
        "ga_expected": 0,
        "ga_dev": 0,
        "pr_actual": 0,
        "pr_expected": 74.02,
        "pr_dev": -100,
        "dccuf_actual": 0,
        "dccuf_expected": 0,
        "dccuf_dev": 0
    },
    {
        "plant": "A05 SPPL",
        "energy_actual": 116704,
        "energy_expected": 145206.63,
        "energy_dev": -19.63,
        "irr_actual": 5.95,
        "irr_expected": 6.62,
        "irr_dev": -10.12,
        "pa_actual": 95.67,
        "pa_expected": 99.5,
        "pa_dev": -3.85,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 85.35,
        "pr_expected": 73.58,
        "pr_dev": 16,
        "dccuf_actual": 21.13,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A06 SUPL",
        "energy_actual": 110704,
        "energy_expected": 144351.75,
        "energy_dev": -23.31,
        "irr_actual": 5.91,
        "irr_expected": 2.75,
        "irr_dev": "NA",
        "pa_actual": 72.98,
        "pa_expected": 99.5,
        "pa_dev": -26.65,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 74.93,
        "pr_expected": 78.4,
        "pr_dev": -4.43,
        "dccuf_actual": 18.46,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A07 SSEPL",
        "energy_actual": 113220,
        "energy_expected": 159988.65,
        "energy_dev": -29.23,
        "irr_actual": 6.82,
        "irr_expected": 0,
        "irr_dev": "NA",
        "pa_actual": 86.72,
        "pa_expected": 99.5,
        "pa_dev": -12.84,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 69.14,
        "pr_expected": 0,
        "pr_dev": "NA",
        "dccuf_actual": 19.67,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A08 USUPL",
        "energy_actual": 123292.25,
        "energy_expected": 158977.44,
        "energy_dev": -22.45,
        "irr_actual": 6.78,
        "irr_expected": 0,
        "irr_dev": "NA",
        "pa_actual": 100,
        "pa_expected": 99.5,
        "pa_dev": 0.5,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 75.77,
        "pr_expected": 0,
        "pr_dev": "NA",
        "dccuf_actual": 21.42,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A09 NSUPL",
        "energy_actual": 61048,
        "energy_expected": 79371.48,
        "energy_dev": -23.09,
        "irr_actual": 6.77,
        "irr_expected": 0,
        "irr_dev": "NA",
        "pa_actual": 99.85,
        "pa_expected": 99.5,
        "pa_dev": 0.35,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 75.15,
        "pr_expected": 0,
        "pr_dev": "NA",
        "dccuf_actual": 21.21,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A10 SSUPL",
        "energy_actual": 1082496,
        "energy_expected": 1401042.43,
        "energy_dev": -22.74,
        "irr_actual": 7.55,
        "irr_expected": 0,
        "irr_dev": "NA",
        "pa_actual": 100,
        "pa_expected": 99.5,
        "pa_dev": 0.5,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 75.49,
        "pr_expected": 0,
        "pr_dev": "NA",
        "dccuf_actual": 23.75,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A11 ESPL",
        "energy_actual": 493888,
        "energy_expected": 637453.42,
        "energy_dev": -22.52,
        "irr_actual": 6.46,
        "irr_expected": 3.18,
        "irr_dev": "NA",
        "pa_actual": 99.81,
        "pa_expected": 99.5,
        "pa_dev": 0.31,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 75.7,
        "pr_expected": 75.1,
        "pr_dev": 0.8,
        "dccuf_actual": 20.38,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    },
    {
        "plant": "A12 SPUPL",
        "energy_actual": 1616759.53,
        "energy_expected": 2096153.5,
        "energy_dev": -22.87,
        "irr_actual": 6.13,
        "irr_expected": 0,
        "irr_dev": "NA",
        "pa_actual": 99.99,
        "pa_expected": 99.5,
        "pa_dev": 0.49,
        "ga_actual": 100,
        "ga_expected": 0,
        "ga_dev": "NA",
        "pr_actual": 75.36,
        "pr_expected": 0,
        "pr_dev": "NA",
        "dccuf_actual": 19.25,
        "dccuf_expected": 0,
        "dccuf_dev": "NA"
    }
]



const datavalue = data.map((x) => {
    return Object.values(x)
})
// const datavalue = lodash.sumBy(data, ((x) => x.kwhToday))
console.log(data);