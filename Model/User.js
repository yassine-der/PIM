const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    /*
    patchs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patch'
    }],
*/

}, {
    timestamps: true
})
userSchema.methods.matchPassword = async function(passwordentrer) {
    return await bcrypt.compare(passwordentrer, this.password)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const slat = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, slat)
})

const User = mongoose.model('User', userSchema)
module.exports = User