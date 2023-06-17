import React from 'react';
import style from './Article.module.scss'
import { Link } from 'react-router-dom'
import ceintre from '../../assets/ceintre.svg'

function Article({ image, description, prix, epuise, id }) {
    let prixEuros = prix.split('.')
    console.log(id)
    console.log('composant article')
    return (
        <div className={style.article}>
            {epuise ? <>
                <Link to={`/article/${id}`} className={style.articleepuise}>
                    <img className={style.imageepuise} src={image} alt='descritpion' />
                    <div className={style.fenetreepuise}>
                        <img src={ceintre} alt='article epuisé'/>
                        <p className={style.texteepuise}>Article épuisé</p>
                    </div>
                </Link>
            </>
                : <Link to={`/article/${id}`} className={style.article}>
                    <img className={style.image} src={image} alt='descritpion' />
                </Link>}
            <p className={style.description}>{description}</p>
            <p className={style.prix}>{prixEuros[0]},{prixEuros[1]} €</p>
        </div>
    )
}

export default Article;
