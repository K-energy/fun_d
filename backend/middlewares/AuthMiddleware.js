'use strict'

const expressJwt = require('express-jwt')
const jwtDecode = require('jwt-decode');
const dotenv = require('dotenv')

dotenv.config()

const Auth = {

    authenticate: expressJwt({
        secret: process.env.JWT_SECRET,
        getToken: (req) => {
            if (req.headers.authorization) {
                req.auth = jwtDecode(req.headers.authorization)
                return req.headers.authorization
            }
            return null
        }
    })
}

module.exports = Auth