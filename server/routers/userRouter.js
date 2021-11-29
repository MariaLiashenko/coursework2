// const Router = require("express");
// const router = new Router()

// router.post('/registration',userController.registration)
// router.post('/login',userController.login)
// router.get('/auth', userController.check)
const userController = require('../controllers/userController')
// const deviceController = require('../controllers/productController')
const {Router} = require("express");
const router = new Router()

router.post('/user',async (req,res) => {
    const user = req.body
    const  result = await userController.admin(user)
    res.sendStatus(201)
})

router.post('/user/admin', async (req, res) => {
    const admin = req.body
    const  result = await userController.admin(admin)
    res.send(result)
})
module.exports = router
