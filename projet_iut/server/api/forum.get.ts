import mysql from "mysql2/promise";
import bluebird from "bluebird";

export default defineEventHandler(async (event) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "myForums",
        Promise: bluebird
    });  
    
    const [rows, fields] = await connection.execute("SELECT * FROM Forums");    

    return {
        forums: rows,
        statusCode:200
    };

})