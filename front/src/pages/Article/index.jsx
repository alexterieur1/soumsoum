import React, { useState }from 'react';
import style from './Article.module.scss'
import image1 from '../../assets/imagearticle1.webp'
import image2 from '../../assets/imagearticle2.webp'
import image3 from '../../assets/imagearticle3.webp'
import image4 from '../../assets/imagearticle4.webp'
import { Link } from 'react-router-dom'

let images = Array.from(document.querySelectorAll(`.${style.listePhoto__img}`))
const selectionImage = () => {
    images.map((e) => (
        console.log('t')
    ))
}
function Article() {
    console.log(image1)
    const [image, updateImage] = useState(image1)
    //console.log(`${images[0].currentSrc}`)
    return (
        <>
            <>
                <div className={style.photos}>
                    <div className={style.photoGrand}>
                        <img className={style.photoGrand__img} src={image} alt="" />
                    </div>
                    <div className={style.listePhoto}>
                        <img onClick={()=> {selectionImage(); updateImage(image1)}} className={style.listePhoto__img} src={image1} alt="" />
                        <img onClick={()=> {selectionImage(); updateImage(image2)}} className={style.listePhoto__img} src={image2} alt="" />
                        <img onClick={()=> {selectionImage(); updateImage(image3)}} className={style.listePhoto__img} src={image3} alt="" />
                        <img onClick={()=> {selectionImage(); updateImage(image4)}} className={style.listePhoto__img} src={image4} alt="" />
                    </div>
                </div>
                <div className={style.description}>
                    <p>titre du produit</p>
                    <p>25,00 €</p>
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
