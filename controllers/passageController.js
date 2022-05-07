const AsyncHandler = require('express-async-handler')
const Passage = require('../Model/Passage')
const { generateToken } = require('../utils/genreateToken')
const nodemailer = require('nodemailer')


const addPassage = AsyncHandler(async(req, res) => {
    const { token, image_id } = req.body


    const passage = await Passage.create({
        //image: req.file.path,
        token,
        image_id,
    })

    if (passage) {
        res.status(201).json(passage)

    } else {
        res.status(400)
        throw new Error('invalid passage data')
    }
})


const updatePassage = AsyncHandler(async(req, res) => {
    const passage = await Passage.findById(req.params.id)

    if (passage) {
        passage.image_id = req.body.image_id || passage.image_id
        passage.token = req.body.token || passage.token

        const updatePassage = await passage.save()

        res.status(201).json(updatePassage)
    } else {
        res.status(404)
        throw new Error('Passage not found')
    }
})

const getPassageById = AsyncHandler(async(req, res) => {
    const passage = await Passage.findById(req.params.id)
    if (passage) {
        res.status(201).json(passage)
    } else {
        res.status(404)
        throw new Error('Passage not found')
    }

})


module.exports = { addPassage, updatePassage, getPassageById }