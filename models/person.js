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
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        maxlength: 31,
        validate: {
            validator: function(v){
                return /^[0-9]{2,3}-[0-9]{4,}$/.test(v);
            },
            message: props => `${props.value} is not a valid number`
        },
        required: [true, 'number required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
