'use strict'

const multer = require('multer')
const Upload = require('../helpers/upload')

const controller = {
    uploadIdPhoto: multer({
        storage: Upload.uploadIdPhotoStorage,
        fileFilter: Upload.uploadPictureFilter,
        limits: {
            fileSize: parseInt(process.env.UPLOAD_MAX_FILESIZE)
        }
    }),
    uploadProfilePhoto: multer({
        storage: Upload.uploadProfilePhotoStorage,
        fileFilter: Upload.uploadPictureFilter,
        limits: {
            fileSize: parseInt(process.env.UPLOAD_MAX_FILESIZE)
        }
    })
}

module.exports = controller