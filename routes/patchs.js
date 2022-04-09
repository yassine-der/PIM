var express = require('express');
var router = express.Router();

const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fildname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

const { addImage, pythonFun, getImageById, getMyImages } = require('../controllers/patchController')
const { protect } = require('../middlware/authmiddlware')


router.route('/').post(protect, upload.single('image'), addImage).get(getMyImages)
router.route('/:id').put(protect, pythonFun)
    //router.route('/lala').get(protect, pythonFun)
    //.put(protect, ProprietaireDeStade, addLigueToStade)

module.exports = router