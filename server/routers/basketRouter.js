const basketController = require('../controllers/basketController')
const {Router} = require("express");
const router = new Router()

router.post('/basket',async (req,res) => {
    const data = req.body
    const  result = await basketController.main(data)
    res.sendStatus(201)
})
module.exports = router