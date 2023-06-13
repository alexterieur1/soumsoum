const express = require('express')
const produitRoute = require('./routes/produit.js')
const produitClient = require('./routes/client.js')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extented: false }))

app.use(session({
  name: 'session',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
app.use("/", produitRoute)
app.use("/", produitClient)
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cookieParser())
app.get('/set-cookie', (req, res) => {
  res.cookie('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6IjAxMjM0NTY3ODkiLCJtYWlsIjoiYWxleGFuZHJlcmljaGFyZDQ1QHNmci5mciIsImlhdCI6MTY4NjA0MTQ0NywiZXhwIjoxNjg2MDQ1MDQ3fQ.DN3-b7qzQ9DZ1VRFojNa4c2WJo9ll7u18DJDWq3xbZ0', { maxAge: 3600000, httpOnly: true });
  console.log(req.cookies)
  res.send('Cookie JWT enregistré avec succès');
})



app.listen(process.env.PORT || 3001, () => console.log(`l'aplication est lancée au port ${process.env.PORT}`))

module.exports = app