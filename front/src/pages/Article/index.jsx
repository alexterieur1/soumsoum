import React, { useState } from 'react'
import style from './Article.module.scss'
import image2 from '../../assets/imagearticle2.webp'
import image3 from '../../assets/imagearticle3.webp'
import image4 from '../../assets/imagearticle4.webp'
import { getUnProduit } from '../../api'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import Avis from '../../components/Avis'

export async function loadData(props) {
    console.log(props)
    const produit = await getUnProduit(props.params.id)
    return { produit }
}

function Article() {
    const { produit } = useLoaderData()
    const [image, updateImage] = useState(produit.liens)
    return (
        <>
            <div className={style.photos}>
                <div className={style.photoGrand}>
                    <img className={style.photoGrand__img} src={image} alt="" />
                </div>
                <div className={style.listePhoto}>
                    <img onClick={() => updateImage(produit.liens)} className={style.listePhoto__img} src={produit.liens} alt="" />
                    <img onClick={() => updateImage(image2)} className={style.listePhoto__img} src={image2} alt="" />
                    <img onClick={() => updateImage(image3)} className={style.listePhoto__img} src={image3} alt="" />
                    <img onClick={() => updateImage(image4)} className={style.listePhoto__img} src={image4} alt="" />
                </div>
            </div>
            <div className={style.description}>
                <p>{produit.nomProduit}</p>
                <p>{produit.prix} €</p>
            </div>
            <div className={style.taille}>
                {Number(produit.xs) >= 0 ? <p className={Number(produit.xs) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xs</p> : <></>}
                {Number(produit.s) >= 0 ? <p className={Number(produit.s) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s</p> : <></>}
                {Number(produit.sm) >= 0 ? <p className={Number(produit.sm) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s-m</p> : <></>}
                {Number(produit.m) >= 0 ? <p className={Number(produit.m) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m</p> : <></>}
                {Number(produit.ml) >= 0 ? <p className={Number(produit.ml) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m-l</p> : <></>}
                {Number(produit.l) >= 0 ? <p className={Number(produit.l) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l</p> : <></>}
                {Number(produit.lxl) >= 0 ? <p className={Number(produit.lxl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l-xl</p> : <></>}
                {Number(produit.xl) >= 0 ? <p className={Number(produit.xl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xl</p> : <></>}
            </div>
            <Link to='/panier'>
                <button className={style.button}>
                    ajouter au panier
                </button>
            </Link>
            <Avis etoilesscore={4.5}/>
        </>
    )
}

export default Article;
