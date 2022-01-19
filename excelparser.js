const XLSX = require("xlsx");

const { v4: uuidv4 } = require("uuid");
const { devicesanitize } = require("./devicesanitize");
const mongobusiness = require("./mongobusiness");
const deviceModelValidator = require("./joi");


// try {



const processor = async (filedata) => {
    // const file = XLSX.readFile("./CMS_MAPPING.xlsx");
    const workbook = XLSX.readFile(filedata);
    let data = [];

    let blocksmap = {};
    let blocks;
    let devices = [];

    // blocks = XLSX.utils
    //     .sheet_to_json(workbook.Sheets["blocks"])
    //     .map((x) => (x = { ...x }));

    // blocks.map((x) => Object.assign(blocksmap, { [x.blockname]: x }));

    // const savedata = await mongobusiness.saveblockdata(blocks);
    // console.log(savedata);
    let blockinfo = await mongobusiness.getblockinfo();
    blockinfo = blockinfo.map((blockdata) => {
        return { ...blockdata, ...{ _id: blockdata._id.toString() } }
    })
    blockinfo.map((x) => Object.assign(blocksmap, { [x.blockname]: x }));
    // Device data process flow

    const processdevicedata = (data) => {
        const promisemap = data.map((devicedata) => {
            const devicedataval = devicesanitize(devicedata, blocksmap);
            return deviceModelValidator(devicedataval);

        })
        return Promise.all(
            promisemap
        )
    };

    devices = await processdevicedata(
        XLSX.utils.sheet_to_json(workbook.Sheets["devices"])
    );

    console.log(filedata);
};

// processor();


module.exports = { processor }