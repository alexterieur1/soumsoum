export const getAllProduit = async () => {
    let tableauProduit = []
    await fetch('http://192.168.1.56:4200/produit')
        .then((produit) => {
            return produit.json()
        })
        .then((produit) => {
            tableauProduit.push(produit)
            return tableauProduit
        })
    console.log(tableauProduit)
    return tableauProduit[0]
}

export const getUnProduit = async (id) => {
    const tableauProduit = []
    await fetch(`http://192.168.1.56:4200/produit/${id}`)
        .then((produit) => {
            return produit.json()
        })
        .then((produit) => {
            tableauProduit.push(produit[0])
            return tableauProduit
        })
    console.log(tableauProduit)
    return tableauProduit[0]
}

export const getCategorieProduit = async (categorie) => {
    console.log(categorie)
    const tableauProduit = []
    await fetch(`http://192.168.1.56:4200/produit/${categorie}`)
        .then((produit) => {
            return produit.json()
        })
        .then((produit) => {
            tableauProduit.push(produit[0])
            return tableauProduit
        })
    console.log(tableauProduit)
    return tableauProduit[0]
}

export const creationProduit = async (produit) => {
    console.log(produit.xs.length)
    console.log(produit.xs)
    console.log(typeof (produit.xs))
    let dataProduit = new FormData()
    dataProduit.append("nomProduit", produit.nomProduit)
    dataProduit.append("descriptionProduit", produit.descriptionProduit)
    dataProduit.append("idProduit", produit.idProduit)
    dataProduit.append("prix", produit.prix)
    dataProduit.append("xs", (produit.xs.length > 0) ? Number(produit.xs) : -1)
    dataProduit.append("s", (produit.s.length > 0) ? Number(produit.s) : -1)
    dataProduit.append("sm", (produit.sm.length > 0) ? Number(produit.sm) : -1)
    dataProduit.append("m", (produit.m.length > 0) ? Number(produit.m) : -1)
    dataProduit.append("ml", (produit.ml.length > 0) ? Number(produit.ml) : -1)
    dataProduit.append("l", (produit.l.length > 0) ? Number(produit.l) : -1)
    dataProduit.append("lxl", (produit.lxl.length > 0) ? Number(produit.lxl) : -1)
    dataProduit.append("xl", (produit.xl.length > 0) ? Number(produit.xl) : -1)
    dataProduit.append("image", produit.image)
    let test = fetch('http://192.168.1.56:4200/produit', {
        method: 'POST',
        mode: 'cors',
        body: dataProduit,
    })
    //.then(function (res) { alert(res.status) })
    //.then(function (res) { return res.json(); })
    //.then(function (data) { alert(data.message) })
    //.then(function (data) { return data })
    return (await test)
}

export const getPanier = async (userID) => {
    let tableauPanier = []
    await fetch('http://192.168.1.56:4200/panier', {
        method: "GET",
        headers: {
            'id': userID
        }
    })
        .then((panier) => {
            return panier.json()
        })
        .then((panier) => {
            tableauPanier.push(panier)
            return tableauPanier
        })
    return tableauPanier[0]
}

export const addPanier = async (taille, idProduit, idClient) => {
    let dataPanier = new URLSearchParams()
    dataPanier.append('taille', taille)
    dataPanier.append('idProduit', idProduit)
    dataPanier.append('idClient', idClient)
    dataPanier.append('quantite', 1)
    await fetch('http://192.168.1.56:4200/panier', {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: dataPanier
    })
}

export const connexion = async (objetConnexion) => {
    let dataConnexion = new FormData()
    dataConnexion.append('mail', objetConnexion.email)
    dataConnexion.append('password', objetConnexion.password)
    try{
        let apiPlayload = await fetch('http://192.168.1.56:4200/connexion', {
        method: "POST",
        /* headers: {
            'Content-Type': 'multipart/form-data; boundary=----azertyuiop',
        }, */
        body: dataConnexion
    })
    let playload = await apiPlayload.json()
    console.log(playload)
    return playload
    }
    catch(err){
        console.log(err)
        return err
    }
}

export const informationClient = async (userID) => {
    let arrayResponse =[]
    let requete = await fetch(`http://192.168.1.56:4200/informationClient`,{
        method: "GET",
        headers: {
            'id': userID
        }
    })
    let requetejson = await requete.json()
    arrayResponse.push(requetejson[0])
    arrayResponse.push(requete.status)
        return arrayResponse
}

export const suiviLaPoste = async () =>{

}