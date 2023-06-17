const express = require('express')
const Session = require('express-session')
const app = express()
require('dotenv').config()


module.exports = (req, res, next) => {
    console.log(req.headers)
    console.log(req.sessionStore.sessions)
    console.log(req.sessionID)
    req.sessionStore.get(req.headers.id, (error, session)=>{
        if (error){
            console.log('erreur')
            return
        }
        if (!session){
            console.log('session non trouvé')
            app.use(Session({
                secret: process.env.MDPSESION,
                resave: false,
                saveUninitialized: true
            }))
            console.log(req.sessionID)
            console.log('session créée')
            next()
        }
        if(session){
            console.log('session trouvée')
            next()
        }
    })
}