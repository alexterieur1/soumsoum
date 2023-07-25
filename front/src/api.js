export const getAllProduit = async () => {
    let result = await fetch('http://192.168.1.56:4200/produit')
    return result.json()
}

export const getUnProduit = async (id) => {
    let result = await fetch(`http://192.168.1.56:4200/produit/${id}`)
    return result.json()
}

export const getCategorieProduit = async (categorie) => {
    let result = await fetch(`http://192.168.1.56:4200/categorie/${categorie}`)
    return result.json()
}

export const getCategorieRecherche = async () => {
    let result = await fetch(`http://192.168.1.56:4200/recherche`)
    return result.json()
}

export const creationProduit = async (produit) => {
    console.log(produit.xs.length)
    console.log(produit.xs)
    console.log(typeof (produit.xs))
    let dataProduit = new FormData()
    dataProduit.append("nomProduit", produit.nomProduit)
    dataProduit.append("descriptionProduit", produit.descriptionProduit)
    dataProduit.append("prix", produit.prix)
    dataProduit.append("categorie", produit.categorie)
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
    if (userID) {
        let requete = await fetch('http://192.168.1.56:4200/panier', {
            method: "GET",
            headers: {
                'id': userID
            }
        })
        if (requete.status === 200) {
            let requetejson = await requete.json()
            return requetejson
        }
        if (requete.status === 401) {
            console.log(requete.status)
        }
        return requete.status
    }
    else{
        return []
    }
}

export const addPanier = async (idPanier, contenu, idClient) => {
    let dataPanier = new URLSearchParams()
    dataPanier.append('idPanier', idPanier ? idPanier : Date.now())
    dataPanier.append('idClient', idClient)
    dataPanier.append('contenu', contenu)
    dataPanier.append('quantite', 1)
    await fetch('http://192.168.1.56:4200/panier', {
        method: "POST",
        headers: {
            'id': idClient
        },
        body: dataPanier
    })
}

export const deletePanier = async (idProduit, idClient) => {
    let dataPanier = new URLSearchParams()
    dataPanier.append('idProduit', idProduit)
    dataPanier.append('idClient', idClient)
    await fetch(`http://192.168.1.56:4200/panier/${idProduit}`, {
        method: "POST",
        headers: {
            'id': idClient

        },
        body: dataPanier
    })
}

export const connexion = async (objetConnexion) => {
    let dataConnexion = new FormData()
    dataConnexion.append('mail', objetConnexion.email)
    dataConnexion.append('password', objetConnexion.password)
    try {
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
    catch (err) {
        console.log(err)
        return err
    }
}

export const inscription = async (objetinscription) => {
    let dataInscription = new FormData()
    dataInscription.append('motDePasse', objetinscription.password)
    dataInscription.append('nom', objetinscription.nom)
    dataInscription.append('prenom', objetinscription.prenom)
    dataInscription.append('adresse', objetinscription.adresse)
    dataInscription.append('codePostale', objetinscription.codePostal)
    dataInscription.append('ville', objetinscription.ville)
    dataInscription.append('mail', objetinscription.email)
    dataInscription.append('tel', objetinscription.numTel)
    dataInscription.append('annee', objetinscription.annee)
    dataInscription.append('mois', objetinscription.mois)
    dataInscription.append('jours', objetinscription.jours)

    try {
        let apiPlayload = await fetch('http://192.168.1.56:4200/inscription', {
            method: "POST",
            /* headers: {
                'Content-Type': 'multipart/form-data; boundary=----azertyuiop',
            }, */
            body: dataInscription
        })
        let playload = await apiPlayload.json()
        return playload
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const informationClient = async (userID) => {
    let arrayResponse = []
    let requete = await fetch(`http://192.168.1.56:4200/informationClient`, {
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

export const suiviLaPoste = async () => {

}

export const mailVerification = async (userID) => {
    let requete = await fetch(`http://192.168.1.56:4200/mailVerification`, {
        method: "GET",
        headers: {
            'id': userID
        }
    })
    let requetejson = await requete.json()
    return requetejson
}