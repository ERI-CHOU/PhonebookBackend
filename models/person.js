const mongoose = require('mongoose')

const url = process.env.MONGOOB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('conneted to MoogoBD')
    })
    .catch(error => {
        console.log('error connecting to MongDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Person', personSchema)
