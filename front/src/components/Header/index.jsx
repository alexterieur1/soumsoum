import React, { useEffect, useState } from 'react';
import fleche from '../../assets/fleche_bas.svg'
import style from './Header.module.scss'
import loupe from '../../assets/loupe.svg'
import panier from '../../assets/panier.svg'
import burger from '../../assets/burger.svg'
import logo from '../../assets/logo-header.webp'
//import connexion from '../../assets/connexion.svg'
import croix from '../../assets/croix.svg'
import { Link } from 'react-router-dom'
import { connexion } from '../../api';



function Header() {
    const [menu, updateMenu] = useState(false)
    const [isOpen, setisOpen] = useState(false)
    const [isAuth, setisAuth] = useState(false)
    const [emailConnexion, setEmailConnexion] = useState('')
    const [passwordConnexion, setPasswordConnexion] = useState('')
    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [adresse, setAdresse] = useState('')
    const [codePostal, setCodePostal] = useState('')
    const [ville, setVille] = useState('')
    const [numTel, setNumtel] = useState('')
    const [anniv, setAnniv] = useState('')
    const [emailInscription, setEmailInscription] = useState('')
    const [passwordInscription, setPasswordInscription] = useState('')

    const envoieFormulaire = () => {
        if(emailConnexion && passwordConnexion){
            let objetConnexion = {
                "email": emailConnexion,
                "password": passwordConnexion
            }
            connexion(objetConnexion)
        }
        else{
            let objetInscription = {
                "prenom": prenom,
                "nom": nom,
                "adresse": adresse,
                "codePostal": codePostal,
                "ville": ville,
                "numTel": numTel,
                "anniv": anniv,
                "email": emailInscription,
                "password": passwordInscription
            }
            return objetInscription
        }
    }

    useEffect(() => {
        var menudiv = document.getElementById('menu')
        let menuAutreFond = document.getElementById('fondOpose')
        if (menu) {
            menudiv.classList.add(`${style.headerBalise__gauche__animationOuverture}`)
            menudiv.classList.remove(`${style.headerBalise__gauche__fermeture}`)
            menuAutreFond.classList.remove(`${style.headerBalise__gauche__fondOpose__ouvert}`)
            menuAutreFond.classList.add(`${style.headerBalise__gauche__fondOpose__fermer}`)
        }
        else {
            menudiv.classList.add(`${style.headerBalise__gauche__fermeture}`)
            menudiv.classList.remove(`${style.headerBalise__gauche__animationOuverture}`)
            menuAutreFond.classList.add(`${style.headerBalise__gauche__fondOpose__ouvert}`)
            menuAutreFond.classList.remove(`${style.headerBalise__gauche__fondOpose__fermer}`)
        }
    }, [menu, isAuth])
    return (
        <header>
            <div className={style.navbar}>
                <div onClick={() => updateMenu(menu => !menu)} className={style.menuBurger}>
                    <img src={burger} alt='menu' />
                </div>
                <div id='fondOpose' className={style.headerBalise__gauche__fondOpose} onClick={() => updateMenu(menu => !menu)}>
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
                        <p onClick={() => setisAuth(isAuth => !isAuth)}>Mon compte</p>
                    </div>
                </div>
                <Link to='/'>
                    <p className={style.logo}>Mille et une Merveilles</p>
                </Link>
                <div className={style.recherche}><img src={loupe} alt='recherche' /></div>
                <div className={style.panier}><img src={panier} alt='panier' /></div>
            </div>
            {isAuth ? (
                <div id='auth' className={style.auth}>
                    <img onClick={() => setisAuth(isAuth => !isAuth)} className={style.auth__croix} src={croix} alt='enlever' />
                    <div className={style.auth__formulaire__connexion}>
                        <p>Connectez-vous</p>
                        <form className={style.formulaire}>
                            <label for='emailConnexion'>email :</label>
                            <input name='emailConnexion' type='email' value={emailConnexion} onChange={(e) => setEmailConnexion(e.target.value)} />
                            <label for='passwordConnexion'>mot de passe :</label>
                            <input name='passwordConnexion' type='password' value={passwordConnexion} onChange={(e) => setPasswordConnexion(e.target.value)} />
                            <button type='button' onClick={envoieFormulaire} value='se connecter'>se connecter</button>
                        </form >
                    </div>
                    <div className={style.auth__formulaire__inscription}>
                        <p>Inscrivez-vous</p>
                        <form className={style.formulaire}>
                            <label for='prenom'>prénom :</label>
                            <input name='prenom' value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                            <label for='nom' >nom :</label>
                            <input name='nom' value={nom} onChange={(e) => setNom(e.target.value)} />
                            <label for='adress'>adresse :</label>
                            <input name='adress' value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                            <label for='codePostal'>code postal :</label>
                            <input name='codePostal' value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
                            <label for='city'>ville :</label>
                            <input name='city' value={ville} onChange={(e) => setVille(e.target.value)} />
                            <label for='telephone'>n° de téléphone :</label>
                            <input name='telphone' type='tel' value={numTel} onChange={(e) => setNumtel(e.target.value)} />
                            <label for='dateAnniv'>date anniversaire :</label>
                            <input name='dateAnniv' type='date' value={anniv} onChange={(e) => setAnniv(e.target.value)} />
                            <label type='emailInscription'>email :</label>
                            <input name='emailInscription' type='email' value={emailInscription} onChange={(e) => setEmailInscription(e.target.value)} />
                            <label for='passwordInscription'>mot de passe :</label>
                            <input name='passwordInscription' type='password' value={passwordInscription} onChange={(e) => setPasswordInscription(e.target.value)} />
                            <button type='button' onClick={envoieFormulaire} value="s'inscire">s'inscire</button>
                        </form >
                    </div>
                </div>
            ) : <></>}
        </header>
    )
}

export default Header;
