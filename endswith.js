// let ends = [".cs", ".com"];


// let host = "www.page.com";
// let hostEndsWith = (host, ends) => {
//     let value = false;
//     value = ends.some(element => {
//         return host.endsWith(element);
//     });
//     console.log(value);
// };

// hostEndsWith(host, ends);

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


Object.values(data).forEach((tags) => {

    if (
        ((tags.endsWith('_SIMULATED_MEAS') && Object.values(tags.endsWith('')))) ||
        tags.endsWith('_SETPOINT') ||
        tags.endsWith('_DISABLE') ||
        tags.endsWith('_ENABLE')
    ) {
        const property = this.statuscontrol.find(
            (f) => f.sp_tag === parameter.parametername || f.disable_tag === parameter.parametername || f.enable_tag === parameter.parametername,
        );
    })

// import { Component, Input, OnInit } from '@angular/core';
// import * as devicetypeenum from '@armax_cloud/allspark-data-models/models/enum/devicetype.enum';
// import { select, Store } from '@ngrx/store';
// import { filter, first } from 'rxjs/operators';
// import { BlocksState } from 'src/app/store/block/block.reducer';
// import { getblocknamebyblockid } from 'src/app/store/block/block.selector';
// import { ScadaLivedataEffects } from 'src/app/store/livedata/scada/scada-livedata.effects';
// import {
//     getdevicesbyblockanddevicetypeid,
//     getlivedatabylistofdevices,
// } from 'src/app/store/livedata/scada/scada-livedata.selector';

// @Component({
//     selector: 'app-transformer-block',
//     templateUrl: './transformer-block.component.html',
//     styleUrls: ['./transformer-block.component.css'],
// })
// export class TransformerBlockComponent implements OnInit {
//     @Input() blockid: string;
//     device: any = [];
//     devicedata: any = {};
//     devices: any = [];
//     navigationdevice: any;
//     colorcode: string;

//     devicename: string;
//     constructor(
//         private scadastore: Store<ScadaLivedataEffects>,
//         private blockstore: Store<BlocksState>
//     ) { }

//     async ngOnInit() {
//         this.devicename = await this.blockstore
//             .pipe(
//                 select(getblocknamebyblockid, { blockid: this.blockid }),

//                 filter((x) => x !== undefined && x !== null),
//                 first()
//             )
//             .toPromise();
//         this.devices = await this.scadastore
//             .pipe(
//                 select(getdevicesbyblockanddevicetypeid, {
//                     blockid: this.blockid,
//                     devicetypeid: devicetypeenum.TRANSFORMER,
//                     dependencydevice: devicetypeenum.VCB,
//                 }),
//                 filter(
//                     (x: any) => x !== undefined && x !== null && Object.keys(x).length > 0
//                 ),
//                 first()
//             )
//             .toPromise();

//         this.device = this.devices.find((f) => f.devicename.endsWith('DIG'));
//         this.navigationdevice = this.devices.find((f) =>
//             f.devicename.endsWith('ALG')
//         );
//         console.log(this.device);

//         this.scadastore
//             .pipe(
//                 select(getlivedatabylistofdevices, { listofdevices: this.devices }),
//                 filter(
//                     (x: any) => x !== undefined && x !== null && Object.keys(x).length > 0
//                 ),
//                 first()
//             )
//             .subscribe((data: any) => {
//                 this.devicedata = {
//                     ...this.devicedata,
//                     ...JSON.parse(JSON.stringify(data)),
//                 };
//                 console.log(this.devicedata);
//                 if (this.devicedata.IS_HEALTHY) {
//                     this.colorcode = 'grey';
//                 } else if (
//                     [
//                         'BUCH_TRP_FB',
//                         '_OTI_TRP_FB',
//                         '_LV1_WTI_TRP_FB',
//                         '_LV2_WTI_TRP_FB',
//                         '_HV_WTI_TRP_FB',
//                         '_PRV_TRP_FB',
//                         '_OPN_FB',
//                         '_ES_CLS_FB',
//                     ].some(
//                         (parameters1) =>
//                             this.devicedata.endsWith(parameters1) &&
//                             Object.values(this.devicedata.endsWith(parameters1) == true)
//                     )
//                 ) {
//                     this.colorcode = 'red';
//                 }
//                 //   else
//                 //   if(this.devicedata.endsWith('_BUCH_ALM') ||
//                 //   this.devicedata.endsWith('_MOG_ALM') ||
//                 //   this.devicedata.endsWith('_OTI_ALM') ||
//                 //   this.devicedata.endsWith('_LV1_WTI_ALM') ||
//                 //   this.devicedata.endsWith('_LV2_WTI_ALM') ||
//                 //   this.devicedata.endsWith('_HV_WTI_ALM' ))
//                 //   {
//                 else if (
//                     [
//                         '_BUCH_ALM',
//                         '_MOG_ALM',
//                         '_OTI_ALM',
//                         '_LV1_WTI_ALM',
//                         '_LV2_WTI_ALM',
//                         '_HV_WTI_ALM',
//                     ].some(
//                         (parameter) =>
//                             this.devicedata.endsWith(parameter) &&
//                             Object.values(this.devicedata.endsWith(parameter) == true)
//                     )
//                 ) {
//                     this.colorcode = 'yellow';
//                 } else {
//                     this.colorcode = 'green';
//                 }
//             });
//     }
// }
