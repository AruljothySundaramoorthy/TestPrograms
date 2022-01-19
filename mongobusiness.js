const { sitemodel, blockmodel } = require("./models");

module.exports = {
    savedata: async (data) => {
        try {
            // We create a new document and then save it in database    
            const sitedata = new sitemodel({
                ...data
            });

            // Save is asynchronous and can fail
            return sitedata.save();


        } catch (e) {
            console.log(e);
        }
    },
    saveblockdata: async (data) => {
        try {

            // const blockdata = new blockmodel();

            // Save is asynchronous and can fail
            return blockmodel.insertMany(data);

        } catch (e) {
            console.log(e);
        }
    },
    getblockinfo: async () => {
        try {
            return blockmodel.find().lean();
        } catch (e) {
            console.log(e);
        }
    }

}