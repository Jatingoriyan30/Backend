const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const likeModel = require("../models/like.model")

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

    const file = await imagekit.files.upload({
        file: await toFile(req.file.buffer),
        fileName: "Test",
        folder: "insta-clone"

    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post create successfully",
        post
    })
}

async function getpostController(req, res) {

    const userId = req.user.id

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

    const userId = req.user.id
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

async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post like successfully",
        post
    })


}

module.exports = {
    createpostController,
    getpostController,
    getpostDetailscontroller,
    likePostController

}