const AsyncHandler = require('express-async-handler')
const User = require('../Model/User')
const { generateToken } = require('../utils/genreateToken')
const nodemailer = require('nodemailer')

const authUser = AsyncHandler(async(req, res) => {
    const { userName, password } = req.body

    const user = await User.findOne({ userName })

    if (user && (await user.matchPassword(password))) { //&& user.isVerified == true){
        res.json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            userName: user.userName,
            token: generateToken(user._id)


        })
    } else {
        res.status(401)
        throw new Error('userName ou mot de passe n est pas valide ou compte non valide')

    }
})
const getuserProfile = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})


const registerUser = AsyncHandler(async(req, res) => {
    const { nom, prenom, userName, password } = req.body

    const userExist = await User.findOne({ userName })

    if (userExist) {
        res.status(400)
        throw new Error('user Aleardy exists')
    }

    const user = await User.create({
        //image: req.file.path,
        nom,
        prenom,
        userName,
        password,
    })

    if (user) {
        res.status(201).json(user)

    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

const updateUserProfile = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.nom = req.body.nom || user.nom
        user.prenom = req.body.prenom || user.prenom
        user.userName = req.body.userName || user.userName
        if (req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.status(201).json(updateUser)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})
const getusers = AsyncHandler(async(req, res) => {
    const users = await User.find({})

    res.json(users)
})
const deleteUser = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'user removed' })

    } else {
        res.status(404)
        throw new Error('user not found')
    }

})
const getUserById = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

const updateUser = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.nom = req.body.nom || user.nom
        user.prenom = req.body.prenom || user.prenom
        user.userName = req.body.userName || user.userName
        if (req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json(updateUser)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})
const googleLogin = AsyncHandler(async(req, res) => {
    const user = await User.findOne(req.body.userName)
    if (user) {
        res.json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            userName: user.userName,
            token: generateToken(user._id)

        })
    } else {

        const user = await User.create({
            photo: "",
            nom: req.body.nom,
            prenom: req.body.prenom,
            userName: req.body.userName,
            password: req.body.password,
            token: generateToken(user._id)
        })
    }
})

module.exports = {
    authUser,
    getuserProfile,
    registerUser,
    updateUserProfile,
    getusers,
    deleteUser,
    getUserById,
    updateUser,
    googleLogin,
    //verifEmail
}