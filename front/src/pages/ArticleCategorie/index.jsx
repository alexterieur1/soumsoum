import React from 'react'
import style from './ArticleCategorie.module.scss'
import { useLoaderData } from 'react-router-dom'
import Article from '../../components/Article'
import { getCategorieProduit } from '../../api'

export async function loadData(props) {
    const produit = await getCategorieProduit(props.params.categorie)
    return { produit }
}
function ArticleCategorie() {
    const { produit } = useLoaderData()
    console.log(produit)
    return (
        <div className={style.article}>
        {produit ? (
          produit.map((produit, index) => (
            <Article key={index} id={produit.idProduit} image={produit.liens} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} epuise={false} />
          ))
        ) : <>chargement ...</>}
        </div>
    )
}

export default ArticleCategorie;
