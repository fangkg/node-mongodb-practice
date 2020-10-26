const { model } = require("mongoose");

model.exports = {
    schema: {
        mobile: { type: String, required: true },
        realName: { type: String, required: true }
    }
}