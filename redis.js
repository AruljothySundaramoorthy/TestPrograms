const Redis = require('ioredis');
const log = require('@armax_cloud/allspark-data-models/lib/logger').getlogger();
const {
    REDISSERVER,
    REDISPORT,
    REDISPASSWORD,
    REDISMASTERNAME,
    REDISSENTINEL,
    REDISSENTINELPASSWORD,
} = require('./config');

try {
    module.exports = {
        connect: () => {
            let redisconfig = {};
            if (REDISSENTINEL) {
                redisconfig = {
                    ...redisconfig,
                    sentinels: REDISSENTINEL.split(',').map((x) => {
                        const tempconfig = x.split(':');
                        return { host: tempconfig[0], port: parseInt(tempconfig[1], 10) };
                    }),
                    name: REDISMASTERNAME,
                };
                if (REDISSENTINELPASSWORD) {
                    redisconfig.sentinelPassword = REDISSENTINELPASSWORD;
                }
                if (REDISPASSWORD) {
                    redisconfig.password = REDISPASSWORD;
                }
            } else {
                redisconfig.port = parseInt(REDISPORT, 10);
                redisconfig.host = REDISSERVER;
                if (REDISPASSWORD) {
                    redisconfig.password = REDISPASSWORD;
                }
            }
            const redisclient = new Redis(redisconfig);
            redisclient.on('error', (error) => {
                log.error(error);
            });
            redisclient.on('end', (error) => {
                log.error(error);
            });
            return redisclient;
        },
    };
} catch (e) {
    log.error(e);
}
