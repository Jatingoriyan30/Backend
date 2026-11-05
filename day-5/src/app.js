const express = require("express")

const noteModel = require("./models/notes")

const app = express()

app.use(express.json())

app.post("/notes", async (req, res) => {

    const { name, age, city } = req.body

    const note = await noteModel.create({
        name,
        age,
        city
    })

    res.status(201).json({

        message: "data create successfully"
    })
})

app.get("/notes", async (req, res) => {
    const note = await noteModel.find()

    res.status(200).json({
        message: "data find successfully",
        note
    })
})

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "data delete successfully"
    })
})

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const { name } = req.body

    await noteModel.findByIdAndUpdate(id, { name })

    res.status(200).json({
        message: "data update successfully"
    })
})

module.exports = app