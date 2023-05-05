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
        var sql = "SELECT * from produits INNER JOIN photoproduits ON produits.idProduit = photoproduits.idProduit"
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
exports.creation = async (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        console.log('connecté !')
        console.log(req.body)
        var sql = `INSERT INTO produits (nomProduit, descriptionProduit, idProduit, prix, stockProduits) VALUES ('${req.body.nomProduit}', '${req.body.descriptionProduit}', '${req.body.idProduit}', '${req.body.prix}', '${req.body.stockProduit}')`
        console.log(sql)
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