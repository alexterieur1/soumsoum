const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: 'milleetunemerveilles'
})
exports.inscription = (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté !')
        console.log(req.body)
        const hash = await bcrypt.hash(req.body.motDePasse, 8)
        var sql = `INSERT INTO client (idClient, motDePasse, nom, prenom, adresse, mail, tel, annee, mois, jours) VALUES ('${req.body.idClient}', '${hash}', '${req.body.nom}', '${req.body.prenom}', '${req.body.adresse}', '${req.body.mail}', '${req.body.tel}', '${req.body.annee}', '${req.body.mois}', '${req.body.jours}')`
        con.query(sql, (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' } )
            }
            try {
                return res.status(200).json(sql)
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}
exports.connexion = async (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté ! connexion')
        var sql = `SELECT * from client WHERE mail='${req.body.mail}'`
        con.query(sql, async (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                const MDP = await bcrypt.compare(req.body.password, result[0].motDepasse)
                if (!MDP) {
                    return res.status(401).json({ message: `error authentification` })
                }
                else {
                    let jwtClient = {
                        idClient: result[0].idClient,
                        Mail: result[0].mail,
                        token: jwt.sign(
                            { idClient: result[0].idClient,
                            mail: result[0].mail },
                            process.env.PHRASECRYPT,
                            { expiresIn: '24h' }
                        )
                    }
                    req.session.token = jwtClient.token
                    //console.log(req.sessionID)
                    //console.log('cookie endessous')
                    //console.log(req.headers.cookie.split('=')[1])
                    //console.log('cookie audessus')
                    return res.status(200).json(/*req.session.token.split('.')[1]*/req.sessionID)
                }
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}
exports.informationClient = async (req, res) => {
    //console.log(req.sessionID)
    console.log(req.auth.token.mail)
    console.log('information client')
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté !')
        var sql = `SELECT nom, prenom, adresse, codePostale, ville, mail, tel, annee, mois, jours from client WHERE mail='${req.auth.token.mail}'`
        con.query(sql, async (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                console.log(result)
                return res.status(200).json(result)
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}