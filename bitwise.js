getStatusCode = (value) => {
    const status = value
    switch (true) {
        // case (status & 1) === 1:
        //     return 'ncu-battery-over-current'; // Battery over current
        case (status & 4) === 4:
            return 'ncu-battery-over-voltage'; // Battery over voltage
        // case (status & 16) === 16:
        //     return 'ncu-ac-poweer-loss'; // AC Power Loss
        // case (status & 65536) === 65536:
        //     return 'ncu-over-temperature'; // NCU over temperature
        // case (status & 131072) === 131072:
        //     return 'ncu-battery-over-temperature'; // Battery over temperature
        // case (status & 262144) === 262144:
        //     return 'ncu-power-suppy-over-voltage'; // Power supply over voltage
        default:
            return 'healthy';
    }
}
console.log(getStatusCode(2073))
// console.log(getStatusCode(119))
// return (118 >>> 0).toString(2)
// return (2 >>> 0).toString(2)
// return (16 >>> 0).toString(2)