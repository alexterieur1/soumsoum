const express = require('express')
const session = require('express-session')
const app = express()
require('dotenv').config()


module.exports = (req, res, next) => {
    app.use(session({
        secret: process.env.MDPSESION,
        resave: false,
        saveUninitialized: true
    }))
    console.log(req.sessionStore.sessions)
    next()
}