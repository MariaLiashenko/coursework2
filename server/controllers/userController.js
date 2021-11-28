const db = require('../db')

async function createUser(customerName,customerSex,customerPhone, customerEmail, customerAddress){
    let conn = await db.getConnection()
    let queryStr = `INSERT INTO customers (customer_name,customer_sex,customer_phone, customer_email, customer_address)
        VALUES ('${customerName}', '${customerSex}', '${customerPhone}, '${customerEmail}', 
        '${customerAddress}');`;
    // let queryStr = `SELECT * FROM products WHERE category_name = '${product}'`;
    const result =  await conn.query(queryStr)
    console.log(JSON.parse(JSON.stringify(result)));
    return result;

}
async function admin (adminPassword,adminLogin){
    let conn = await db.getConnection()
    //`SELECT * FROM products WHERE product_id = '${id}'`
    let queryStr = `SELECT admin WHERE admin_password = '${adminPassword}' AND admin_login = '${adminLogin}'`;
    const result =  await conn.query(queryStr)
    console.log(JSON.parse(JSON.stringify(result)));
    if (result){
        return true;
    }
    return false;

}
async function checkUser(customerId,customerName,customerSex,customerPhone, customerEmail, customerAddress){
    let conn = await db.getConnection()
    let queryStr = `UPDATE users SET customer_name = '${customerName}',customer_sex='${customerSex}'
    ,customer_phone = '${customerPhone}, customer_email='${customerEmail}', customer_address='${customerAddress}'
        WHERE customer_id = '${customerId}'`;
    const result =  await conn.query(queryStr)
    console.log(JSON.parse(JSON.stringify(result)));
    return result;

}



module.exports =  {
    createUser,
    admin
};