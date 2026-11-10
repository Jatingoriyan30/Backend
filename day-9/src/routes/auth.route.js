const express = require("express")

const userModel = require("../models/user.model")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")


const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const isuserExist = await userModel.findOne({ email })

    if (isuserExist) {

        return res.status(409).json({

            message: "user already exist with this email"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash("sha256").update(password).digest("hex")
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token)

    res.status(200).json({
        message: "register successfully"
    })
})

authRouter.get("/get-me", async (req, res) => {

    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(409).json({
            message: "user not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const ispasswordMatch = hash === user.password

    if (!ispasswordMatch) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token)

    res.status(200).json({
        message: "login successfully"
    })
})

module.exports = authRouter