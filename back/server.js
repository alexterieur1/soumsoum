const express = require('express')
const mysql = require('mysql2')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use(express.urlencoded({ extented: false }))

require('dotenv').config()


var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'mydb'
})



app.get('/', (req, res) => {
    var sql = "SELECT * from customers LIMIT 10";
    pool.query(sql, async function (err, result) {
        if (err) throw err;
        await res.send(result)
    });
})
app.listen(process.env.PORT || 3000, () => console.log(`l'aplication est lancée au port ${process.env.PORT}`))

module.exports = app