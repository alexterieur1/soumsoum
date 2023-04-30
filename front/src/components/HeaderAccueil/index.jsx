import React from 'react';
import style from './HeaderAccueil.module.scss'
import loupe from '../../assets/loupe.svg'
import panier from '../../assets/panier.svg'
import burger from '../../assets/burger.svg'
import Carousel from '../Carousel'

function HeaderAccueil() {
    return (
        <header>
            <div className={style.navbar}>
                <div className={style.menuBurger}>
                    <img src={burger} alt='menu' />
                </div>
                <div className={style.logo}>Mille et une Merveille</div>
                <div className={style.recherche}>
                    <img src={loupe} alt='recherche' />
                </div>
                <div className={style.panier}>
                    <img src={panier} alt='panier' />
                </div>
            </div>
            <div className={style.Carousel}>
                <Carousel />
            </div>
        </header>
    )
}

export default HeaderAccueil;
