var express = require('express');
var router = express.Router();



const { addPassage, updatePassage, getPassageById } = require('../controllers/passageController')
const { protect } = require('../middlware/authmiddlware')


router.route('/').post(addPassage)
router.route('/:id').put(updatePassage)
router.route('/:id').get(getPassageById)

module.exports = router