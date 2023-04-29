import React from 'react';
import Banner from '../../components/Header'
import style from './Panier.module.scss'
import image from '../../assets/image.JPG'

function Panier() {
    return (
        <>
            <Banner />
            <h1 className={style.titre}>Mon Panier</h1>
            <div className={style.listePanier}>
                <div className={style.article}>
                    <div className={style.article__image}>
                        <img className={style.article__image__contenu} src={image} alt="article 1 panier" />
                    </div>
                    <div>
                        <div className={style.description}>
                            <p className={style.description__titre}>lorem ipsum</p>
                            <p className={style.description__prix}>25,00 €</p>
                            <div className={style.quantite}>
                                <label for='quantite'>Quantité : </label>
                                <input id='quantite' type="number" value="1" min='1' max='5' />
                            </div>
                            <button className={style.button}>
                                supprimer
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.article__image}>
                        <img className={style.article__image__contenu} src={image} alt="article 1 panier" />
                    </div>
                    <div>
                        <div className={style.description}>
                            <p className={style.description__titre}>lorem ipsum</p>
                            <p className={style.description__prix}>25,00 €</p>
                            <div className={style.quantite}>
                                <label for='quantite'>Quantité : </label>
                                <input id='quantite' type="number" value="1" min='1' max='5' />
                            </div>
                            <button className={style.button}>
                                supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Panier;
