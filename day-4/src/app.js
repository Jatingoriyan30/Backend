const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.post('/notes', (req, res) => {

    notes.push(req.body)

    res.send('post create suceesfull')
})

app.get('/notes', (req, res) => {

    res.send(notes)
})

app.patch('/notes/:index', (req, res) => {

    notes[req.params.index].title = req.body.title

    notes[req.params.index].description = req.body.description

    res.send('data update succesfully')
})

app.delete('/notes/:index', (req, res) => {

    delete notes[req.params.index]

    res.send('data delete succesfully')
})

app.put('/notes/:index', (req, res) => {

    notes[req.params.index] = req.body

    res.send('data update successfully')
})


module.exports = app