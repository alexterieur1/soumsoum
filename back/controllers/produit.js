const mysql = require('mysql2')
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: 'milleetunemerveilles'
})

exports.affichageAllProduit = async (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        console.log('connecté !')
        console.log(req.body)
        var sql = "SELECT * FROM produits JOIN photoproduits ON produits.idProduit=photoproduits.idProduit JOIN stockproduits ON produits.idProduit=stockproduits.idProduit"
        con.query(sql, (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                return res.status(200).json(result)
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}
exports.affichageUnProduit = async (req, res) => {
    console.log(req.params)
    con.connect((err) => {
        if (err) throw err;
        console.log('connecté !')
        var sql = `SELECT * FROM produits JOIN photoproduits ON produits.idProduit=photoproduits.idProduit JOIN stockproduits ON produits.idProduit=stockproduits.idProduit WHERE produits.idProduit = ${req.params.id}`
        con.query(sql, (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                return res.status(200).json(result)
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}
exports.creation = (req, res) => {
    console.log(req.headers)
    console.log(req.auth)
    console.log(req.body)
    console.log(typeof (Number(req.body.xs)))
    con.connect((err) => {
        if (err) throw err;
        console.log('connecté !')
        var sql = `INSERT INTO produits (nomProduit, descriptionProduit, idProduit, prix) VALUES ('${req.body.nomProduit}', '${req.body.descriptionProduit}', '${req.body.idProduit}', '${req.body.prix}')`
        console.log(sql)
        con.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'bad request produit' })
            }
            try {
                var sql = `INSERT INTO stockproduits (idProduit, xs, s, sm, m, ml, l, lxl, xl) VALUES ('${req.body.idProduit}',${Number(req.body.xs)},${Number(req.body.s)},${Number(req.body.sm)},${Number(req.body.m)},${Number(req.body.ml)},${Number(req.body.l)},${Number(req.body.lxl)},${Number(req.body.xl)})`
                console.log(sql)
                con.query(sql, (err, result, fields) => {
                    if (err) {
                        return res.status(500).json({ message: 'bad request stock' })
                    }
                    try {
                        var sql = `INSERT INTO photoproduits (liens, idProduit) VALUES ('${req.protocol}://${req.get('host')}/images/${req.file.filename}', '${req.body.idProduit}')`
                        console.log(sql)
                        con.query(sql, (err, result, fields) => {
                            if (err) {
                                return res.status(500).json({ message: 'bad request image' })
                            }
                            try {
                                return res.status(200).json({ message: 'enregistrement image réussi !' })
                            }
                            catch (err) {
                                return res.status(400).json({ err })
                            }
                        })
                    }
                    catch (err) {
                        return res.status(400).json({ err })
                    }
                })
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}
exports.panier = (req, res) => {
    console.log(req.auth)
    var sql = "SELECT prix, nomProduit, liens, quantite, taille FROM panier JOIN photoproduits ON panier.idProduit=photoproduits.idProduit JOIN produits ON panier.idProduit=produits.idProduit"
    con.query(sql, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ message: 'bad request' })
        }
        try {
            return res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json({ err })
        }
    })
}
exports.addPanier = (req, res) => {
    console.log(req.body)
    let sql = `INSERT INTO panier (idProduit, idClient, quantite, taille) VALUES (${req.body.idProduit}, ${req.body.idClient}, ${req.body.quantite}, '${req.body.taille}')`
    con.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'bad request' })
        }
        try {
            return res.status(200).json({ message: 'enregistrement panier réussi !' })
        }
        catch (err) {
            return res.status(400).json({ err })
        }
    })
}