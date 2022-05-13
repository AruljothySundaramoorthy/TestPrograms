

// const random = require('random');
// const splitfunction = (splitvalue, position, significance) => {
//     return splitvalue.split(significance)[position] ? splitvalue.split(significance)[position] : '';

// }

// const generaterandomnumber = () => {
//     const min = 1000000;
//     const max = 99999999;
//     return random.int(min, max);
// }
// module.exports = { splitfunction, generaterandomnumber }

const lodash = require('lodash');
const log = require('@armax_cloud/allspark-data-models/lib/logger').getlogger();
const kafkatopicenum = require('@armax_cloud/allspark-data-models/models/enum/kafkatopic.enum');
const { Duplex } = require('stream');
const db = require('./databaseengine');
const iredis = require('./Iredis');

let utcOffset;
let notificationdispatcherdata;
let plantdisplayname;
let subscriptionavailablekeys;
try {
    const getsettings = async (dbconnection) => {
        const rediskey = 'setting';
        const settingdata = JSON.parse(await iredis.getData(rediskey));
        if (!settingdata) {
            const settingsdbdata = await db.getsettings(dbconnection);
            delete settingsdbdata.clientimage;
            delete settingsdbdata.epcimage;
            await iredis.setData(rediskey, JSON.stringify(settingsdbdata));
            return settingsdbdata;
        }
        return settingdata;
    };
    module.exports = {
        response: (data) => ({
            data,
            error: false,
            errormessage: '',
        }),
        error: (errormessage) => ({
            data: null,
            error: true,
            errormessage,
        }),
        removemongoid: (data) => {
            const tempdata = { ...data };
            // eslint-disable-next-line no-prototype-builtins
            if (Object.prototype.hasOwnProperty(tempdata, '_id')) {
                // eslint-disable-next-line no-underscore-dangle
                delete tempdata._id;
            }
            return tempdata;
        },
        sanitizeppcdata: (data) => {
            const sanitizedata = {
                deviceid: data.deviceid,
                timetaken: data.timetaken,
                starttime: data.starttime,
                endtime: data.endtime,
                data: data.data,
            };

            return sanitizedata;
        },
        sanitizenotificationdata: (data) => {
            const fields = [
                'name',
                'displayname',
                'type',
                'seveority',
                'notificationid',
                'deviceid',
                'status',
                'datareferenceid',
                'createddate',
                'duration',
                'alarmendtime',
            ];
            const sanitizedata = {};
            for (let i = 0; i < fields.length; i++) {
                // eslint-disable-next-line no-prototype-builtins
                if (Object.prototype.hasOwnProperty(data, fields[i])) {
                    sanitizedata[fields[i]] = data[fields[i]];
                }
            }
            sanitizedata.description = data.displayname;
            return sanitizedata;
        },
        defaultnull: (data, defaultdata) => {
            if (data === null || data === undefined) {
                return defaultdata;
            }
            return data;
        },
        handleAppExit: (options) => {
            if (options.exit) {
                process.exit();
            }
        },
        functionbuilder: (functionstring) => {
            const args = [];
            for (let i = 0; i < 100; i++) {
                args.push(`parameter${i + 1}`);
            }

            // eslint-disable-next-line no-new-func
            return new Function(args, functionstring);
        },

        asyncfunctionbuilder: (functionstring) => {
            const args = [];
            for (let i = 0; i < 100; i++) {
                args.push(`parameter${i + 1}`);
            }

            const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;
            return new AsyncFunction(args, functionstring);
        },

        streamToBuffer: (stream) => new Promise((resolve, reject) => {
            const buffers = [];
            stream.on('error', reject);
            stream.on('data', (data) => buffers.push(data));
            stream.on('end', () => resolve(Buffer.concat(buffers)));
        }),
        bufferToStream: (buffer) => {
            const stream = new Duplex();
            stream.push(buffer);
            stream.push(null);
            return stream;
        },
        getsettings: async (dbconnection) => getsettings(dbconnection),
        gettimezoneoffset: async (dbconnection) => {
            if (!utcOffset) {
                const data = await getsettings(dbconnection);
                utcOffset = data?.plantlocationmeta?.timezone?.utcOffset;
            }
            return utcOffset;
        },
        getplantdisplayname: async (dbconnection) => {
            if (!plantdisplayname) {
                const data = await getsettings(dbconnection);
                plantdisplayname = data?.plantdisplayname;
            }
            return plantdisplayname;
        },

        getnotificationdispatcherdata: async (subdomain, dbconnection) => {
            // reference data
            if (!notificationdispatcherdata) {
                const rediskey = `${subdomain}-server-internal-${kafkatopicenum.NOTIFICATIONSDISPATCHER}`;
                notificationdispatcherdata = JSON.parse(await iredis.getData(rediskey));
                // redis data
                if (!notificationdispatcherdata) {
                    // db data
                    notificationdispatcherdata = await db.getnotificationdispatcherdetails(dbconnection);
                    if (notificationdispatcherdata) {
                        // save notificationdispatcher data to redis
                        await iredis.setData(
                            rediskey,
                            JSON.stringify(
                                notificationdispatcherdata.map((x) => lodash.omit(x, ['_id'])),
                            ),
                        );
                    }
                }
            }
            return notificationdispatcherdata;
        },
        getredisalldevicedata: async (subdomain) => {
            if (!Array.isArray(subscriptionavailablekeys)) {
                subscriptionavailablekeys = JSON.parse(
                    await iredis.getData(`${subdomain}-server-internal-ALLDEVICES`),
                );
            }
            return subscriptionavailablekeys;
        },
    };
} catch (e) {
    log.error(e);
}
