const pool = require("./db-connection.js");

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("DB connection error:", err);
    } else {
        console.log("DB connected successfully:", res.rows);

        console.log("Server time:", res.rows[0]);
    
    }
    pool.end();
});