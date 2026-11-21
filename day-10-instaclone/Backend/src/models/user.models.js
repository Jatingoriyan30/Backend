const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: String,
    profileImage: {
        type:String,
        default: "https://ik.imagekit.io/wo2lsnl8d/default%20image.jpg?updatedAt=1794417970828"
    }
    
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel