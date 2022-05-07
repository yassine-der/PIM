var express = require('express');
var router = express.Router();

const multer = require('multer')
const path = require('path')


const storage1 = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {

        cb(null, `${file.fildname}-${Date.now()}${path.extname("./uploads/contoureImage.jpg")}`)
    }
})
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fildname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
const upload1 = multer({
    storage: storage1,
    fileFilter: fileFilter
})

const { addImage, pythonFun, getImageById, getPatch } = require('../controllers/patchController')
const { protect } = require('../middlware/authmiddlware')


router.route('/').post(upload.single('image'), addImage).get(getPatch)
router.route('/:id').put(upload1.single('image'), pythonFun)
router.route('/:id').get(getImageById)
    //router.route('/lala').get(protect, pythonFun)
    //.put(protect, ProprietaireDeStade, addLigueToStade)

module.exports = router