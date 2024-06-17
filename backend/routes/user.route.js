const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')
const auth = require('../middleware/auth')

router.post('/', controller.registerUser)
router.post('/:email', controller.loginUser)
router.put('/', auth, controller.updateUser)
router.delete('/:email', auth, controller.deleteUser)

module.exports = router