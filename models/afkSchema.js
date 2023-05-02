const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    afk: Boolean,
    afk_reason: String
})

module.exports = mongoose.model("afk", schema, "afk")