const Joi = require("joi");

module.exports = async (notificationdata) =>
    Joi.object({
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
    }).validateAsync(notificationdata, {
        abortEarly: false,
    });
