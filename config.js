const dotenv = require('dotenv');
const ip = require('ip');
const os = require('os');

dotenv.config();
const error = (errorMessage) => {
    throw Error(errorMessage);
};

const {
    CRONSCHEDULERPORT,
    MONGOCONNECTIONSTRING,
    KAFKACONNECTIONSTRING,
    CRONSCHEDULERJWTSECRET,
    LOGGERCONNECTIONSTRING,
    REDISMASTERNAME,
    REDISSENTINEL,
    REDISPORT,
    REDISPASSWORD,
    REDISSERVER,
    REDISSENTINELPASSWORD,
    SUBDOMAIN,
    LOGGERTYPE,
    APPLICATIONNAME,
    SERVERIP,
    SERVERNAME,
    ENABLEDEBUG,
    ENABLEHTTPS,

    DATASCRAPPERPORT,
    DATASCRAPPERJWTSECRET,

    SMTPSERVER,
    SMTPPORT,
    SMTPUSERNAME,
    SMTPPASSWORD,
} = process.env;

const config = {
    CRONSCHEDULERPORT: CRONSCHEDULERPORT || error('Missing cronscheduler port'),
    MONGOCONNECTIONSTRING:
        MONGOCONNECTIONSTRING || error('Missing mongo connection string'),
    KAFKACONNECTIONSTRING:
        KAFKACONNECTIONSTRING || error('Missing kafka connection string'),
    CRONSCHEDULERJWTSECRET:
        CRONSCHEDULERJWTSECRET || error('Missing notification secret'),
    LOGGERCONNECTIONSTRING,
    REDISSERVER,
    REDISPORT,
    REDISPASSWORD,
    REDISMASTERNAME,
    REDISSENTINEL,
    REDISSENTINELPASSWORD,
    SUBDOMAIN,
    LOGGERTYPE,
    APPLICATIONNAME: APPLICATIONNAME || error('Missing applicationname'),
    SERVERIP: SERVERIP || ip.address(),
    SERVERNAME: SERVERNAME || os.hostname(),
    ENABLEDEBUG: ENABLEDEBUG || false,
    ENABLEHTTPS,

    DATASCRAPPERPORT: DATASCRAPPERPORT || error('Missing data scrapper port'),
    DATASCRAPPERJWTSECRET:
        DATASCRAPPERJWTSECRET || error('Missing datascrapper secret'),

    SMTPSERVER,
    SMTPPORT,
    SMTPUSERNAME,
    SMTPPASSWORD,
};

module.exports = config;
