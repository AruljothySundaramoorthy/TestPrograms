const mongoose = require('mongoose');
const log = require('@armax_cloud/allspark-data-models/lib/logger').getlogger();
const devicenotificationmodel = require('@armax_cloud/allspark-data-models/models/data-models/devicenotification.model');
const blockdevicedatamodel = require('@armax_cloud/allspark-data-models/models/data-models/blockdevicedata.model');
const blockdeviceperseconddatamodel = require('@armax_cloud/allspark-data-models/models/data-models/blockdeviceperseconddata.model');
const deviceparameterlatestdatamodel = require('@armax_cloud/allspark-data-models/models/data-models/deviceparameterlatestdata.model');
const devicemodel = require('@armax_cloud/allspark-data-models/models/data-models/device.model');
const blockmodel = require('@armax_cloud/allspark-data-models/models/data-models/block.model');
const operationmodel = require('@armax_cloud/allspark-data-models/models/data-models/operation.model');
const parametermodel = require('@armax_cloud/allspark-data-models/models/data-models/parameter.model');
const settingmodel = require('@armax_cloud/allspark-data-models/models/data-models/setting.model');
const prdatamodel = require('@armax_cloud/allspark-data-models/models/data-models/prdata.model');
const padatamodel = require('@armax_cloud/allspark-data-models/models/data-models/padata.model');
const blockcommunicationmodel = require('@armax_cloud/allspark-data-models/models/data-models/blockcommunication.model');
const blockcommunicationlivemodel = require('@armax_cloud/allspark-data-models/models/data-models/blockcommunicationlive.model');
const cronjobmodel = require('@armax_cloud/allspark-data-models/models/data-models/cronjob.model');
const notificationdispatchermodel = require('@armax_cloud/allspark-data-models/models/data-models/notificationdispatcher.model');
const notificationtypeenum = require('@armax_cloud/allspark-data-models/models/enum/notificationtype.enum');
const { MONGOCONNECTIONSTRING, ENABLEDEBUG } = require('./config');

const sanitizenotification = (notification) => {
    const tempnotification = { ...notification };
    if (Object.prototype.hasOwnProperty.call(tempnotification, '_id')) {
        // eslint-disable-next-line no-underscore-dangle
        delete tempnotification._id;
    }
    return tempnotification;
};

try {
    module.exports = {
        saveblockdevicedata: (dbconnection, document) => blockdevicedatamodel(dbconnection).findOneAndUpdate(
            { starttime: document.starttime },
            document,
            {
                new: true,
                upsert: true,
            },
        ),
        saveblockdevicedatabulk: (dbconnection, documents) => blockdevicedatamodel(dbconnection).bulkWrite(documents.map((document) => ({
            updateOne: {
                filter: { starttime: document.starttime }, update: document, new: true, upsert: true,
            },
        }))),
        saveblockdeviceperseconddata: (dbconnection, document) => blockdeviceperseconddatamodel(dbconnection).findOneAndUpdate(
            { starttime: document.starttime },
            document,
            {
                new: true,
                upsert: true,
            },
        ),
        saveblockdeviceperseconddatabulk: (dbconnection, documents) => blockdeviceperseconddatamodel(dbconnection).bulkWrite(documents.map((document) => ({
            updateOne: {
                filter: { starttime: document.starttime }, update: document, new: true, upsert: true,
            },
        }))),
        savenotification: async (dbconnection, document) => {
            if (
                document.notificationtype === notificationtypeenum.ALARM
                || document.notificationtype === notificationtypeenum.EVENT
            ) {
                const condition = document.notificationtype === notificationtypeenum.ALARM
                    ? {
                        notificationdatareferenceid:
                            document.notificationdatareferenceid,

                        notificationstatus: false,
                    }
                    : {
                        notificationdatareferenceid:
                            document.notificationdatareferenceid,
                    };
                const notification = await devicenotificationmodel(dbconnection).count(
                    condition,
                );
                if (notification > 0) {
                    return;
                }
            }
            await devicenotificationmodel(dbconnection).findOneAndUpdate(
                { notificationdatareferenceid: document.notificationdatareferenceid },
                { $set: sanitizenotification(document) },
                {
                    new: true,
                    upsert: true,
                },
            );
        },
        updatelatestdeviceparameters: (dbconnection, document) => deviceparameterlatestdatamodel(dbconnection).findOneAndUpdate(
            {
                $and: [
                    { deviceid: document.deviceid },
                    { deviceip: document.deviceip },
                ],
            },
            document,
            {
                upsert: true,
                new: true,
            },
        ),
        getblocks: (dbconnection) => blockmodel(dbconnection).find({}).lean(),
        getsettings: (dbconnection) => settingmodel(dbconnection).findOne({}).lean(),
        getdevices: (dbconnection) => devicemodel(dbconnection).find({}).lean(),
        getoperations: (dbconnection) => operationmodel(dbconnection).find({}).lean(),
        getparameters: (dbconnection) => parametermodel(dbconnection).find({}).lean(),
        getlatestdevicedata: (dbconnection, deviceid, deviceip) => deviceparameterlatestdatamodel(dbconnection)
            .findOne({ $and: [{ deviceid }, { deviceip }] })
            .lean(),
        getlastblockdata: (dbconnection, starttimestamp, lessertimestamp) => blockdevicedatamodel(dbconnection)
            .find({
                starttimestamp: { $gte: starttimestamp, $lt: lessertimestamp },
            })
            .sort({ starttimestamp: -1 })
            .lean(),
        saveprreport: (dbconnection, prdata) => prdatamodel(dbconnection).create(prdata),
        savepareport: (dbconnection, padata) => padatamodel(dbconnection).create(padata),
        saveblockcommunication: (dbconnection, payload) => blockcommunicationmodel(dbconnection).create(payload),
        updateblockcommunicationlive: (dbconnection, payload) => blockcommunicationlivemodel(dbconnection).findOneAndUpdate({}, payload, {
            upsert: true,
        }),
        getcronjobdata: (dbconnection) => cronjobmodel(dbconnection).find({}).lean(),
        getcronjobdatabyid: (dbconnection, cronjobid) => cronjobmodel(dbconnection).findOne({ cronjobid }).lean(),
        getblockdevicedatbylimit: (dbconnection, limit, date) => blockdevicedatamodel(dbconnection)
            .find({ starttime: { $lt: date } })
            .sort({ _id: -1 })
            .limit(limit)
            .lean(),
        getdeviceinfo: (dbconnection, devicetypeid) => devicemodel(dbconnection).findOne({ devicetypeid }, { _id: 0 }),
        getdevicesbydevicetypeid: (dbconnection, devicetypeid, query) => devicemodel(dbconnection)
            .find({ devicetypeid, ...(query || {}) }, { _id: 0 })
            .lean(),
        getlatestdatabydeviceid: (
            dbconnection,
            starttimestamp,
            lessertimestamp,
            devicetypedata,
        ) => blockdevicedatamodel(dbconnection)
            .find(
                {
                    starttimestamp: { $gte: starttimestamp, $lte: lessertimestamp },
                },
                { ...devicetypedata, _id: 0 },
            )
            .sort({ starttimestamp: -1 })
            .lean(),
        getdevicesbydeviceid: (dbconnection, devicetypedata) => devicemodel(dbconnection)
            .find(
                {
                    devicetypeid: { $in: devicetypedata },
                },
                { deviceid: 1, _id: 0 },
            )
            .lean(),
        getblockdevicedatbylimitandid: (
            dbconnection,
            limit,
            date,
            devicetypedata,
        ) => blockdevicedatamodel(dbconnection)
            .find(
                { starttime: { $lt: date } },
                { ...devicetypedata, starttime: 1, _id: 0 },
            )
            .sort({ _id: -1 })
            .limit(limit)
            .lean(),
        getblockdevicedatabydeviceid: (dbconnection, deviceid) => blockdevicedatamodel(dbconnection)
            .findOne(
                {},
                {
                    [`devices.${deviceid}`]: 1,
                    _id: 0,
                },
            )
            .sort({
                starttimestamp: -1,
            })
            .skip(2)
            .lean(),

        gethelperfunctions: (dbconnection) => settingmodel(dbconnection).findOne({}).lean(),
        getnotificationdispatcherdetails: (dbconnection) => notificationdispatchermodel(dbconnection).find({}).lean(),

        showdevices(dbconnection) {
            return devicemodel(dbconnection).find({}).select('-devicecomments');
        },

        showblocks(connection, query) {
            if (typeof query === 'object') {
                return blockmodel(connection).find(query);
            }
            return blockmodel(connection).find({});
        },

        connect: () => {
            const option = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            };
            mongoose.connect(MONGOCONNECTIONSTRING, option);

            mongoose.set('debug', true);


            mongoose.connection.on('connected', () => {
                console.log(
                    'Mongoose default connection is open to ',
                    MONGOCONNECTIONSTRING,
                );
            });

            mongoose.connection.on('error', (err) => {
                log.error(`Mongoose default connection has occured ${err} error`);
            });

            mongoose.connection.on('disconnected', (err) => {
                log.info('Mongoose default connection is disconnected');
            });

            process.on('SIGINT', () => {
                mongoose.connection.close(() => {
                    log.info(
                        'Mongoose default connection is disconnected due to application termination',
                    );
                    process.exit(0);
                });
            });
        },
    };
} catch (e) {
    log.error(e);
}
