const mongoose = require('mongoose')


const patchSchema = new mongoose.Schema({
    /*user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
*/
    image: {
        type: String,
        required: true,
    },
    corX: {
        type: String,

    },
    corY: {
        type: String,
    },
    date: {
        type: String,
        //required: true,

    },
    nom: {
        type: String,
        //required: true,

    },
    description: {
        type: String,
        //required: true,

    },


}, {
    timestamps: true
})

const Patch = mongoose.model('Patch', patchSchema)
module.exports = Patch