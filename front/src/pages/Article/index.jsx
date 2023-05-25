import React, { useEffect, useState } from 'react'
import style from './Article.module.scss'
import image2 from '../../assets/imagearticle2.webp'
import image3 from '../../assets/imagearticle3.webp'
import image4 from '../../assets/imagearticle4.webp'
import { getUnProduit, addPanier } from '../../api'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
//import Avis from '../../components/Avis'

export async function loadData(props) {
    const produit = await getUnProduit(props.params.id)
    return { produit }
}

function Article() {
    const { produit } = useLoaderData()
    const [image, updateImage] = useState(produit.liens)
    const [taille, setTaille] = useState('')
    useEffect(() => {
        let elementTaille = document.getElementById(taille)
        if (elementTaille === null) {
            return
        }
        if (document.querySelector(`.${style.taille__unite__selected}`)) {
            document.querySelector(`.${style.taille__unite__selected}`).classList.remove(`${style.taille__unite__selected}`)
        }
        if (elementTaille.className === `${style.taille__unite}`) {
            elementTaille.classList.add(`${style.taille__unite__selected}`)
        }
    }, [taille])
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
                {Number(produit.xs) >= 0 ? <p id="xs" onClick={() => setTaille('xs')} className={Number(produit.xs) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xs</p> : <></>}
                {Number(produit.s) >= 0 ? <p id="s" onClick={() => setTaille('s')} className={Number(produit.s) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s</p> : <></>}
                {Number(produit.sm) >= 0 ? <p id="sm" onClick={() => setTaille('sm')} className={Number(produit.sm) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s-m</p> : <></>}
                {Number(produit.m) >= 0 ? <p id="m" onClick={() => setTaille('m')} className={Number(produit.m) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m</p> : <></>}
                {Number(produit.ml) >= 0 ? <p id="ml" onClick={() => setTaille('ml')} className={Number(produit.ml) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m-l</p> : <></>}
                {Number(produit.l) >= 0 ? <p id="l" onClick={() => setTaille('l')} className={Number(produit.l) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l</p> : <></>}
                {Number(produit.lxl) >= 0 ? <p id="lxl" onClick={() => setTaille('lxl')} className={Number(produit.lxl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l-xl</p> : <></>}
                {Number(produit.xl) >= 0 ? <p id="xl" onClick={() => setTaille('xl')} className={Number(produit.xl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xl</p> : <></>}
            </div>
            <button onClick={(() => addPanier(taille, produit.idProduit, '0123456789'))} className={style.button}>
                ajouter au panier
            </button>
            {/*             <Avis etoilesscore={4.5} />
 */}        </>
    )
}

export default Article;
