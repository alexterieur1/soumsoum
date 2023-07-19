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
        var sql = "SELECT * FROM produits"
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
    con.connect(async (err) => {
        if (err) throw err;
        let arrayResponse = []
        const informationProduit = async () => {
            try {
                const [rows, fields] = await con.promise().query(`SELECT idProduit, categorie, nomProduit, descriptionProduit, prix, photoPrincipal FROM produits WHERE produits.idProduit = ${req.params.id}`)
                arrayResponse.push(rows[0])
                res.status(200)
                return rows
            }
            catch (err) {
                console.log(err)
                res.status(400)
                return res.statusCode
            }
        }
        const photoProduit = async () => {
            try {
                const [rows, fields] = await con.promise().query(`SELECT liens FROM photoproduits WHERE photoproduits.idProduit = ${req.params.id} ORDER BY 'liens' DESC`)
                arrayResponse.push(rows)
                res.status(200)
                return rows
            }
            catch (err) {
                console.log(err)
                res.status(400)
                return res.statusCode
            }
        }
        const stockProduit = async () => {
            try {
                const [rows, fields] = await con.promise().query(`SELECT xs, s, sm, m, ml, l, lxl, xl FROM stockproduits WHERE stockproduits.idProduit = ${req.params.id}`)
                arrayResponse.push(rows[0])
                res.status(200)
                return rows
            }
            catch (err) {
                console.log(err)
                res.status(400)
                return res.statusCode
            }
        }
        let resultInformationProduit = await informationProduit()
        console.log(resultInformationProduit)
        let resultPhotoProduit = await photoProduit()
        console.log(resultPhotoProduit)
        let resultStockProduit = await stockProduit()
        console.log(resultStockProduit)
        return res.status(200).json(arrayResponse)
    })
}

exports.affichageCategorieProduit = async (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        let arrayResponse = []
        const informationProduit = async () => {
            const [rows, fields] = await con.promise().query(`SELECT * FROM produits WHERE produits.categorie = '${req.params.categorie}'`)
            if (err) {
                res.status(500)
                return res.statusCode
            }
            try {
                arrayResponse.push(rows)
                res.status(200)
                return res.statusCode
            }
            catch (err) {
                res.status(400)
                return res.statusCode
            }
        }
        const sousCategorie = async () => {
            const [rows, fields] = await con.promise().query(`SELECT distinct sousCategorie FROM produits WHERE produits.categorie = '${req.params.categorie}'`)
            if (err) {
                res.status(500)
                return res.statusCode
            }
            try {
                arrayResponse.unshift(rows)
                res.status(200)
                return res.statusCode
            }
            catch (err) {
                console.log(err)
                res.status(400)
                return res.statusCode
            }
        }
        let resultInformationProduit = await informationProduit()
        console.log(resultInformationProduit)
        let resultSousCategorie = await sousCategorie()
        console.log(resultSousCategorie)
        if (resultInformationProduit === 200 && resultSousCategorie === 200) {
            return res.status(200).json(arrayResponse)
        } else {
            return res.status(400).json(arrayResponse)
        }
    })
}

exports.affichageRecherche = async (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        let arrayResponse = []
        let sql = `SELECT nomProduit, categorie, sousCategorie FROM produits`
        con.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                result.map((element)=>{
                    if(!arrayResponse.find(item => item === element.nomProduit)){
                        arrayResponse.push(element.nomProduit)
                    }
                    if(!arrayResponse.find(item => item === element.categorie)){
                        arrayResponse.push(element.categorie)
                    }
                    if(!arrayResponse.find(item => item === element.sousCategorie)){
                        arrayResponse.push(element.sousCategorie)
                    }
                })
                return res.status(200).json(arrayResponse)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })
}
exports.creation = async (req, res) => {
    res.status(500)
    let idProduit = Date.now()
    con.connect(async (err) => {
        if (err) throw err
        const insertProduit = async () => {
            try {
                await con.promise().query(`INSERT INTO produits (nomProduit, descriptionProduit, idProduit, prix, categorie, photoPrincipal, sousCategorie) VALUES ('${req.body.nomProduit}', '${req.body.descriptionProduit}', '${idProduit}', '${req.body.prix}', '${req.body.categorie}', '${req.protocol}://${req.get('host')}/images/${Object.values(req.files)[0][0].filename}', '${req.body.sousCategorie}')`)
                res.status(200)
                return res.statusCode
            }
            catch (err) {
                //console.log(err)
                return 400
            }
        }
        let stockProduit = async () => {
            try {
                await con.promise().query(`INSERT INTO stockproduits (idProduit, xs, s, sm, m, ml, l, lxl, xl) VALUES ('${String(idProduit)}',${Number(req.body.xs)},${Number(req.body.s)},${Number(req.body.sm)},${Number(req.body.m)},${Number(req.body.ml)},${Number(req.body.l)},${Number(req.body.lxl)},${Number(req.body.xl)})`)
                res.status(200)
                return res.statusCode
            }
            catch (err) {
                //console.log(err)
                res.status(400)
                return res.statusCode
            }
        }
        let photosProduit = async () => {
            let elementimage = Object.keys(req.files)
            let i = 1
            try {
                while (i <= elementimage.length) {
                    await con.promise().query(`INSERT INTO photoproduits (liens, idProduit) VALUES ('${req.protocol}://${req.get('host')}/images/${Object.values(req.files)[i - 1][0].filename}', '${String(idProduit)}')`)
                    i++
                }
                //console.log('test')
                return res.statusCode
            }
            catch (err) {
                //console.log(err)
                res.status(400)
                return res.statusCode
            }
        }
        let resultInsertProduit = await insertProduit()
        //console.log(resultInsertProduit)
        let resultstockProduit = await stockProduit()
        //console.log(resultInsertProduit, resultstockProduit)
        let resultPhotosProduit = await photosProduit()
        //console.log(resultInsertProduit, resultstockProduit, resultPhotosProduit)
        if (resultInsertProduit === 200 && resultstockProduit === 200 && resultPhotosProduit === 200) {
            return res.status(200).json({ message: 'produit crée' })
        }
        else {
            return res.status(400).json({ message: 'echec' })
        }
    }
    )
}

exports.panier = (req, res) => {
    var sql = `SELECT  photoPrincipal, panier.id, prix, nomProduit, quantite, taille FROM panier JOIN produits ON panier.idProduit=produits.idProduit LEFT JOIN client on client.idClient=panier.idClient WHERE client.idClient=${req.auth.token.idClient}`
    con.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err/* { message: 'bad request' } */)
        }
        try {
            console.log(result)
            return res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json({ err })
        }
    })
}

exports.addPanier = (req, res) => {
    let sql = `INSERT INTO panier (idProduit, idClient, quantite, taille) VALUES (${req.body.idProduit}, ${req.auth.token.idClient}, ${req.body.quantite}, '${req.body.taille}')`
    con.query(sql, (err, result, fields) => {
        if (err) {
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

exports.deleteUnProduitPanier = (req, res) => {
    let sql = `DELETE  from panier where id=${req.body.idProduit} and idClient=${req.auth.token.idClient}`
    con.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'bad request' })
        }
        try {
            return res.status(200).json({ message: 'élément du panier supprimé' })
        }
        catch (err) {
            return res.status(400).json({ err })
        }
    })
}