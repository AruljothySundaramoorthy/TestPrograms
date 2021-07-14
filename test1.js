// const blockdata = parameter1;

// const groupby = (prop) =>
//     prop.reduce((groups, item) => {
//         const val = item[prop]
//         groups[val] = groups[val] || []
//         groups[val].push(item)
//     }, {});

// const devices = ['037633fb-98ec-4b9c-89a3-f25219547061'];
// let devicevalues = [];
// reportdata = {
//     PQM_ACT_PWR: 0,
//     PQM_RCT_PWR: 0,
//     timestamp: new Date
// }, blockdata.map(e => {
//     let data = {};
//     if(e.devices.hasOwnProperty(devices[0])){
//     return  data = {
//             timestamp: e.starttimestamp,
//             deviceid: devices[0],
//             values: e.devices[devices[0]].parameters
//         };
//     }
//     return null
//     devices.forEach(a => {
//         if (Object.keys(e.devices).find(e => e == a)) {
//             const t = {
//                 timestamp: e.starttimestamp,
//                 deviceid: a,
//                 values: e.devices[a].parameters
//             };
//             devicevalues = [...devicevalues, t]
//         }
//     })
// });
// const grouped_data = devicevalues.groupBy('deviceid');
// Object.values(grouped_data).forEach(e => {
//     e.map(e => {
//         e.values.PQM_ACT_PWR, reportdata.PQM_ACT_PWR += e.values.PQM_ACT_PWR, e.values.PQM_RCT_PWR, reportdata.PQM_RCT_PWR += e.values.PQM_RCT_PWR
//     })
// }), reportdata.PQM_ACT_PWR = reportdata.PQM_ACT_PWR / blockdata.length, reportdata.PQM_RCT_PWR = reportdata.PQM_RCT_PWR / blockdata.length, reportdata.timestamp = blockdata[0].starttime;



