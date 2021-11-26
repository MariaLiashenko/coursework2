const db = require('../db')

    async function createProduct(productName, brandName, categoryName, modelYear, colorProduct, countSize, sizeProduct, priceProduct, imageProduct){
        let conn = await db.getConnection()
        let queryStr = `INSERT INTO products (product_name, brand_name, category_name, model_year, color, count_size, size, price, image)
        VALUES ('${productName}', '${brandName}', '${categoryName}, '${modelYear}', 
        '${colorProduct}', '${countSize}', '${sizeProduct}', '${priceProduct}','${imageProduct}' );`;
        // let queryStr = `SELECT * FROM products WHERE category_name = '${product}'`;
        const result =  await conn.query(queryStr)
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

    async function getProductById(id){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE product_id = '${id}'`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        conn.release()
        return result

    }
    //сортировка по цене по возрастанию
    async function getProductByPrice(category){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE category_name = '${category}'ORDER BY price`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        return result

    }
    // сортировка по цене по убыванию
    async function getProductByPriceDESC(category){
        let conn = await db.getConnection()
        let queryStr = `SELECT * FROM products WHERE category_name = '${category}'ORDER BY price DESC`;
        const result =  await conn.query(queryStr)
        console.log(JSON.parse(JSON.stringify(result)));
        return result

    }

module.exports =  {
    createProduct,
    getCategoryProduct,
    getProductById
};