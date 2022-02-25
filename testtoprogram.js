const { parameters, deviceid, blockid, deviceparentid, devicename } =
    parameter1;

const actualangle = isNaN(parameters[`CTRL_BOX_TRGT_ANG1`])
    ? 0
    : parameters[`CTRL_BOX_TRGT_ANG1`];
const targetangle = isNaN(parameters[`CTRL_BOX_ACTUAL_ANG1`])
    ? 0
    : parameters[`CTRL_BOX_ACTUAL_ANG1`];
const value = isNaN(actualangle - targetangle) ? 0 : actualangle - targetangle;
if (parameters?.IS_HEALTHY !== true) {
    return {
        deviceid,
        blockid,
        priority: 30,
        colorcode: "#7a7676",
        deviceparentid,
        ishealthy: parameters?.IS_HEALTHY || false,
    };
}
switch (value) {
    case value > 5:
        return {
            deviceid,
            blockid,
            priority: 2,
            colorcode: "#0af541",
            deviceparentid,
            ishealthy: parameters?.IS_HEALTHY || false,
        };
    default:
        return {
            deviceid,
            blockid,
            priority: 3,
            colorcode: "#7a7676",
            deviceparentid,
            ishealthy: parameters?.IS_HEALTHY || false,
        };
}
