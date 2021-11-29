(async () => {
    const express = require('express')
    const app = express();
    const cors = require('cors');
    const router = require('./routers/index')
    const bodyParser = require('body-parser');
    const errorHandler = require('./middleAware/ErrorHandlingMiddlewere')


    app.use(cors());
    // parse application/x-www-form-urlencoded
    // app.use(bodyParser.urlencoded())

// parse application/json
    app.use(bodyParser.json())
    app.use('/', router)
    app.use('/static', express.static('static'));

    // app.get('/customer/:customerId', async (req, res) => {
    //     let conn = await db.getConnection()
    //     console.log(req.params);
    //     let queryStr = `SELECT customer_name FROM customers WHERE customer_id = ${req.params.customerId}`;
    //     const result =  await conn.query(queryStr)
    //      console.log(JSON.parse(JSON.stringify(result)));
    //     res.send(result[0]);
    //
    // });
    // app.get('/products/:category', async (req, res) => {
    //     let conn = await db.getConnection()
    //     console.log(req.params);
    //     category = 'man';
    //     //const result = await conn.query(`SELECT 'customer_name' FROM customers WHERE  'customer_id'= ${req.params.customerId};`)
    //     let queryStr = `SELECT * FROM products WHERE category_name = '${req.params.category}'`;
    //     const result =  await conn.query(queryStr)
    //     console.log(JSON.parse(JSON.stringify(result)));
    //     res.send(result);
    //     //res.sendStatus(200);
    //     //res.end();
    // });





    //Пуляем в самый конец, это разные виды ошибок
    app.use(errorHandler)
    app.listen(3001, () => {
        console.log("yes port 3001 work")
    });
})();