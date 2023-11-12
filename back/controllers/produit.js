const mysql = require('mysql2')
const ffmpeg = require('fluent-ffmpeg');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: 'milleetunemerveilles'
})

exports.affichageAllProduit = async (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        var sql = "SELECT * FROM produits WHERE visible=1 limit 10 offset 0"
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
exports.affichageProduitTendances = async (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        var sql = "SELECT * FROM produits WHERE visible=1 ORDER BY NbrVues DESC limit 10 offset 0"
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

exports.affichageAllProduitStock = async (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        var sql = "SELECT * FROM stockProduits limit 10 offset 0"
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

exports.affichageUnProduit = async (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        let arrayResponse = []
        const informationProduit = async () => {
            try {
                const [rows, fields] = await con.promise().query(`SELECT idProduit, categorie, nomProduit, descriptionProduit, promotion, prix, photoPrincipal FROM produits WHERE produits.idProduit = ${req.params.id}`)
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
            const [rows, fields] = await con.promise().query(`SELECT * FROM produits WHERE produits.categorie = '${req.params.categorie}' AND visible=1`)
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
            const [rows, fields] = await con.promise().query(`SELECT distinct sousCategorie FROM produits WHERE produits.categorie = '${req.params.categorie}'AND visible=1`)
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

exports.affichageProduitPromotion = async (req, res) => {
    console.log('test')
    con.connect(async (err) => {
        if (err) throw err;
        let arrayResponse = []
        const informationProduit = async () => {
            const [rows, fields] = await con.promise().query(`SELECT * FROM produits WHERE produits.promotion > 1 AND visible=1`)
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
            const [rows, fields] = await con.promise().query(`SELECT distinct sousCategorie FROM produits WHERE produits.promotion > 1 AND visible=1`)
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
                result.map((element) => {
                    if (!arrayResponse.find(item => item === element.nomProduit)) {
                        arrayResponse.push(element.nomProduit)
                    }
                    if (!arrayResponse.find(item => item === element.categorie)) {
                        arrayResponse.push(element.categorie)
                    }
                    if (!arrayResponse.find(item => item === element.sousCategorie)) {
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
    console.log(req)
    res.status(500)
    let idProduit = Date.now()
    con.connect(async (err) => {
        if (err) throw err
        const insertProduit = async () => {
            try {
                //console.log(req.body)
                //console.log(req.files)
                await con.promise().query(`INSERT INTO produits (nomProduit, descriptionProduit, idProduit, prix, categorie, photoPrincipal, sousCategorie, NbrVues) VALUES ('${req.body.nomProduit}', '${req.body.descriptionProduit}', '${idProduit}', '${req.body.prix}', '${req.body.categorie}', '${req.protocol}://${req.get('host')}/images/${Object.values(req.files)[0][0].filename}', '${req.body.sousCategorie}', 0)`)
                res.status(200)
                return res.statusCode
            }
            catch (err) {
                console.log(err)
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
                console.log(err)
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

exports.modification = async (req, res) => {
    console.log(req)
    con.connect((err) => {
        if (err) throw err;
        var sql = `UPDATE stockproduits SET xs=${req.body.xs}, s=${req.body.s}, sm=${req.body.sm}, m=${req.body.m}, ml=${req.body.ml}, l=${req.body.l}, lxl=${req.body.lxl}, xl=${req.body.xl} WHERE idProduit=${req.body.id}`
        con.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                console.log(200)
                return res.status(200).json(result)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })
}

exports.panier = (req, res) => {
    //recherche paniers client
    con.connect((err) => {
        if (err) throw err;
        var sql = `SELECT contenu, idPanier FROM panier WHERE idClient=${req.auth.token.idClient}`
        con.query(sql, (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                console.log(result)
                return res.status(200).json(result)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })/*
    var sql = `SELECT  photoPrincipal, panier.id, prix, nomProduit, quantite, taille FROM panier JOIN produits ON panier.idProduit=produits.idProduit LEFT JOIN client on client.idClient=panier.idClient WHERE client.idClient=${req.auth.token.idClient}`
    con.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err/* { message: 'bad request' } *//*)
        }
        try {
            console.log(result)
            return res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json({ err })
        }
    })*/
}

exports.addPanier = (req, res) => {
    let sql = `SELECT * FROM panier WHERE panier.idClient=${req.auth.token.idClient} AND panier.idPanier=${req.body.idPanier}`
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'bad request' })
        }
        try {
            if (result.length === 0) {
                let sql = `INSERT INTO panier (idClient, idPanier, contenu) VALUES (${req.auth.token.idClient}, ${req.body.idPanier}, '${req.body.contenu}')`
                con.query(sql, (err,) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ message: 'bad request select' })
                    }
                    try {
                        return res.status(200).json({ message: 'enregistrement panier réussi !' })
                    }
                    catch (err) {
                        return res.status(400).json({ err })
                    }
                })
            }
            else {
                let sql = `UPDATE panier SET contenu='${req.body.contenu}' WHERE idClient='${req.auth.token.idClient}' AND idPanier='${req.body.idPanier}'`
                con.query(sql, (err, result, fields) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ message: 'bad request update' })
                    }
                    try {
                        return res.status(200).json({ message: 'enregistrement panier réussi !' })
                    }
                    catch (err) {
                        return res.status(400).json({ err })
                    }
                })
            }
        }
        catch (err) {
            return res.status(400).json({ err })
        }
    })
}

exports.deletePanier = (req, res) => {
    console.log(req)
    let sql = `DELETE  from panier where idPanier=${req.body.idProduit} and idClient=${req.auth.token.idClient}`
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

exports.commandePanier = (req, res) => {
    //recherche paniers client
    con.connect((err) => {
        if (err) throw err;
        var sql = `INSERT INTO commande (idClient, idCommande, etat, article, adresse) VALUES ('${req.auth.token.idClient}', '${Date.now()}_${req.body.idCommande}', '${req.body.status}', '${req.body.article}', '${req.body.adresse}')`
        console.log(sql)
        con.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                //console.log(result)
                //console.log(req.body)
                return res.status(200).json(result)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })
}

/* exports.decompteCommandePaypal = (req, res) => {
    let tableau = JSON.parse(req.body.article)
    console.log(tableau)
    let i = 0
    while (i < tableau.length) {
        con.connect((err) => {
            if (err) throw err;
            var sql = `SELECT ${tableau[i].tailleProduit} FROM stockproduits WHERE idProduit='${tableau[i].produit}'`
            console.log(i)
            console.log('valeur de i1')
            con.query(sql, (err, result, fields) => {
                console.log(i)
                console.log('valeur de i2')
                if (err) {
                    console.log(err)
                    return res.status(500).json({ message: 'bad request' })
                }
                try {
                    i=0
                    console.log(i)
                    console.log('valeur de i3')
                    let resultat = result
                    var valeurs = Object.values(resultat[0]);
                    console.log(i)
                    console.log('i')
                    console.log(tableau[0].quantite)
                    console.log('valeur du panier')
                    let calcul = Number(valeurs) - tableau[0].quantite
                    console.log(calcul)
                    console.log('valeur du stock apres')
                    var sql = `UPDATE stockproduits SET ${tableau[0].tailleProduit} = '${calcul}' where idproduit = ${tableau[0].produit}`
                    con.query(sql, (err, result, fields) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({ message: 'bad request' })
                        }
                        try {
                            console.log(result)
                        }
                        catch (err) {
                            console.log(err)
                            return res.status(400).json({ err })
                        }
                    })
                }
                catch (err) {
                    console.log(err)
                    return res.status(400).json({ err })
                }
            })
        })
        i++
    }
    return res.status(200)
} */

exports.decompteCommandePaypal = async (req, res) => {
    const tableau = JSON.parse(req.body.article);
    console.log(tableau);

    try {
        for (let i = 0; i < tableau.length; i++) {
            const [rows] = await con.promise().execute(
                `SELECT ${tableau[i].tailleProduit} FROM stockproduits WHERE idProduit='${tableau[i].produit}'`
            );
            const valeurs = Object.values(rows[0]);
            const calcul = Number(valeurs[0]) - tableau[i].quantite;

            await con.promise().execute(
                `UPDATE stockproduits SET ${tableau[i].tailleProduit} = ? WHERE idproduit = ?`,
                [calcul, tableau[i].produit]
            );
        }

        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Bad request' });
    }
};


exports.getAllCommande = (req, res) => {
    //recherche paniers client
    con.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * from commande WHERE commande.idCLient='${req.auth.token.idClient}'`
        console.log(sql)
        con.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                console.log(result)
                return res.status(200).json(result)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })
}

exports.rendreVisible = (req, res) => {
    console.log(req.body)
    con.connect((err) => {
        if (err) throw err;
        var sql = `UPDATE produits SET visible=${req.body.visible} WHERE idProduit=${req.body.idProduit}`
        console.log(sql)
        con.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                console.log(result)
                return res.status(200).json(200)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })
}