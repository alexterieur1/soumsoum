const express = require('express')
const produitRoute = require('./routes/produit.js')
const produitClient = require('./routes/client.js')
const routeAdmin = require('./routes/admin.js')
const path = require('path')
const session = require('express-session')
const cors = require('cors')


const app = express()
app.use(cors({ origin: 'http://192.168.1.56:3000' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.56:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next();
});

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(session({
  name: 'session',
  secret: process.env.MDPSESSION,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
app.use("/", produitRoute)
app.use("/", produitClient)
app.use("/admin", routeAdmin)
app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(process.env.PORT || 3001, () => console.log(`l'aplication est lancée au port ${process.env.PORT}`))

module.exports = app