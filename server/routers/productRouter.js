const deviceController = require('../controllers/productController')
const {Router} = require("express");
const router = new Router()

router.post('/products',async (req,res) => {
    const product = req.body
    const  result = await deviceController.createProduct(product)
    res.sendStatus(201)
})
router.post('/products/update/:id',async (req,res) => {
    const {id} = req.params
    const product = req.body
    const  result = await deviceController.editProductById(id,product)
    res.sendStatus(201)
})
router.post('/products/delete/:id',async (req,res) => {
    const {id} = req.params
    const product = req.body
    const  result = await deviceController.deleteProductById(id)
    res.sendStatus(201)
})
router.get('/products/category/:category',async (req, res) => {
    const category = req.params.category
    const query = req.query
    // const price = req.params.price ? req.params.price : ''
    const  result = await deviceController.getCategoryProduct(category, query.price, query.color, query.size)
    res.send(result)
})
router.get('/products/:id', async (req, res) => {
    const {id} = req.params
    const  result = await deviceController.getProductById(id)
    res.send(result)
})
router.get('/products-all', async (req, res) => {
    const  result = await deviceController.getAllProduct()
    res.send(result)
})
router.get('/products/small/price/woman', async (req, res) => {
    const  result = await deviceController.getSmallPriceWomanProduct()
    res.send(result)
})
router.get('/products/small/price/man', async (req, res) => {
    const  result = await deviceController.getSmallPriceManProduct()
    res.send(result)
})
router.get('/products/small/count', async (req, res) => {
    const  result = await deviceController.get3Product()
    res.send(result)
})




module.exports = router