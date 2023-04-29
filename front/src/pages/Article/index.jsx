import React from 'react';
import style from './Article.module.scss'
import Banner from '../../components/Header'
import image from '../../assets/image.JPG'
import { Link } from 'react-router-dom'

function Article() {
    return (
        <>
            <Banner />
            <>
                <div className={style.photos}>
                    <div className={style.photoGrand}>
                        <img className={style.photoGrand__img} src={image} alt="" />
                    </div>
                    <div className={style.listePhoto}>
                        <img className={style.listePhoto__img} src={image} alt="" />
                        <img className={style.listePhoto__img} src={image} alt="" />
                        <img className={style.listePhoto__img} src={image} alt="" />
                        <img className={style.listePhoto__img} src={image} alt="" />
                    </div>
                </div>
                <div className={style.description}>
                    <p>titre du produit</p>
                    <p>25,00 €</p>
                </div>
                <div className={style.taille}>
                    <p className={style.taille__unite}>40</p>
                    <p className={style.taille__unite}>42</p>
                    <p className={style.taille__unite}>44</p>
                    <p className={style.taille__unite}>46</p>
                    <p className={style.taille__unite}>48</p>
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
