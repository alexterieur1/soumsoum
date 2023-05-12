import React, { useState } from 'react';
import style from './Article.module.scss'
import image2 from '../../assets/imagearticle2.webp'
import image3 from '../../assets/imagearticle3.webp'
import image4 from '../../assets/imagearticle4.webp'
import { getUnProduit } from '../../api';
import { Link} from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

export async function loadData(props) {
    console.log(props)
    const produit = await getUnProduit(props.params.id)
    return { produit }
}

function Article() {
    const { produit } = useLoaderData()
    const [image, updateImage] = useState(produit.liens)
    console.log(produit)
    return (
        <>
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
                    <p className={style.taille__unite}>40</p>
                    <p className={style.taille__unite__epuise}>42</p>
                    <p className={style.taille__unite}>44</p>
                    <p className={style.taille__unite}>46</p>
                    <p className={style.taille__unite__epuise}>48</p>
                </div>
                <Link to='/panier'>
                    <button className={style.button}>
                        ajouter au panier
                    </button>
                </Link>
            </>
        </>

    )
}

export default Article;
