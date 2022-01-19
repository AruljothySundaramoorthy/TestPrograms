const Joi = require("joi");
let INotification = Joi.object().keys({
    notificationname: Joi.string().required(),
    notificationtype: Joi.number().required(),
    notificationcomparisiontype: Joi.number().required(),
    notificationvalue: { type: [Joi.string(), Joi.number(), Joi.boolean()] },
    notificationconvert: Joi.boolean().required(),
    notificationbitposition: Joi.number().required(),
    notificationdefaultvalue: {
        type: [Joi.string(), Joi.number(), Joi.boolean()],
    },
    notificationdisplayname: Joi.string().required(),
    notificationvirtual: Joi.boolean().required(),
    notificationvirtualfunction: Joi.string().required(),
});
module.exports = async (notificationdata) =>
    Joi.object({
        parametername: Joi.string().required(),
        parameterunit: Joi.string().required(),
        parameterdatatype: Joi.number().required(),
        parametermin: Joi.number().required(),
        parametermax: Joi.number().required(),
        parameterdisplayname: Joi.string().required(),
        parametersortorder: Joi.number().required(),
        parameterread: Joi.boolean().required(),
        parametermeta: Joi.object({
            modbus: Joi.object().keys({
                registeraddress: Joi.number().required(),
                registerlength: Joi.number().required(),
                littleendian: Joi.boolean().required(),
                functioncode: Joi.number().required(),
            }),
            iec61850: Joi.object().keys({
                cid: Joi.string().required(),
                logicalname: Joi.string().required(),
            }),
            opcua: Joi.object().keys({
                nodeid: Joi.string().required(),
            }),
            snmp: Joi.object().keys({
                oid: Joi.string().required(),
            }),
        }),
        parameterstatus: Joi.object().keys({
            disable: Joi.boolean().required(),
            hidden: Joi.boolean().required(),
        }),
        parameteraggregatefunction: Joi.string(),
        parameterfunction: Joi.string(),
        parametervirtual: Joi.boolean().required(),
        parametervirtualfunction: Joi.string(),
        notifications: Joi.array().items(INotification).required(),
    }).validateAsync(notificationdata, {
        abortEarly: false,
    });
