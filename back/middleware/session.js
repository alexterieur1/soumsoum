const express = require('express')
const Session = require('express-session')
const app = express()
require('dotenv').config()


module.exports = (req, res, next) => {
    req.sessionStore.get(req.headers.id, (error, session)=>{
        if (error){
            return
        }
        if (!session){
            app.use(Session({
                secret: process.env.MDPSESION,
                resave: false,
                saveUninitialized: true
            }))
            next()
        }
        if(session){
            next()
        }
    })
}