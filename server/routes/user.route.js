const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')

router.get('/users', controller.getAllUsers)
router.post('/users', controller.registerUser)
router.post('/users/login', controller.loginUser)
router.put('/users/:id', controller.updateUser)
router.delete('/users', controller.deleteUser)

module.exports = router