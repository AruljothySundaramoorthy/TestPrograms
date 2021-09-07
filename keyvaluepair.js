/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/*
    Multiple line to single line converter
    link :  https://tools.knowledgewalls.com/online-multiline-to-single-line-converter
*/
const inputdata = 'APPLICATIONNAME=allspark-cron-scheduler DATASCRAPPERJWTSECRET=9Tj9cacReveTxc4MURwcNb7BztFNNN7Mh2x62zMRTCA2sfDbHZZmMWzWZ5ADuhfB DATASCRAPPERPORT=3005 JWTSECRET=xwZTA4cxpwev4dfnTWTyZkHBCHFetN8XZuATkSDTt7sz7FK8JahBP9qEHyFgK8hh KAFKACONNECTIONSTRING=10.10.30.156:9092,10.10.30.157:9092 LOGGERCONNECTIONSTRING=http://10.10.30.190:9200 LOGGERTYPE=1 MONGOCONNECTIONSTRING=mongodb://root:2RekwQ8qcZGN4rdG0baRUPUivfgmMH1D@10.10.30.151:6000,10.10.30.152:6000,10.10.30.153:6000?replicaSet=oneSCADA&readPreference=secondaryPreferred&authSource=admin&appname=allspark-cron-scheduler REDISMASTERNAME=redismaster REDISPASSWORD=HEVC9rg6dJ5fmceTAufqTbDw28AypsjW REDISSENTINEL=10.10.30.164:5000,10.10.30.165:5000,10.10.30.166:5000,10.10.30.167:5000 SUBDOMAIN=mrprio ENABLEDEBUG=false ENABLEHTTPS=false';
const dataarray = inputdata.split(' ');
const keyvaluepairArray = dataarray.map((keyvaluestring) => {
    const equalchartat = keyvaluestring.indexOf('=');
    const key = keyvaluestring.substr(0, equalchartat);
    const value = keyvaluestring.substr(equalchartat + 1);
    return [key, value];
});

const keyvaluepairObject = Object.fromEntries(keyvaluepairArray);
const { APPLICATIONNAME } = keyvaluepairObject;
const applicationname = APPLICATIONNAME
    ? `${APPLICATIONNAME.split('-').join('').toUpperCase()}_`
    : '';
const keyvaluepair = Object.fromEntries(
    Object.keys(keyvaluepairObject).map((key) => [
        `${applicationname}${key}`,
        !isNaN(keyvaluepairObject[key])
            ? parseInt(keyvaluepairObject[key])
            : keyvaluepairObject[key] === 'true'
                || keyvaluepairObject[key] === 'false'
                ? keyvaluepairObject[key] === 'true'
                : keyvaluepairObject[key],
    ]),
);

console.log(keyvaluepair);