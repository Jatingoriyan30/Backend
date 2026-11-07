const express = require("express")
const noteModel = require("../src/model/notes.model")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./Public"))

app.post("/api/notes" , async(req, res)=>{
    const {title, description} = req.body
    const notes = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "data create successfully"
    })
})

app.get("/api/notes", async(req, res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message: "data find successfully",
        note
    })
})

app.delete("/api/notes/:id", async(req, res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "data delete successfully"
    })

})


module.exports =app