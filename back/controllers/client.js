const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


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
        let idClient = Date.now()
        const hash = await bcrypt.hash(req.body.motDePasse, 8)
        var sql = `INSERT INTO client (idClient, motDePasse, nom, prenom, adresse, codePostale, ville, mail, tel, annee, mois, jours) VALUES ('${idClient}', '${hash}', '${req.body.nom}', '${req.body.prenom}', '${req.body.adresse}', '${req.body.codePostale}', '${req.body.ville}', '${req.body.mail}', '${req.body.tel}', '${req.body.annee}', '${req.body.mois}', '${req.body.jours}')`
        con.query(sql, (err, result, fields) => {
            if (err) {
                return res.status(500).json({ err, message: 'bad request' })
            }
            try {
                let jwtClient = {
                    idClient: idClient,
                    Mail: req.body.mail,
                    token: jwt.sign(
                        {
                            idClient: idClient,
                            mail: req.body.mail
                        },
                        process.env.PHRASECRYPT,
                        { expiresIn: '24h' }
                    )
                }
                req.session.token = jwtClient.token
                return res.status(200).json(req.sessionID)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })
}

exports.connexion = async (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté !')
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
                            {
                                idClient: result[0].idClient,
                                mail: result[0].mail
                            },
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
    console.log(req.auth.token.mail)
    console.log('information client')
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté !')
        var sql = `SELECT nom, prenom, adresse, codePostale, ville, mail, tel, annee, mois, jours, verifier from client WHERE mail='${req.auth.token.mail}'`
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

exports.deconnexion = (req, res) => {
    req.session.destroy()
    console.log(req)
    return res.status(200).json()
}

exports.mailVerification = (req, res) => {
    const transporter = nodemailer.createTransport({
        pool: true,
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.authUser,
            pass: process.env.authPass,
        },
        tls: {
            rejectUnauthorized: true,
        }
    });

    const mailOptions = {
        from: 'mille et une merveilles <noreply@milleetunemerveilles.com>',
        to: `alexandrerichard45@sfr.fr`,
        subject: 'test avec ovh',
        text: 'This email was sent with Nodejs and nodemailer using gmail SMTP server',
        html: "<p>merci beaucoup pour votre commande !</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            return res.status(500).json(error)
        } else {
            console.log(info)
            return res.status(200).json(info)
        }
    });
}