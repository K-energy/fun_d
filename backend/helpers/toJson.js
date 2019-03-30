'use strict'

const toJSON = (obj) => {
    return {
        json: JSON.parse(JSON.stringify(obj)),
        string: obj.toString()
    }
}

module.exports = { toJSON }