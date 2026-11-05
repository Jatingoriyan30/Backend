const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
})



const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel