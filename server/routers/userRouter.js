// const Router = require("express");
// const router = new Router()

// router.post('/registration',userController.registration)
// router.post('/login',userController.login)
// router.get('/auth', userController.check)
const userController = require('../controllers/userController')
const deviceController = require('../controllers/productController')
const {Router} = require("express");
const router = new Router()

router.post('/',async (req,res) => {
    const user = req.body
    const  result = await userController.createUser(user)
    res.sendStatus(201)
})
router.get('/admin', async (req, res) => {
    const {adminPassword} = req.params
    const {adminLogin} = req.params
    const  result = await deviceController.getProductById(adminPassword,adminLogin)
    res.send(result)
})




module.exports = router




module.exports = router