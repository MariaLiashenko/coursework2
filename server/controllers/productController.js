const db = require('../db')

    async function createProduct(product){
        let conn = await db.getConnection()
        let queryStr = `INSERT INTO products (product_name, brand_name, category_name, model_year, color, count_size, size, price, image)
        VALUES (?,?,?,?,?,?,?,?,?)`;
        // let queryStr = `SELECT * FROM products WHERE category_name = '${product}'`;
        let values = [product.name,product.brand, product.sex,product.year,product.color,product.countSize,product.size,product.price,product.img];
        const result =  await conn.query(queryStr, values)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result;

    }
    async function getCategoryProduct(category, price='', color = '', size = ''){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE category_name = '${category}'`;

        if (color) {
            queryStr += `AND color = '${color}'`
        }

        if (size) {
            queryStr += `AND size = '${size}'`
        }

        if (price === 'desc') {
            queryStr += `ORDER BY price DESC`
        } else if (price === 'asc') {
            queryStr += `ORDER BY price`
        }

        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result;
    }
    async function getAllProduct(){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products `;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }
    async function get3Product(){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE count_size < 4`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }
    async function getSmallPriceWomanProduct(){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE category_name = 'woman' ORDER BY price`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }
    async function getSmallPriceManProduct(){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE category_name = 'man' ORDER BY price`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }
    //UPDATE Ts SET points = 80 WHERE task_num = 5;
    async function editProductById(id , product){
        let conn = await db.getConnection()
        let queryStr = `UPDATE products SET product_name =?, brand_name=?, category_name=?, model_year=?, color=?, count_size=?, size=?, price=?, image=? 
        WHERE product_id = ?`;
        let values = [product.name,product.brand, product.sex,product.year,product.color,product.countSize,product.size,product.price,product.img, id];
        const result =  await conn.query(queryStr, values)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }
    async function deleteProductById(id){
        //DELETE t1,t2 FROM t1,t2,t3 WHERE t1.id=t2.id AND t2.id=t3.id
        //`DELETE FROM todos WHERE id = ?`;
        let conn = await db.getConnection()
        let queryStr = `DELETE FROM products WHERE product_id = ?`;
        // let values = [product.name,product.brand, product.sex,product.year,product.color,product.countSize,product.size,product.price,product.img, id];
        const result =  await conn.query(queryStr, id)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }
    async function getProductById(id){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE product_id = '${id}'`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }


module.exports =  {
    createProduct,
    getCategoryProduct,
    getProductById,
    getAllProduct,
    editProductById,
    deleteProductById,
    get3Product,
    getSmallPriceWomanProduct,
    getSmallPriceManProduct
};