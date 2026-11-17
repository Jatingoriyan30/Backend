const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req, res) {

    const imageurl = req.file
    if (!imageurl) {
        return res.status(400).json({
            message: "image not found"
        })
    }

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(req.file.buffer),
        fileName: "Test",
        folder: "insta-clone"

    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post create successfully",
        post
    })
}

async function getpostController(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({ user: userId })

    if (posts.length === 0) {
        return res.status(404).json({
            message: "No Posts Yet",
            posts: []
        })
    }

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })

}

async function getpostDetailscontroller(req, res) {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "Post Not found"
        })
    }

    const isValid = post.user.toString() === userId

    if (!isValid) {
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    res.status(200).json({
        message: "Post fetch successfully",
        post
    })

}

module.exports = {
    createpostController,
    getpostController,
    getpostDetailscontroller
}