'use strict'

const Location = require('../models/Location')
const toJson = require('../helpers/toJson')


const controller = {
    getAllLocations: async(req, res) => {
        try {
            let allLocation = await Location.find()

            if (!allLocation) {
                return res.status(404).send('Location Not Found')
            }

            if (req.tags) {
                return res.status(200).json({
                    tags: req.tags,
                    locations: allLocation
                })
            }

            return res.status(200).json(allLocation)

        } catch (e) {
            res.status(500).send(toJson.toJSON(e))
        }
    }
}

module.exports = controller