import React from 'react';
import style from './Header.module.scss'
import loupe from '../../assets/loupe.svg'
import panier from '../../assets/panier.svg'
import burger from '../../assets/burger.svg'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <div className={style.navbar}>
                <div className={style.menuBurger}><img src={burger} alt='menu' /></div>
                <Link to='/'>
                    <p className={style.logo}>Mille et une Merveille</p>
                </Link>
                <div className={style.recherche}><img src={loupe} alt='recherche' /></div>
                <div className={style.panier}><img src={panier} alt='panier' /></div>
            </div>
        </header>
    )
}

export default Header;
