const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send('hello world');

})

app.get("/home", (req, res) => {
    res.send("This is a Home page")
})

app.get("/about", (req, res) => {
    
    res.send("This is About")
})

app.listen(3000)