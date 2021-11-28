const db = require('../db')

async function createOrder(data){
    let products = data.products;
    let user = data.userData;


    let conn = await db.getConnection();
    await conn.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await conn.beginTransaction();
    try {
        let queryUser = `INSERT INTO customers (customer_name,customer_sex,customer_phone, customer_email, customer_address)
        VALUES (?,?,?,?,?);`;
        const [userid] = await conn.execute(queryUser, [user.name, user.sex, user.phone, user.email, user.address]);

        let queryOrder = `INSERT INTO orders (customer_id) VALUES (?)`;
        const [orderid] = await conn.execute(queryOrder, [userid]);

        console.log(`Order created`);

        let queryProduct = `INSERT INTO order_item (order_id, product_id, price) VALUES (?,?,?)`;
        let values = [];
        let pids = [];
        for (const product of products) {
            values.push([orderid, product['product_id'], product.price]);
            pids.push(product['product_id']);
        }
        await conn.execute(queryProduct, [values]);
        await conn.execute(
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

    return true;

}
module.exports =  {
    createOrder
}