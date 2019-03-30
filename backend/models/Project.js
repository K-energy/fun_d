'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const ProjectSchema = new Schema({
    title: {
        type: String,
    },
    tags:[{
        type:String
    }],
    description:{
        type: String,
    },
    contributors:[{
        type: ObjectID,
    }],
    current_money:{
        type: Number,
    },
    goal:{
        type: Number,
    },
    members:[{
        type: String,
    }],
    time_window:{
        type: String,
    },
    image:{
        type: String,
    },
    location:{
        type: String,
    }
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project