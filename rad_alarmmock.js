const { v4: uuidv4 } = require('uuid');
const blocks = require('./mockdata/rad_blocks.json');
const devices = require('./mockdata/rad_devices.json');
const plants = require('./mockdata/rad_plants.json')
// {
//     _id:
//     plantid:"61f7d6a85d965045c2618041"
//     blockid:
//     deviceid:
//     alarmid:
//     alarmdescription:
//     alarmseverity:
//     alarmstatus:
//     alarmstartdatetime:
//     alarmenddatetime:
//     alarmacknowledgement:
//     alarmcomments:
// }

const severity = ['HIGH', 'LOW', 'MEDIUM']
const alarmstatus = ['ON', 'OFF']
const alarmcomments = ['ON', 'OFF', 'NONE', 'TRIGGERED', 'YET TO CLOSE']
const alarmack = [true, false]

const alarmdata = devices.map((device) => {
    const blockinfo = blocks.find((block) => block._id.toString() == device.blockid.toString());
    const plantinfo = plants.find((plant) => plant._id.toString() == device.blockid.toString());
    return alarm_info = {
        _id: uuidv4(),
        plantid: plantinfo._id.$oid.toString(),
        blockid: blockinfo._id.$oid.toString(),
        deviceid: device._id.$oid.toString(),
        alarmid: uuidv4(),
        alarmdescription: 'test alarm',
        alarmseverity: severity[Math.floor(Math.random() * 2)],
        alarmstatus: alarmstatus[Math.floor(Math.random() * 1)],
        alarmstartdatetime: new Date().getTime(),
        alarmenddatetime: new Date().getTime(),
        alarmacknowledgement: alarmack[Math.floor(Math.random() * 1)],
        alarmcomments: alarmcomments[Math.floor(Math.random() * 4)]
    }

})
console.log(alarmdata)