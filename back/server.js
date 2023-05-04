const express = require('express')
const produitRoute = require('./routes/client.js')
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

app.use("/", produitRoute)

require('dotenv').config()


app.listen(process.env.PORT || 3000, () => console.log(`l'aplication est lancée au port ${process.env.PORT}`))

module.exports = app