'use strict'

const User = require('../models/User')
const toJson = require('../helpers/toJson')


const controller = {
    getUserById: async(req, res, next) => {
        try {
            const userId = req.auth.id
            const user = await User.findById(userId)

            if (!user) {
                return res.status(404).send('User Not Found')
            }

            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },

    createUser: async(req, res, next) => {
        try {
            const username = req.body.user.username
            const email = req.body.user.email
            let user = await User.findOne({
                'username': username
            })

            if (user) {
                return res.status(403).send('Username Existed')
            } else {
                let userr = await User.findOne({
                    'userInfo.email': email
                })
                if (userr) {
                    console.log(userr);
                    return res.status(403).send('Email Existed')
                } else {
                    if (!req.body.user) {
                        next()
                    }
        
                    let newUser = new User(req.body.user)
        
                    await newUser.save()
        
                    next()
                }
            }

            
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createProfilePhoto: async(req, res) => {
        try {
            if (req.file) {
                const id = req.auth.id
                const filename = req.file.filename

                console.log(filename)

                let user = await User.findById(id)
                if (!user) {
                    return res.status(404).send('User not found')
                }

                user.set({
                    userInfo: {
                        profilePhoto: filename
                    }
                })
                await user.save()

                let populatedUser = await User.findById(id)

                return res.status(201).send(populatedUser)
            } else {
                return res.status(500).send('Error uploading user profile photo')
            }
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJSON(e))
        }
    },
    updateUser: async(req, res, next) => {
        try {
            const userId = req.auth.id
            let user = await User.findById(userId)
            if (!user) {
                return res.status(404).send('User not found')
            }

            user.set(req.body.user)
            await user.save()

            req.user = user

            next()
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    },

}

module.exports = controller