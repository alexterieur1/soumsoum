import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Article from '../../components/Article'
import { getCategorieProduit } from '../../api'


export async function loadData(props) {
    console.log(props)
    const produit = await getCategorieProduit(props.params.categorie)
    return { produit }
}
function ArticleCategorie() {
    const { produit } = useLoaderData()
    return (
        <>
        </>
    )
}

export default ArticleCategorie;
