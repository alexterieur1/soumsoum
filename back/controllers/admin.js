const mysql = require('mysql2')

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: 'milleetunemerveilles'
})


exports.infoAllproduit = async (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        var sql = "SELECT * FROM produits JOIN stockproduits ON produits.idProduit=stockproduits.idProduit"
        con.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err)
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
exports.incrementationVue = async (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        var sql = `UPDATE produits SET NbrVues = NbrVues + 1 WHERE produits.idProduit=${req.body.idProduit}`
        con.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err)
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
/*exports.infostock = async (req, res) => {
    con.connect((err) => {
    if (err) throw err;
    var sql = "SELECT * FROM stockproduits"
    con.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err)
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
*/