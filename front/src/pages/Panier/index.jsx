import React, { useEffect, useState } from 'react'
import style from './Panier.module.scss'
import { getPanier } from '../../api'
import { useLoaderData } from 'react-router-dom'
import Article from '../../components/ArticlePanier'

export async function loadData() {
    const panier = await getPanier()
    return { panier }
}
function Panier() {
    const { panier } = useLoaderData()
    const [Total, updateTotal] = useState(0)
    const [test, setTest] = useState(0)
    useEffect(() => {
        console.log(test)
        console.log('a regarder audessus')
        updateTotal(Number(test))
    }, [test])
    console.log(panier)
    return (
        <>
            <h1 className={style.titre}>Mon Panier</h1>
            <div className={style.listePanier}>
                {panier.map((article, index) => (
                    <Article key={index} panier={article} seTest={setTest} test={test} />
                ))}
            </div >

            <p>total : {Total}</p>
        </>
    )
}

export default Panier;
