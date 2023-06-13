import React, { useEffect, useState } from 'react'
import style from './Panier.module.scss'
import { getPanier } from '../../api'
import { useLoaderData } from 'react-router-dom'
import Article from '../../components/ArticlePanier'

let array = []
const arrayQuantitePrix = (panier) => {
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
    console.log(array)
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
    console.log(array)
}
export async function loadData() {
    const panier = await getPanier()
    return { panier }
}
function Panier() {
    const { panier } = useLoaderData()
    arrayQuantitePrix(panier)
    const [Total, updateTotal] = useState()
    const [test, setTest] = useState()
    console.log(panier)
    useEffect(() => {

        console.log(test)
        console.log('a regarder audessus')
        updateTotal(array[3])
    }, [test])
    return (
        <>
            <h1 className={style.titre}>Mon Panier</h1>
            <div className={style.listePanier}>
                {panier.map((article, index) =>
                    < Article key={index} panier={article} seTest={setTest} test={test} />
                )}
            </div >
            <p>total : {Total}</p>
            <button className={style.button}>
                Payer
            </button>
        </>
    )
}

export default Panier;
