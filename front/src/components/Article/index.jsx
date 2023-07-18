import React from 'react';
import style from './Article.module.scss'
import { Link } from 'react-router-dom'
import ceintre from '../../assets/ceintre.svg'

function Article({ image, description, categorie, prix, epuise, id }) {
    let prixEuros = prix.split('.')
    return (
        <div className={style.article}>
            {epuise ? <>
                <Link to={`/article/${categorie}/${id}`} className={style.articleepuise}>
                    <img className={style.imageepuise} src={image} alt='descritpion' />
                    <div className={style.fenetreepuise}>
                        <img src={ceintre} alt='article epuisé' />
                        <p className={style.texteepuise}>Article épuisé</p>
                    </div>
                </Link>
            </>
                : <Link to={`/article/${categorie}/${id}`} className={style.article_element}>
                    <img className={style.image} src={image} alt='descritpion' />
                </Link>}
            <div>
                <p className={style.description}>{description}</p>
                <p className={style.prix}>{prixEuros[0]},{prixEuros[1]} €</p>
            </div>
        </div>
    )
}

export default Article;
