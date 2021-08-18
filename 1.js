
let color;
var data = {
    IS_HEALTHY: true,
    VCB2_OPN_FB: false,
    VCB2_CLS_FB: true,
    VCB2_ISO_CLS_FB: true,
    VCB2_ISO_OPN_FB: false,
    VCB2_ES_OPN_FB: true,
    VCB2_ES_CLS_FB: false,
    VCB2_REM_FB: true,
    VCB2_SPG_CHG_FB: true,
    VCB2_TCS_FB: false,
    VCB2_OPN_CMD: "-",
    VCB2_CLS_CMD: "-",
    DO_SPARE1: "-",
    DO_SPARE2: "-",
    TRAFO2_BUCH_TRP_FB: false,
    TRAFO2_OTI_TRP_FB: false,
    TRAFO2_LV1_WTI_TRP_FB: false,
    TRAFO2_LV2_WTI_TRP_FB: false,
    TRAFO2_HV_WTI_TRP_FB: false,
    TRAFO2_PRV_TRP_FB: false,
    TRAFO2_BUCH_ALM: false,
    TRAFO2_MOG_ALM: false,
    TRAFO2_OTI_ALM: false,
    TRAFO2_LV1_WTI_ALM: false,
    TRAFO2_LV2_WTI_ALM: false,
    TRAFO2_HV_WTI_ALM: false,
    TRAFO2_OTI: 52.821,
    TRAFO2_LV1_WTI: 62.901,
    TRAFO2_LV2_WTI: 0,
    TRAFO2_HV_WTI: 57.499,
    TRAFO2_SPARE1: 0,
    TRAFO2_SPARE2: 0,
}
if (this.devicedata.IS_HEALTHY) {

    color = 'grey'
}
else if (this.devicedata.endsWith('BUCH_TRP_FB') ||
    this.devicedata.endsWith('_OTI_TRP_FB') ||
    this.devicedata.endsWith('_LV1_WTI_TRP_FB') ||
    this.devicedata.endsWith('_LV2_WTI_TRP_FB') ||
    this.devicedata.endsWith('_HV_WTI_TRP_FB ') ||
    this.devicedata.endsWith('_PRV_TRP_FB') ||
    this.devicedata.endsWith('_OPN_FB') ||
    this.devicedata.endsWith('_ES_CLS_FB')) {
    color = 'red';
}
else if (this.devicedata.endsWith('_BUCH_ALM') ||
    this.devicedata.endsWith('_MOG_ALM') ||
    this.devicedata.endsWith('_OTI_ALM') ||
    this.devicedata.endsWith('_LV1_WTI_ALM') ||
    this.devicedata.endsWith('_LV2_WTI_ALM') ||
    this.devicedata.endsWith('_HV_WTI_ALM')) {
    color = 'yellow';
} else {
    color = 'green'
}



if (data.IS_HEALTHY) then
color = 'grey'
elseif(data.TRAFO2_BUCH_TRP_FB or 
data.TRAFO2_OTI_TRP_FB or 
data.TRAFO2_LV1_WTI_TRP_FB or 
data.TRAFO2_LV2_WTI_TRP_FB or 
data.TRAFO2_HV_WTI_TRP_FB or 
data.TRAFO2_PRV_TRP_FB or 
data.VCB2_OPN_FB or 
data.VCB2_ES_CLS_FB){
    color = 'red';
}
else if (data.TRAFO2_BUCH_ALM or
data.TRAFO2_MOG_ALM or
data.TRAFO2_OTI_ALM or
data.TRAFO2_LV1_WTI_ALM or
data.TRAFO2_LV2_WTI_ALM or
data.TRAFO2_HV_WTI_ALM ) {
    color = 'yellow';
}else {
    color = 'green'
}