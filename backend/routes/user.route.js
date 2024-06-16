const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')
const auth = require('../middleware/auth')

router.post('/', controller.register)
router.post('/:id', controller.login)
router.delete('/:email', auth, controller.deleteUser)

module.exports = router