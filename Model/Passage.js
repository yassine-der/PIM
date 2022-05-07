const mongoose = require('mongoose')


const passageSchema = new mongoose.Schema({
    /*user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
*/
    token: {
        type: String,
        //required: true,
    },
    image_id: {
        type: String,
    },


}, {
    timestamps: true
})

const Passage = mongoose.model('Passage', passageSchema)
module.exports = Passage