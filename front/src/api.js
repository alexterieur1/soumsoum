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
export const creationProduit = async (produit) => {
    await fetch('http://192.168.1.56:4200/produit',{
        method: 'POST',
        mode:'cors',
        body: JSON.stringify(produit)
    })
}