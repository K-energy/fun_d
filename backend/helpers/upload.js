'use strict'

const multer = require('multer')
const uuid = require('uuid')
const dotenv = require('dotenv')

dotenv.config()

const ext = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif'
}

const Upload = {
    uploadIdPhotoStorage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.env.UPLOAD_PATH_ID_PHOTO)
        },
        filename: (req, file, cb) => {
            cb(null, uuid.v4() + ext[file.mimetype])
        }
    }),
    uploadProfilePhotoStorage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.env.UPLOAD_PATH_PROFILE_PHOTO)
        },
        filename: (req, file, cb) => {
            cb(null, uuid.v4() + ext[file.mimetype])
        }
    }),
    uploadPictureFilter: (req, file, cb) => {
        var type = file.mimetype
        if (type === 'image/jpeg' || type === 'image/png' || type === 'image/gif') {
            cb(null, true)
        } else {
            cb(new Error('goes wrong on the mimetype'))
        }
    }
}

module.exports = Upload