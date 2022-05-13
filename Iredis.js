const Redis = require('./redis');

class IRedis {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }

    static getInstance() {
        if (!IRedis.redisinstance) {
            IRedis.redisinstance = Redis.connect();
        }
        return IRedis.redisinstance;
    }

    static getData(key) {
        return IRedis.getInstance().get(key);
    }

    static setData(key, value) {
        return IRedis.getInstance().set(key, value);
    }

    static getMultipleData(keys) {
        return IRedis.getInstance().mget(keys);
    }

    static getKeys(key) {
        return IRedis.getInstance().keys(key);
    }
}
module.exports = IRedis;
