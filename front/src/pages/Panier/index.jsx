import React, { useEffect, useState } from 'react'
import style from './Panier.module.scss'
import { getPanier } from '../../api'
import { useLoaderData } from 'react-router-dom'
import Article from '../../components/ArticlePanier'
import Cookies from 'js-cookie'

let array = []
const prixTotalArrondi = (prixInitial) => {
    if (prixInitial / 1000 >= 1) {
        let prixArrondi = prixInitial.toPrecision(6)
        let prixMilier = String((prixArrondi / 1000).toFixed(3))
        console.log(prixArrondi)
        console.log(String(prixMilier))
        return  prixMilier.split('.')[0] + ' ' + prixMilier.split('.')[1] + ',' + prixArrondi.split('.')[1]
    }
    if (prixInitial / 100 >= 1) {
        let prixArrondi = prixInitial.toPrecision(5)
        return prixArrondi.split('.')[0] + ',' + prixArrondi.split('.')[1]
    }
    else {
        let prixArrondi = prixInitial.toPrecision(4)
        return prixArrondi.split('.')[0] + ',' + prixArrondi.split('.')[1]
    }
}
const arrayQuantitePrix = (panier) => {
    if (array.length === 0) {
        let arrayQuantite = []
        let arrayPrix = []
        let arrayPrixElement = []
        panier.map((element) => {
            return arrayQuantite.push(element.quantite)
        })
        panier.map((element) => {
            return arrayPrix.push(element.prix)
        })
        array.push(arrayQuantite, arrayPrix)
        let i = 0
        while (i < arrayPrix.length) {
            let PrixElement = Number(arrayPrix[i]) * Number(arrayQuantite[i])
            arrayPrixElement.push(PrixElement)
            i++
        }
        array.push(arrayPrixElement)
        let totalFinal = 0
        arrayPrixElement.map((element) => {
            return totalFinal = element + totalFinal
        })
        array.push(totalFinal)
    }
    else {
        let arrayQuantite = []
        let arrayPrix = []
        let arrayPrixElement = []
        panier.map((element) => {
            return arrayQuantite.push(element.quantite)
        })
        panier.map((element) => {
            return arrayPrix.push(element.prix)
        })
        array.splice(0, 1, arrayQuantite)
        array.splice(1, 1, arrayPrix)
        let i = 0
        while (i < arrayPrix.length) {
            let PrixElement = Number(arrayPrix[i]) * Number(arrayQuantite[i])
            arrayPrixElement.push(PrixElement)
            i++
        }
        array.splice(2, 1, arrayPrixElement)
        let totalFinal = 0
        arrayPrixElement.map((element) => {
            return totalFinal = element + totalFinal
        })
        array.splice(3, 1, totalFinal)
    }
}
export async function loadData() {
    const panier = await getPanier(Cookies.get('userId'))
    return { panier }
}
function Panier() {
    const { panier } = useLoaderData()
    const [Total, updateTotal] = useState()
    const [Quantite, setQuantite] = useState(1)
    const [indexModif, updateIndexModif] = useState()
    arrayQuantitePrix(panier)
    //console.log(panier)
    useEffect(() => {
        console.log(array)
        if (indexModif >= 0) {
            console.log(panier)
            panier[indexModif].quantite = Quantite
            arrayQuantitePrix(panier)
        }
        let prixFinal = prixTotalArrondi(array[3])
        updateTotal(prixFinal)
    }, [Quantite, indexModif, panier])
    return (
        <>
            <h1 className={style.titre}>Mon Panier</h1>
            <div className={style.listePanier}>
                {panier.map((article, index) =>
                    < Article key={index} index={index} panier={article} quantite={setQuantite} updateindex={updateIndexModif} />
                )}
            </div >
            <p className={style.prixFinal}>Total : {Total} €</p>
            <button className={style.button}>
                Valider ma commande
            </button>
        </>
    )
}

export default Panier;
