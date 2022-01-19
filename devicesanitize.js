const { splitfunction, generaterandomnumber } = require("./util");

const { v4: uuidv4 } = require("uuid");

const enumdata = {
    DEVICE_PROTOCOL: {
        MODBUS: "1",
        SNMP: "2",
        IEC61850: "3",
        IEC104: "4",
        OPCUA: "5",
    },
    PARAMETER_DATA_TYPE: {
        NONE: "0",
        BOOL: "1",
        SIGNEDINT16: "2",
        UNSIGNEDINT16: "3",
        SIGNEDINT32: "4",
        UNSIGNEDINT32: "5",
        REAL32: "6",
        SIGNEDINT64: "7",
        UNSIGNEDINT64: "8",
        DOUBLE64: "9",
        STRING: "10",
        DATE: "11",
        CURRENCY: "12",
        IPADDRESS: "13",
    },
    MODBUS_FUNCTION_CODE: {
        "NONE ": "0",
        "COILSTATUS ": "1",
        "INPUTSTATUS ": "2",
        "HOLDINGREGISTER ": "3",
        "INPUTREGISTER ": "4",
    },
    Status: {
        True: "1",
        False: "0",
    },
    DEVICE_CRON: {
        EVERY_MINUTE: "0/1 * * * *",
        EVERY_5MINUTES: "0/5 * * * *",
        EVERY_10MINUTES: "0/10 * * * *",
        EVERY_15MINUTES: "0/15 * * * *",
        EVERY_30MINUTES: "0/30 * * * *",
        EVERY_HOUR: "0/1 * * *",
    },
    OPCUA_SECURITY_MODE: {
        Invalid: "0",
        None: "1",
        Basic256: "2",
        Basic256Sha256: "6",
        Basic128Rsa15: "10",
    },
    OPCUA_SECURITY_POLICY: {
        Invalid: "0",
        None: "1",
        Sign: "2",
        SignAndEncrypt: "3",
    },
    DEVICETYPE: {
        PLC: "1",
        PPC: "2",
        INVERTER: "3",
        INVERTERUNIT: "4",
        SMB: "5",
        SCB: "6",
        WMS: "7",
        SMS: "8",
        UPS: "9",
        ANNUNCIATOR: "10",
        RELAY: "11",
        AUXMETER: "12",
        NCU: "13",
        SPC: "14",
        PQM: "15",
        PROMETER: "16",
        SWITCH: "17",
        PC: "18",
        BATTERYCHARGER: "19",
        SMARTLOGGER: "20",
        MAINMETER: "21",
        CHECKMETER: "22",
        GPS: "23",
        FAS: "24",
        METER: "25",
        TVM: "26",
        VCB: "27",
        TRANSFORMER: "28",
        LTPANEL: "29",
        PLCPANEL: "30",
        CCTV: "31",
        LBS: "32",
        RTCC: "33",
        PRINTER: "34",
        FIREWALL: "35",
        RTU: "36",
        SAS: "37",
    },
};
const devicesanitize = (data, blocksmap) => {
    let devicedata = {
        deviceport: data.deviceport ?? null,
        devicedatafetchcron:
            enumdata.DEVICE_CRON[splitfunction(data.devicedatafetchcron, 0, ":")],
        deviceip: data.deviceip ?? null,
        devicedisplayname: data.devicename ?? "",
        devicecode: generaterandomnumber(),
        devicesortorder: data.devicesortorder,
        deviceblockid: blocksmap[data.deviceblockname].blockid,

        devicename: data.devicename,
        deviceprotocol: Number(
            enumdata.DEVICE_PROTOCOL[splitfunction(data.deviceprotocol, 0, ":")]
        ),
        devicemake: data.devicemake,
        devicemodel: data.devicemodel,
        devicetypeid: data.devicetypeid ?? 0,
        devicevirtual: data.devicevirtual ? data?.devicevirtual : false,

        devicestatus: {
            communicationalarmenabled:
                data.devicestatus?.communicationalarmenabled ?? false,
            communicationeventenabled:
                data.devicestatus?.communicationeventenabled ?? false,
            disable: data.devicestatus?.disable ?? false,
            hidden: data.devicestatus?.hidden ?? false,
        },
        devicemeta: {},
    };

    switch (devicedata.deviceprotocol) {
        case Number(enumdata?.DEVICE_PROTOCOL?.OPCUA):
            delete devicedata.deviceport;
            delete devicedata.deviceip;
            const opcua = {
                endpoint: data["devicemeta.opcua.endpoint"],
                password: data["devicemeta.opcua.password"],
                securitymode:
                    enumdata.OPCUA_SECURITY_MODE[
                    splitfunction(data["devicemeta.opcua.securitymode"], 0, ":")
                    ],
                securitypolicy:
                    enumdata.OPCUA_SECURITY_POLICY[
                    splitfunction(data["devicemeta.opcua.securitypolicy"], 0, ":")
                    ],
                username: data["devicemeta.opcua.username"],
            };
            devicedata.devicemeta = { ...devicedata.devicemeta, opcua };

            break;
    }

    return devicedata;
};
module.exports = { devicesanitize };
