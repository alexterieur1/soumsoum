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

export const creationProduit =  async (produit) => {
    let dataProduit = new FormData()
    dataProduit.append("nomProduit", produit.nomProduit)
    dataProduit.append("descriptionProduit", produit.descriptionProduit)
    dataProduit.append("idProduit", produit.idProduit)
    dataProduit.append("prix", produit.prix)
    dataProduit.append("stockProduit", produit.stockProduit)
    dataProduit.append("image", produit.image)
    let test =  fetch('http://192.168.1.56:4200/produit', {
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