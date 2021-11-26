const deviceController = require('../controllers/productController')
const {Router} = require("express");
const router = new Router()

router.post('/',async (req,res) => {
    const product = req.body
    const  result = await deviceController.createProduct(product)
    res.sendStatus(201)
})
router.get('/category/:category',async (req, res) => {
    const category = req.params.category
    const query = req.query

    // const price = req.params.price ? req.params.price : ''
    const  result = await deviceController.getCategoryProduct(category, query.price, query.color, query.size)
    res.send(result)
})
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const  result = await deviceController.getProductById(id)
    res.send(result)
})




module.exports = router