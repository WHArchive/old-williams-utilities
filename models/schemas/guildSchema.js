const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "!"
    },
    logChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    }
})

module.exports = mongoose.model("guild", schema, "guild")