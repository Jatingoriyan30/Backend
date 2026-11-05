const mongoose = require("mongoose")

function connectTodb() {
   mongoose.connect(process.env.MONGO_URL)
      .then(() => {
         console.log("database connect successfully")
      })
}

module.exports = connectTodb