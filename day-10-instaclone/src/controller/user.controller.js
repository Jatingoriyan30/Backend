const followModel = require("../models/follow.model")
const userModel = require("../models/user.models")

async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isfolloweeExist = await userModel.findOne({
        username: followeeUsername
    })

    if (!isfolloweeExist) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    if (followeeUsername == followerUsername) {
        return res.status(404).json({
            message: "You can't follow yourself"
        })
    }

    const isAlreadyfollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyfollowing) {
        return res.status(409).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyfollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })

}

async function unfollowUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserfollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserfollowing) {
        return res.status(400).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserfollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })

}

module.exports = {
    followUserController,
    unfollowUserController
}