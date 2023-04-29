import React from 'react';
import style from './Article.module.scss'
import { Link } from 'react-router-dom'

function Article({ image, description, prix, epuise }) {
    return (
        <div className={style.article}>
            {epuise ? <>
                <Link to='/article/' className={style.articleepuise}>
                    <img className={style.imageepuise} src={image} alt='descritpion' />
                <p className={style.fenetreepuise}>Article épuisé...</p>
                </Link>
            </>
                : <Link to='/article/' className={style.article}>
                    <img className={style.image} src={image} alt='descritpion' />
                </Link>}
            <p className={style.description}>{description}</p>
            <p className={style.prix}>{prix} €</p>
        </div>
    )
}

export default Article;
