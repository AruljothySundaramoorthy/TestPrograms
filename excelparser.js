const XLSX = require("xlsx");

const { v4: uuidv4 } = require("uuid");
const { devicesanitize } = require("./devicesanitize");
const mongobusiness = require("./mongobusiness");
const deviceModelValidator = require("./joi");

// try {

const processor = async (filedata) => {
    // const file = XLSX.readFile("./CMS_MAPPING.xlsx");
    try {
        const workbook = XLSX.readFile(filedata);
        let data = [];

        let tempUnitenum = {};
        let tempUnitenum2 = {};
        let unitEnum = XLSX.utils
            .sheet_to_json(workbook.Sheets["Units"])
            .map((x) => {
                Object.assign(tempUnitenum2, {
                    [x.Key]: x.Key,
                });
                Object.assign(tempUnitenum, {
                    [`${x.Key}`]: [],
                });
                return {
                    [x.Key]: x.Key
                };
            });
        console.log(unitEnum);

        XLSX.utils.sheet_to_json(workbook.Sheets["Unitenums"]).map((x) => {
            tempUnitenum[x.group].push(x);
            console.log(x);
        });
        return unitEnum;
    } catch (e) {
        console.log(e);
    }

};

// processor();

module.exports = { processor };
