'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const Schema = mongoose.Schema

const SALT_WORK_FACTOR = 10
dotenv.config()

const UserTransform = (doc, ret) => {
    ret.userInfo.profilePhoto = ret.userInfo.hasOwnProperty('profilePhoto') ? process.env.REMOTE_PATH_PROFILE + ret.userInfo.profilePhoto : null
    delete ret.__v
    delete ret.password
}

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    userInfo: {
        firstname: {
            type: String,
            trim: true,
            required: true
        },
        lastname: {
            type: String,
            trim: true,
            required: true
        },
        birthdate: {
            type: Date,
            required: true
        },
        address : {
            type : String,
            required : true
        },
        mobileno: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            sparse: true,
            validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        creditcard: {
            cardNumber: {
                type: String,
            },
            expDate: {
                type: Date,
            },
            CVV: {
                type: String,
            }
        },
        facebook: {
            type: String,
        },
        lineID: {
            type: String,
        },
        profilePhoto: {
            type: String
        }
    }
}, {
    timestamps: true,
    collection: 'users',
    toObject: {
        transform: UserTransform
    },
    toJSON: {
        transform: UserTransform
    }
})

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (e) {
        throw (e)
    }
};

const User = mongoose.model('User', UserSchema)

module.exports = User