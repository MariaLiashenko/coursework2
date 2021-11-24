const mariadb = require('mariadb');
//singletone
let db = undefined;
async function getConnection(){
    if(!db){
        db = await mariadb.createPool({
            user: 'root',
            host: 'localhost',
            password: 'root',
            database: 'online_shop',
        });
    }
    return db.getConnection();
}
module.exports = {
    getConnection
};