import React from 'react';
import style from './HeaderAccueil.module.scss'
import loupe from '../../assets/loupe.svg'
import panier from '../../assets/panier.svg'
import burger from '../../assets/burger.svg'
import Carousel from '../Carousel'
import { useState } from 'react'

function menuBurger(){
    var menu = document.getElementById('menu')
    let valeurWidth = 0
    const widthMenu = setInterval(() => {
        menu.style.width = `${valeurWidth}vw`
        console.log(`${valeurWidth} vw`)
        console.log(menu)
        valeurWidth++
        if(valeurWidth === 80){
            clearInterval(widthMenu)
        }
    }, 5)
}

function HeaderAccueil() {
    const [menu, updateMenu] = useState(false)
    return (
        <header>
            {menu ? (
                <div  id='menu' className={style.headerBalise__gauche}>
                    <p onClick={() => {updateMenu(false)}}>aurevoir</p>
                </div>
            ) : (
                <></>
            )}
            <div className={style.navbar}>
                <div onClick={() => {setTimeout(menuBurger,0);updateMenu(true)}} className={style.menuBurger}>
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
