const { Pool, Connection } = require("pg")
require("dotenv").config()

const pool = new Pool({
    connectionString: process.env.COCKROACH_DB_STRING,
    max: 30
})

async function setupDB(){
    try {
        let result = await pool.query("CREATE TABLE IF NOT EXISTS users(user_email TEXT PRIMARY KEY, user_password text NOT NULL, added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        console.log("Data base setup initiated a user table creation successfully.")
        // console.log(result)
        
        result = await pool.query("CREATE TABLE IF NOT EXISTS messages(message_id SERIAL PRIMARY KEY, sender TEXT NOT NULL, receiver TEXT NOT NULL, text_message TEXT,is_deleted BOOL DEFAULT FALSE, sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        console.log("Data base setup initiated a messages table creation successfully.")
        // console.log(result)
    } catch (err) {
        console.log("Database table creation failed : ", err)
    }
}

async function check_DB_connection(){
    try {
        let command = "SELECT 1"
        let res = await pool.query(command)
        // console.log(res)
        console.log("cockroach db connected successfully")
    } catch (error) {
        console.log("cockroach db connection failed : ", error)
    }
}

setupDB()
check_DB_connection()

module.exports = pool