const { model } = require("mongoose");

model.exports = {
    db: {
        url: "mongodb://localhost:27107/test",
        options: { useNewUrlParser: true }
    }
}