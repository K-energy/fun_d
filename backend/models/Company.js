
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const CompanySchema = new Schema({
    title: {
        type: String,
    },
    image: [{
        type: String,
    }],
    description:{
        type: String,
    },
    link:{
        type: String,
    },
    sponsor_edu:{
        type: Number,
    },
    sponsor_bus:{
        type: Number,
    },
    sponsor_health:{
        type: Number,
    },
    sponsor_others:{
        type: Number,
    },
    involved_projects:[{
        type: ObjectID,
    }]    
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company