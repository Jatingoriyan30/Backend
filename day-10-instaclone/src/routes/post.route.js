const express = require("express")
const postController = require("../controller/post.controller")
const identifyUser = require("../middlewares/auth.middleware")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()

postRouter.post("/", upload.single("image"),identifyUser, postController.createpostController)

postRouter.get("/", identifyUser, postController.getpostController)

postRouter.get("/details/:postId", identifyUser, postController.getpostDetailscontroller)

postRouter.post("/like/:postId", identifyUser, postController.likePostController )

module.exports = postRouter