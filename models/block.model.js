const mongoose = require("mongoose");
const { Schema } = mongoose;

const blockSchema = new Schema(
    {
        blockname: String,
        blockdisplayname: String,
        body: String,

        hidden: Boolean,
    },
    { versionKey: false }
);
module.exports = mongoose.model("block", blockSchema);
