var cron = require('node-cron');
var parser = require('cron-parser')
const _ = require("lodash"); 








// function focrecaster(data){
//     const devices =[{"037633fb-98ec-4b9c-89a3-f25219547061":["PQM_ACT_EXP","PQM_ACT_IMP","PQM_ACT_PWR"]}
//      ,   {"d2fbed2e-2074-403d-ac16-853227465f65":["PRO_ACT_EXP",
//     "PRO_ACT_IMP",
//     "PRO_ACT_PWR"]},    {"1486dda8-b7bb-4bf7-a256-0386a87002a2":["PRO_ACT_EXP",
//     "PRO_ACT_IMP",
//     "PRO_ACT_PWR"]}]
// //  const devicedata =data.map((m)=>devices.map((md)=>{if(Object.values(m.device==md)){console.log({[m.devices[md].devicemeta.devicename]:m.devices[md]})}}))
// //  const devicedata =data.map((m)=>devices.map((md)=>{if(Object.values(m.device==md)){console.log({[m.devices[md].devicemeta.devicename]:m.devices[md].parameters})}}))
// //   const devicedata =data.map((m)=>devices.map((md)=>{if(Object.values(m.device==md)){console.log({[m.devices[Object.keys(md)].devicemeta.devicename]:m.devices[Object.keys(md)].parameters})}}))
//   const devicedata =data.map((m)=>devices.map((md)=>{
//       if(Object.values(m.device==md))
//     //   {console.log(
//           { 
//           values = m.devices[Object.keys(md)].parameters; 
//              const pdata =Object.values(md).map((param)=>param.map((p)=>({[p]:values[p]})))
           
              
//               return {[m.devices[Object.keys(md)].devicemeta.devicename] :Object.values(md).map((param)=>param.map((p)=>({[p]:values[p]})))}}
//   }
//               ) 
//             )
//     console.log(devicedata)

// }


function focrecaster(data){

    Array.prototype.groupBy = function (prop) {
        return this.reduce(function (groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, {})
    }; 
    
    
    const devices =["d2fbed2e-207;4-403d-ac16-853227465f65","1486dda8-b7bb-4bf7-a256-0386a87002a2"];
     let devicevalues = [];
     reportdata={PRO_APP_PWR:0,PRO_ACT_PWR:0,timestamp:new Date()}
const devicedata =data.map((m)=>{
    devices.forEach((dev)=>{
        if(Object.keys(m.devices).find((md)=>md==dev)){
           const data={timestamp:m.starttimestamp,deviceid:dev,values:m.devices[dev].parameters}
           devicevalues=[...devicevalues,data]
        }
    })  
}) 
const grouped_data = devicevalues.groupBy('deviceid'); 


  Object.values(grouped_data).forEach((data)=>{data.map((d1)=>{
    if(typeof(d1.values.PRO_ACT_PWR=='number')){
        reportdata.PRO_ACT_PWR+=d1.values.PRO_ACT_PWR
    }else{
        reportdata.PRO_ACT_PWR+=0
    }

    if(typeof(d1.values.PRO_APP_PWR=='number')){
        reportdata.PRO_APP_PWR+=d1.values.PRO_APP_PWR
    }else{
        reportdata.PRO_APP_PWR+=0
    } 
})})
reportdata.PRO_ACT_PWR = reportdata.PRO_ACT_PWR/data.length
reportdata.PRO_APP_PWR = reportdata.PRO_APP_PWR/data.length
reportdata.timestamp = new Date(data[0].starttimestamp) 
return reportdata 
}

// function focrecaster(data){

//     Array.prototype.groupBy = function (prop) {
//         return this.reduce(function (groups, item) {
//             const val = item[prop]
//             groups[val] = groups[val] || []
//             groups[val].push(item)
//             return groups
//         }, {})
//     };
    
//     // initiate your groupBy. Notice the recordset Cars and the field Make....
    
    
//     const devices =["d2fbed2e-207;4-403d-ac16-853227465f65","1486dda8-b7bb-4bf7-a256-0386a87002a2"];
//      let devicevalues = [];
//      reportdata={PRO_APP_PWR:0,PRO_ACT_PWR:0,timestamp:new Date()}
// const devicedata =data.map((m)=>{
//     devices.forEach((dev)=>{
//         if(Object.keys(m.devices).find((md)=>md==dev)){
//            const data={timestamp:m.starttimestamp,deviceid:dev,values:m.devices[dev].parameters}
//            devicevalues=[...devicevalues,data]
//         }
//     })  
// })
// // let grouped_data = _.groupBy(devicevalues, 'deviceid')
// const grouped_data = devicevalues.groupBy('deviceid');
//     console.log(grouped_data);


//   Object.values(grouped_data).forEach((data)=>{data.map((d1)=>{
//     if(typeof(d1.values.PRO_ACT_PWR=='number')){
//         reportdata.PRO_ACT_PWR+=d1.values.PRO_ACT_PWR
//     }else{
//         reportdata.PRO_ACT_PWR+=0
//     }

//     if(typeof(d1.values.PRO_APP_PWR=='number')){
//         reportdata.PRO_APP_PWR+=d1.values.PRO_APP_PWR
//     }else{
//         reportdata.PRO_APP_PWR+=0
//     } 
// })})
// reportdata.PRO_ACT_PWR = reportdata.PRO_ACT_PWR/data.length
// reportdata.PRO_APP_PWR = reportdata.PRO_APP_PWR/data.length
// reportdata.timestamp = new Date(data[0].starttimestamp) 
// return reportdata 
// }

 
    
    focrecaster(data)
 