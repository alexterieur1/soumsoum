import React from 'react';
import style from './Article.module.scss'

function Article({image, description, prix, epuise}) {
    return (
        <div className={style.article}>
        {epuise ? <img className={style.imageepuise} src={image} alt='descritpion'/> : <img className={style.image} src={image} alt='descritpion'/>}
        <p className={style.description}>{description}</p>
        <p className={style.prix}>{prix} €</p>
        </div>
    )
}

export default Article;
