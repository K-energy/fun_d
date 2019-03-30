'use strict'

const Tag = require('../models/Tag')
const toJson = require('../helpers/toJson')

const controller = {
    getAllTags: async(req, res) => {
        try {
            let allTags = await Tag.find()

            if (!allTags) {
                return res.status(404).send('Tag Not Found')
            }

            return res.status(200).json(allTags)

        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getAllTagsThenAllLocations: async(req, res, next) => {
        try {
            let allTags = await Tag.find()

            if (!allTags) {
                return res.status(404).send('Tag Not Found')
            }

            req.tags = allTags
            next()

        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    }
}

module.exports = controller