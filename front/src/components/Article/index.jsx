import React from 'react';
import style from './Article.module.scss'
import { Link } from 'react-router-dom'
import ceintre from '../../assets/ceintre.svg'

function Article({ image, description, categorie, prix, promotion, epuise, id }) {
    let prixEuros = prix.split('.')
    let prixReduit = String((Number(prix)*((100-Number(promotion))/100)).toFixed(2))
    let prixEurosSolde = prixReduit.split('.')
    console.log(epuise)
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
                    {promotion !== 0 ? <span className={style.promotion_base}><p className={style.promotion_texte}>-{promotion}%</p></span> : <></>}

                </Link>}
            <div>
                <p className={style.description}>{description}</p>
                {promotion !== 0 ?
                    <div className={style.promotion_prix}>
                        <p className={style.prix}>{prixEurosSolde[0]},{prixEurosSolde[1]} €</p>
                        <p className={style.prix_solde}>{prixEuros[0]},{prixEuros[1]} €</p>
                    </div>
                    : <p className={style.prix}>{prixEuros[0]},{prixEuros[1] ? prixEuros[1]: '00'} €</p>}
            </div>
        </div>
    )
}

export default Article;
