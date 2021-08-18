function checkcolorcode(device, maxpr) {
    var inverterspecificpr = -1;
    var devicecolorcode = "communication-error";
    if (device.parameters.IS_HEALTHY == true) {
        if (!(device.parameters.INV_DLY_ACT_EXP <= 0)) {
            inverterspecificpr = (1 - device.prvalue / maxpr) * 100;
        }
        switch (true) {
            case inverterspecificpr >= 0 || inverterspecificpr < 5:
                devicecolorcode = "good";
                break;
            case inverterspecificpr >= 5 || inverterspecificpr < 10:
                devicecolorcode = "average";
                break;
            case inverterspecificpr >= 10:
                devicecolorcode = "poor";
                break;
            default:
                devicecolorcode = "no-generatioon";
        }
    }
    let value = { colorcode: devicecolorcode };
    return value;
}
