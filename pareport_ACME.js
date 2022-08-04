const lodash = require("lodash");
const XLSX = require("xlsx");

const fs = require("fs");
const { format } = require("date-fns");
const devices = require("./mockdata/devices_acme.json");
const blockdevicedata = require("./mockdata/blockdevicedatas.json");
const blocks = require("./mockdata/blocks_acme.json");

module.exports = {
    plantavailabilityreport: async (req, res) => {
        const rawpadata=[{"devicename":"",
        "devicetypeid":"",
        "deviceprotocol":"",
        "devicemake":"",
        "devicemodel":"",
        "deviceip":"",
        "deviceport":"",
        "devicedatafetchcron":"",
        "devicedisplayname":"",
        "devicecode":"",
        "devicesortorder":"",
        "blockid":"",
        "deviceparentid":"",
        "devicestatus.disable":"",
        "devicestatus.enable":"",
        "devicestatus.communicationalarmenabled":"",
        "devicestatus.communicationeventenabled":""},]
        const wb = XLSX.utils.book_new();
        const filename = "PA_Report.xlsx";
        const PAavailability = XLSX.utils.json_to_sheet(rawpadata);
        XLSX.utils.book_append_sheet(wb, PAavailability, "PA"); 
        const wb_opts = { bookType: "xlsx", type: "binary" };
        XLSX.writeFile(wb, filename, wb_opts);
        const stream = fs.createReadStream(filename);
        stream.pipe(res);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${`pareport${format(
                new Date(),
                "yyyyMMddHHmmss"
            )}.xlsx`}`
        );
    },
};




 