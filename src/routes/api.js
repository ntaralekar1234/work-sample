const express = require('express')
const auth = require('../middleware/auth')
const {register,adminregister} = require('../controllers/Auth/RegisterController')
const {login,logout} = require('../controllers/Auth/LoginController')
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')


const router = new express.Router()

router.post('/register', register)
router.post('/admin', adminregister)
router.post('/login', login)
router.post('/logout', auth, logout)

router.get('/users', auth, UserController.getusers)
router.patch('/users/:id', auth, UserController.updatedetails)

router.get('/products', auth, ProductController.products)
router.post('/product', auth, ProductController.newproduct)
router.patch('/product/:id', auth, ProductController.updateproduct)
router.delete('/product/:id', auth, ProductController.removeproduct)

module.exports = router