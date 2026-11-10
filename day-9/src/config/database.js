const mongoose = require("mongoose")

async function connectTodb() {

    await mongoose.connect(process.env.MONGO_URL)

    console.log("database connected successfully")
}

module.exports = connectTodb