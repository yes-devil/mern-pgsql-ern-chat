const { Pool, Connection } = require("pg")
require("dotenv").config()

const pool = new Pool({
    connectionString: process.env.COCKROACH_DB_STRING,
    max: 30
})

async function check_DB_connection(){
    try {
        let command = "SELECT 1"
        let res = await pool.query(command)
        console.log(res)
        console.log("cockroach db connected successfully")
    } catch (error) {
        console.log("cockroach db connection failed : ", error)
    }
}

check_DB_connection()

module.exports = pool