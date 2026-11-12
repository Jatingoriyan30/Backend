const userModel = require("../models/user.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isuserExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isuserExist) {
        return res.status(409).json({
            message: (isuserExist.email == email ? "email already exist" : "username already exist")
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "register successfull",
        user: {
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio,
            profileImage: newUser.profileImage,
        }
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [{ username: username }, { email: email }]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const ispasswordMatch = await bcrypt.compare(password, user.password)

    if (!ispasswordMatch) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "login successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

module.exports = {registerController, loginController}

