const {Router} = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

// const brandRouter = require('./brandRouter')
// const typeRouter = require('./typeRouter')



router.use('/',userRouter)
router.use('/',basketRouter)
// router.use('/brand',brandRouter)
router.use('/',productRouter)


module.exports = router