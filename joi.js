const Joi = require("joi");

let IDeviceOtherMeta = Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.string().required(),
    valuedatatype: Joi.number().required(),
    updatedat: Joi.date().required(),
    updatedby: Joi.string().required(),
    updateip: Joi.string().required(),
});
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
let IParameter = Joi.object().keys({
    parametername: Joi.string().required(),
    parameterunit: Joi.string().required(),
    parameterdatatype: Joi.number().required(),
    parametermin: Joi.number().required(),
    parametermax: Joi.number().required(),
    parameterdisplayname: Joi.string().required(),
    parametersortorder: Joi.number().required(),
    parameterread: Joi.boolean().required(),
    parametermeta: Joi.object().keys({
        mosbus: Joi.object().keys({
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
    notifications: Joi.array().items(INotification),
});
module.exports = async (devicedata) =>
    Joi.object({
        devicename: Joi.string().min(3).max(30).required(),
        devicetypeid: Joi.number().required(),
        deviceprotocol: Joi.number().required(),
        devicemake: Joi.string().required(),
        devicemodel: Joi.string().required(),


        deviceport: Joi.number().when("deviceprotocol", {
            not: 5,
            then: Joi.number().required(),
        }),
        devicedatafetchcron: Joi.string().required(),
        deviceip: Joi.string()
            .ip({
                version: ["ipv4"],
            })
            .when("deviceprotocol", { not: 5, then: Joi.string().required() }),

        devicedisplayname: Joi.string().required(),
        devicecode: Joi.number().required(),
        devicesortorder: Joi.number().required(),
        deviceblockid: Joi.string().required(),
        deviceparentid: Joi.string(),
        devicestatus: Joi.object().keys({
            communicationalarmenabled: Joi.boolean().required(),
            communicationeventenabled: Joi.boolean().required(),
            disable: Joi.boolean().required(),
            hidden: Joi.boolean().required(),
        }),
        devicemeta: Joi.object({
            location: Joi.object().keys({
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                googlemaplink: Joi.string().required(),
            }),
            othermeta: Joi.array().items(IDeviceOtherMeta),
            modbus: Joi.object().keys({
                unitid: Joi.number().required(),
            }),
            opcua: Joi.object().keys({
                endpoint: Joi.string().required(),
                securitymode: Joi.number().required(),
                securitypolicy: Joi.number().required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
                privatekey: Joi.string(),
                certificate: Joi.string(),
            }),
        }).required(),
        // parameters: Joi.array().items(IParameter).required(),
        devicevirtual: Joi.boolean().required(),
        devicevirtualfunction: Joi.string(),
    }).validateAsync(devicedata, {
        abortEarly: false,
    });;

// try {
//     const value = schema.validateAsync({
//         username: "abc",
//         birth_year: 1994,
//         password: "abc",
//         repeat_password: "abc",
//         age: "24",
//     });
// } catch (err) { }
