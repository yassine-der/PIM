const AsyncHandler = require('express-async-handler')
const Patch = require('../Model/Patch')
const { spawn } = require('child_process')
const { PythonShell } = require('python-shell')
const { argv } = require('process')
const fs = require('fs')

const addImage = AsyncHandler(async(req, res) => {
    const imageOfPatch = await Patch.create({
        image: req.file.path,
        //user: req.user._id,

    })
    const imageCreated = await imageOfPatch.save()
    res.status(201).json(imageCreated._id)

})

const getMyImages = AsyncHandler(async(res, req) => {
    const my = await Patch.find({ user: req.user._id })
    res.json(my)

})
const pythonFun = AsyncHandler(async(req, res) => {
    let data1;
    const patch = await Patch.findById(req.params.id)
    if (patch) {
        //console.log(patch.image)
        const pythonScript = await spawn('python', ['contour.py', patch.image])
        pythonScript.stdout.on('data', (data) => {

            data1 = data.toString();


        })

        pythonScript.on('close', (code) => {
                console.log("code", code)
                    //res.send(data1)

            })
            //res.send(data1)

        fs.readFile('cordonne.txt', 'utf8', async(err, url) => {
                if (err) {
                    console.error(err)
                    return
                }
                patch.corX = url
                fs.readFile('cordonneY.txt', 'utf8', async(err, url) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    patch.corY = url

                    const updatePatch = await patch.save()

                    res.status(201).json({ updatePatch })

                })

            })
            /*
                    fs.readFile('contourName.txt', 'utf8', async(err, url) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        console.log(url)
                        patch.image = url

                    })
                    */


    } else {
        res.status(404)
        throw new Error('Patch not found')
    }

})
const pythonFun2 = AsyncHandler(async(req, res) => {
    let data1;
    const patch = await Patch.findById(req.params.id)
    if (patch) {
        //console.log(patch.image)
        const pythonScript = spawn('python', ['contour.py', patch.image])
        pythonScript.stdout.on('data', (data) => {
            //console.log(patch.image)

            data1 = data.toString();

        })

        pythonScript.on('close', (code) => {
            console.log("code", code)
                //res.send(data1)

        })
        res.send(data1)

    } else {
        res.status(404)
        throw new Error('Patch not found')
    }

})
const pythonFun1 = AsyncHandler(async(req, res) => {
    let data1;
    const patch = await Patch.findById(req.params.id)
    if (patch) {
        let options = {
            scriptPath: "C:/Users/yassine derbel/Desktop/back-pim-server/pim",
            args: [patch.image]
        };
        PythonShell.run("contour.py", options, (err, res) => {
            if (err) console.log(err);
            if (res) console.log(res);
        })
    } else {
        res.status(404)
        throw new Error('Patch not found')
    }

})
const getImageById = AsyncHandler(async(req, res) => {
    const patch = await Patch.findById(req.params.id)
    if (patch) {
        res.status(201).json(patch)
    } else {
        res.status(404)
        throw new Error('Patch not found')
    }

})

module.exports = { addImage, pythonFun, getImageById, getMyImages }