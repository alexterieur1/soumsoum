import React, { useEffect, useState } from 'react';
import fleche from '../../assets/fleche_bas.svg'
import style from './Header.module.scss'
import loupe from '../../assets/loupe.svg'
import panier from '../../assets/panier.svg'
import burger from '../../assets/burger.svg'
import logo from '../../assets/logo-header.webp'
import connexion from '../../assets/connexion.svg'
import { Link } from 'react-router-dom'



function Header() {
    const [menu, updateMenu] = useState(false)
    const [isOpen, setisOpen] = useState(false)

    useEffect(() => {
        var menudiv = document.getElementById('menu')
        if (menu) {
            menudiv.classList.add(`${style.headerBalise__gauche__animationOuverture}`)
            menudiv.classList.remove(`${style.headerBalise__gauche__fermeture}`)
        }
        else {
            menudiv.classList.add(`${style.headerBalise__gauche__fermeture}`)
            menudiv.classList.remove(`${style.headerBalise__gauche__animationOuverture}`)
        }
    }, [menu])
    return (
        <header>
            <div className={style.navbar}>
                <div onClick={() => updateMenu(true)} className={style.menuBurger}>
                    <img src={burger} alt='menu' />
                </div>
                <div id='menu' className={style.headerBalise__gauche}>
                    <img className={style.headerBalise__gauche__logo} src={logo} alt='mille et une merveilles' />
                    <div className={style.liste}>
                        <h2>les Catégories</h2>
                        <ul>
                            <li className={style.liste__categorie}>
                                <div className={style.liste__balise__titre} onClick={() => { setisOpen(isOpen => !isOpen); console.log(isOpen) }}>
                                    <p>les Hauts</p>
                                    <img src={fleche} alt="menu déroulant" />
                                </div>
                                {isOpen ? (<ul className={style.liste__contenue}>
                                    <li>t-shirt</li>
                                    <li>pull</li>
                                </ul>) : <></>}

                            </li>
                            <li className={style.liste__categorie}>
                                <div className={style.liste__balise__titre}>
                                    <p>les Bas</p>
                                    <img src={fleche} alt="menu déroulant" />
                                </div>
                                {isOpen ? (<ul className={style.liste__contenue}>
                                    <li>pantalon</li>
                                    <li>jeans</li>
                                    <li>jupes</li>
                                </ul>) : <></>}
                            </li>
                            <li className={style.liste__categorie}>
                                <div className={style.liste__balise__titre}>
                                    <p>les Ensembles</p>
                                    <img src={fleche} alt="menu déroulant" /></div>
                                {isOpen ? (<ul className={style.liste__contenue}>
                                    <li>robes</li>
                                </ul>) : <></>}
                            </li>
                            <li className={style.liste__categorie}>
                                <div className={style.liste__balise__titre}>
                                    <p>les accessoires</p>
                                    <img src={fleche} alt="menu déroulant" />
                                </div>
                                {isOpen ? (<ul className={style.liste__contenue}>
                                    <li>sacs</li>
                                    <li>bracelets</li>
                                    <li>bagues</li>
                                </ul>) : <></>}
                            </li>
                        </ul>
                    </div>
                    <div className={style.connexion}>
                        <p>Mon compte</p>
                        <img src={connexion} alt='test'/>
                    </div>
                </div>
                <Link to='/'>
                    <p className={style.logo}>Mille et une Merveilles</p>
                </Link>
                <div className={style.recherche}><img src={loupe} alt='recherche' /></div>
                <div className={style.panier}><img src={panier} alt='panier' /></div>
            </div>
        </header>
    )
}

export default Header;
