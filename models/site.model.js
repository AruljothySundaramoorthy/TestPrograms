// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const { Schema } = mongoose;

const siteSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }

}, { versionKey: false });
module.exports = mongoose.model('site', siteSchema);