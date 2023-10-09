import React from 'react'
import Cookies from 'js-cookie'
import { getPanier, informationClient, getAllProduit } from '../../api'
import { useLoaderData } from 'react-router-dom'
import Article from '../../components/Article'
import style from '../Nouveau/Nouveau.module.scss'

export async function loadData() {
    const panier = await getPanier(Cookies.get('userId'))
    const infoClient = await informationClient(Cookies.get('userId'))
    const infoProduit = await getAllProduit()
    console.log(infoClient)
    return { infoProduit }
}
function Nouveau() {
    const { infoProduit } = useLoaderData()
    return (
        <>
            <h2 className={style.titre}>Les dernières nouveautées</h2>
            <div className={style.article}>
                {infoProduit ? (
                    infoProduit.map((produit, index) => (
                        <Article key={index} id={produit.idProduit} image={produit.photoPrincipal} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} epuise={false} />
                    ))
                ) : <>chargement ...</>}
            </div>
        </>

    )
}

export default Nouveau;
