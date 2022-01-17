const Joi = require('joi');

let IDeviceOtherMeta = Joi.object().keys({

    name: Joi.string().required(),
    value: Joi.string().required(),
    valuedatatype: Joi.number().required(),
    updatedat: Joi.date().required(),
    updatedby: Joi.string().required(),
    updateip: Joi.string().required(),
})
let INotification = Joi.object().keys({

    notificationname: Joi.string().required(),
    notificationtype: Joi.number().required(),
    notificationcomparisiontype: Joi.number().required(),
    notificationvalue: { type: [Joi.string(), Joi.number(), Joi.boolean()] },
    notificationconvert: Joi.boolean().required(),
    notificationbitposition: Joi.number().required(),
    notificationdefaultvalue: { type: [Joi.string(), Joi.number(), Joi.boolean()] },
    notificationdisplayname: Joi.string().required(),
    notificationvirtual: Joi.boolean().required(),
    notificationvirtualfunction: Joi.string().required(),
})
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
        })

    }),
    parameterstatus: Joi.object().keys({
        disable: Joi.boolean().required(),
        hidden: Joi.boolean().required(),
    }),
    parameteraggregatefunction: Joi.string(),
    parameterfunction: Joi.string(),
    parametervirtual: Joi.boolean().required(),
    parametervirtualfunction: Joi.string(),
    notifications: Joi.array().items(INotification)

})
const schema = Joi.object({
    devicename: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    devicetypeid: Joi.number()
        .min(1)
        .max(3)
        .required(),
    deviceprotocol: Joi.number()
        .min(1)
        .max(3)
        .required(),
    devicemake: Joi.string()
        .min(1)
        .max(20)
        .required(),
    devicemodel: Joi.string()
        .min(1)
        .max(20)
        .required(),

    deviceport: Joi.number().when('deviceprotocol', { not: '5', then: Joi.number().required() }),
    deviceip: Joi.string().ip({
        version: [
            'ipv4',
        ]
    }).when('deviceprotocol', { not: '5', then: Joi.string().required() }),

    devicecode: Joi.number().required(),
    devicesortorder: Joi.number().required(),
    deviceblockid: Joi.string().required(),
    deviceparentid: Joi.string(),
    devicestatus: Joi.object({
        communicationalarmenabled: Joi.boolean().required(),
        communicationeventenabled: Joi.boolean().required(),
        disable: Joi.boolean().required(),
        hidden: Joi.boolean().required(),
    }),
    devicemeta: Joi.object({
        location: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            googlemaplink: Joi.string().required(),
        }),
        othermeta: Joi.array().items(IDeviceOtherMeta),
        modbus: Joi.object({
            unitid: Joi.number().required(),
        }),
        opcua: Joi.object({
            endpoint: Joi.string().required(),
            securitymode: Joi.number().required(),
            securitypolicy: Joi.number().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            privatekey: Joi.string(),
            certificate: Joi.string(),
        })

    }).required(),
    parameters: Joi.array().items(IParameter).required(),
    devicevirtual: Joi.boolean().required(),
    devicevirtualfunction: Joi.string(),


    // password: Joi.string()
    //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    // repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],

    // birth_year: Joi.number()
    //     .integer()
    //     .min(1900)
    //     .max(2013),
    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
// .with('username', 'birth_year')
// .xor('password', 'access_token')
// .with('password', 'repeat_password');


// schema.validate({ username: 'abc', birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// // -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = schema.validateAsync({ username: 'abc', birth_year: 1994, password: 'abc', repeat_password: 'abc', age: '24' });
}
catch (err) { }