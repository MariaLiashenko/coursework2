(async () => {
    const express = require('express')
    const app = express();
    const cors = require('cors');

    const mariadb = require('mariadb');
// SELECT `customer_id`, `customer_name`, `customer_sex`, `customer_phone`, `customer_email`, `customer_address`, `order_id` FROM `online_shop`.`customers` WHERE  `customer_id`=1;
    const db = await mariadb.createPool({
        user: 'root',
        host: 'localhost',
        password: 'root',
        database: 'online_shop',
    });
    app.use(cors({
        origin: '*'
    }));
    app.get('/customer/:customerId', async (req, res) => {
        let conn = await db.getConnection()
        console.log(req.params);
        //const result = await conn.query(`SELECT 'customer_name' FROM customers WHERE  'customer_id'= ${req.params.customerId};`)
        let queryStr = `SELECT customer_name FROM customers WHERE customer_id = ${req.params.customerId}`;
        //const result =  await conn.query(queryStr).then(
        //    (result) => {
        //        console.log(result[0]);
        //        let w = 0;
        //    }
        //)
        const result =  await conn.query(queryStr)
         console.log(JSON.parse(JSON.stringify(result)));
        res.send(result[0]);
        //res.sendStatus(200);
        //res.end();
    });
    app.get('/products/:category', async (req, res) => {
        let conn = await db.getConnection()
        console.log(req.params);
        category = 'man';
        //const result = await conn.query(`SELECT 'customer_name' FROM customers WHERE  'customer_id'= ${req.params.customerId};`)
        let queryStr = `SELECT * FROM products WHERE category_name = '${req.params.category}'`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(result);
        //res.sendStatus(200);
        //res.end();
    });


    app.listen(3001, () => {
        console.log("yes port 3001 work")
    });
})();