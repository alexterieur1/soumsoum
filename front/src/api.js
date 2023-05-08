export const getAllProduit = async () => {
    const tableauProduit = []
    await fetch('http://192.168.1.56:4200/produit')
        .then((produit) => {
            return produit.json()
        })
        .then((produit) => {
            tableauProduit.push(produit)
            return tableauProduit
        })
    return tableauProduit[0]
}

export const creationProduit = (produit) => {
    let dataProduit = new FormData()
    dataProduit.append("nomProduit", produit.nomProduit)
    dataProduit.append("descriptionProduit", produit.descriptionProduit)
    dataProduit.append("idProduit", produit.idProduit)
    dataProduit.append("prix", produit.prix)
    dataProduit.append("stockProduit", produit.stockProduit)
    dataProduit.append("image", produit.image)
    fetch('http://192.168.1.56:4200/produit', {
        method: 'POST',
        mode: 'cors',
        body: dataProduit,
    })
        .then(function (res) { return res.json(); })
        .then(function (data) { return (JSON.stringify(data)) })
}