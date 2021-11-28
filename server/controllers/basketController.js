const db = require('../db')

async function main(data){
    let products = data.products;
    let user = data.userData;


    let conn = await db.getConnection();

    await conn.beginTransaction();
    try {
        let queryUser = `INSERT INTO customers (customer_name,customer_sex,customer_phone, customer_email, customer_address)
        VALUES (?,?,?,?,?);`;

        const userResponse = await conn.query(queryUser, [user.name, user.sex, user.phone, user.email, user.address]);
        const userid = await userResponse.insertId;
        let queryOrder = `INSERT INTO orders (customer_id) VALUES (?)`;
        const ordersResponse = await conn.query(queryOrder, [userid]);
        const orderid = await ordersResponse.insertId
        console.log(`Order created`);

        let values = [];
        let pids = [];
        for (const product of products) {
            values.push([orderid, product.pid, product.price]);
            pids.push(product.pid);
        }
        let queryProduct = `INSERT INTO order_item (order_id, product_id, price) VALUES (?,?,?)`;
        for (const value of values) {
            await conn.query(queryProduct, value);
        }

        await conn.query(
            `UPDATE products SET count_size=count_size - 1 WHERE product_id IN (?)`,
            pids
        );
        await conn.commit();
        conn.release()
    } catch (err) {
        console.error(`Error occurred while creating order: ${err.message}`, err);
        conn.rollback();
        console.info('Rollback successful');
        return false;
    }
}



module.exports =  {
    main
}