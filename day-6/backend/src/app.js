const express = require("express")
const app = express()
const cors= require("cors")

app.use(express.json())
app.use(cors())

const noteModel = require("./models/notes.model")

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body
   const notes= await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message: "data create successfully"
    })

})

app.get("/api/notes", async (req, res) => {
    const data = await noteModel.find()

    res.status(200).json({
        message: "data find successfully",
        data
    })
})

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "data delete successfully"
    })
})

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const { title } = req.body
    await noteModel.findByIdAndUpdate(id, { title })

    res.status(200).json({
        message: "data update successfully"
    })
})

module.exports = app