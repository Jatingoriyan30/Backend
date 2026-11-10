const express = require("express")

const userModel = require("../models/usermodel")

const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const emailexist = await userModel.findOne({ email })

    if (emailexist) {

        return res.status(409).json({

            message: "with this email user account already exist"
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_cookie", token)

    res.status(201).json({
        message: "user registered",
        user,
        token
    })

})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "user not found with this email"
        })
    }
    const ispasswordMatch = await user.password === password

    if (!ispasswordMatch) {
        return res.status(400).json({
            message: "invailed password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_cookie", token)

    res.status(200).json({
        message: "login successfully"
    })

})

module.exports = authRouter