require("dotenv").config()

const app = require("./src/app")
const connectTodb = require("./src/config/database")
connectTodb()

app.listen(3000, ()=>{
    console.log("sever is running on port 3000")
})