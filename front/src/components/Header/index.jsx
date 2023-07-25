import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import loupe from '../../assets/loupe.svg'
import panier from '../../assets/panier.svg'
import burger from '../../assets/burger.svg'
import logo from '../../assets/logo-header.webp'
//import connexion from '../../assets/connexion.svg'
import croix from '../../assets/croix.svg'
import { Link, useNavigate } from 'react-router-dom'
import { connexion, inscription, getCategorieRecherche, getAllProduit } from '../../api'
import ListeHeader from '../ListeHeader'
import Cookies from 'js-cookie'
import insta from '../../assets/instagram.svg'
import tiktok from '../../assets/tiktok.svg'
import snapchat from '../../assets/snapchat.svg'

const Rechercher = async (valeur) => {
    //initilisation

    let listeCategorie = await getCategorieRecherche()
    let listeProduit = await getAllProduit()
    let resultatListeCategroie = []
    let resultatProduitFiltre = []
    listeCategorie.map((element) => {
        if (element.includes(valeur)) {
            resultatListeCategroie.push(element)
        }
        return resultatListeCategroie
    })
    //filtre le tableau en fonction de l'input
    resultatListeCategroie.map((element) => {
        for (let i = 0; i < listeProduit.length; i++) {
            if (element.includes(listeProduit[i].nomProduit) || element.includes(listeProduit[i].sousCategorie) || element.includes(listeProduit[i].categorie)) {
                resultatProduitFiltre.push(listeProduit[i])
            }
        }
        return resultatProduitFiltre
    })
    //supprimer les doublons
    let objetsUniques = {}
    let tableauSansDoublons = resultatProduitFiltre.filter(objet => {
        if (!objetsUniques[objet.id]) {
            objetsUniques[objet.id] = true;
            return true;
        }
        return false;
    })
    return tableauSansDoublons
}
function Header() {
    const [isRecherche, updateIsRecherche] = useState(false)
    const [valeurRecherche, updateValeurRecherche] = useState('')
    const [listeProduitRecherche, updateListeProduitRecherche] = useState('')
    const [menu, updateMenu] = useState(false)
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
    const navigate = useNavigate()

    const envoieFormulaire = async (e) => {
        e.preventDefault()
        if (emailConnexion && passwordConnexion) {
            let objetConnexion = {
                "email": emailConnexion,
                "password": passwordConnexion
            }
            try {
                let cookieplayload = await connexion(objetConnexion)
                console.log(cookieplayload)
                Cookies.set('userId', cookieplayload)
                updateMenu(false)
                setisAuth(false)
                navigate('./')
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            let objetInscription = {
                "prenom": prenom,
                "nom": nom,
                "adresse": adresse,
                "codePostal": codePostal,
                "ville": ville,
                "numTel": numTel,
                "annee": anniv.split('-')[0],
                "mois": anniv.split('-')[1],
                "jours": anniv.split('-')[2],
                "email": emailInscription,
                "password": passwordInscription
            }
            try {
                let cookieplayload = await inscription(objetInscription)
                console.log(cookieplayload)
                Cookies.set('userId', cookieplayload)
                updateMenu(false)
                setisAuth(false)
                navigate('./')

            }
            catch (err) {
                console.log(err)
            }
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
    useEffect(() => {
        let testfunction = async () => {
            let resultRecherche = await Rechercher(valeurRecherche)
            updateListeProduitRecherche(resultRecherche)
        }
        testfunction()
    }, [valeurRecherche])
    return (
        <header>
            <div className={style.navbar}>
                <div onClick={() => updateMenu(menu => !menu)} className={style.menuBurger}>
                    <img src={burger} alt='menu' />
                </div>
                <div id='fondOpose' className={style.headerBalise__gauche__fondOpose} onClick={() => updateMenu(menu => !menu)}>
                </div>
                <div id='menu' className={style.headerBalise__gauche}>
                    <div className={style.logoETRS}>
                        <img className={style.headerBalise__gauche__logo} src={logo} alt='mille et une merveilles' />
                        <div className={style.listeRS}>
                            <Link to='https://www.instagram.com/mille_et_une_merveilles_shop/?hl=fr'>
                                <img className={style.liensRS} src={insta} alt="liens instagram" />
                            </Link>
                            <Link to='https://www.tiktok.com/@mille_et_une_merveilles_?_t=8c8BtszLbK7&_r=1'>
                                <img className={style.liensRS} src={tiktok} alt="liens tiktok" />
                            </Link>
                            <Link to='https://www.snapchat.com/add/m_unemerveilles?share_id=sXxolvhvQSWPjMjEJ7dMRA&locale=fr_FR&sid=b754a73b596143cb8e30275cab08d830'>
                                <img className={style.liensRS} src={snapchat} alt="liens snapchat" />
                            </Link>
                        </div>
                    </div>
                    <div className={style.liste}>
                        { }
                        <h3>Nouveautés</h3>
                        <h3>Promotions</h3>
                        <ul>
                            <ListeHeader titre="Vetements" elements={['Les Hauts', 'Les Bas', 'Les Ensembles']} />
                        </ul>
                        <h3>Accesoires</h3>
                        <ul>
                            <ListeHeader titre="Chaussures" elements={['Les Basket', 'Les sandales']} />
                        </ul>
                    </div>
                    <div className={style.connexion}>
                        {
                            Cookies.get('userId') ?
                                <Link to='/moncompte'>
                                    <h3 >Mon compte</h3>
                                </Link>
                                :
                                <h3 onClick={() => setisAuth(isAuth => !isAuth)}>Mon compte</h3>
                        }

                    </div>
                </div>
                {isRecherche ?
                    <span className={style.recherche__open}>
                        <input type="text" className={style.recherche__input} value={valeurRecherche} onChange={(e) => updateValeurRecherche(e.target.value)} />
                        {console.log(listeProduitRecherche)}
                        <span className={style.recherche__resultat}>
                            {valeurRecherche.length > 2 ?
                                listeProduitRecherche.length !== 0 ? listeProduitRecherche.map((element) =>
                                    <>
                                        <p>nom: {element.nomProduit}</p>
                                        <p>categorie: {element.categorie}</p>
                                        <p>prix: {element.prix}</p>
                                        <p>type: {element.sousCategorie}</p><br />
                                        {/* <img src={element.photoPrincipal} alt='article' /> */}

                                    </>
                                ) : <p>désoler, nous n'avons trouver aucun article pour {valeurRecherche}</p>
                                : <></>}
                        </span>
                    </span> : <Link to='/'>
                        <p className={style.logo}>Mille et une Merveilles</p>
                    </Link>}

                <div className={`${style.recherche}`}>
                    <img onClick={() => updateIsRecherche(isRecherche => !isRecherche)} src={loupe} alt='recherche' />

                </div>
                <Link to='./panier'>
                    <div className={style.panier}><img src={panier} alt='panier' /></div>
                </Link>
            </div>
            {isAuth ? (
                <div id='auth' className={style.auth}>
                    <img onClick={() => setisAuth(isAuth => !isAuth)} className={style.auth__croix} src={croix} alt='enlever' />
                    <div className={style.auth__formulaire__connexion}>
                        <p>Connectez-vous</p>
                        <form onSubmit={envoieFormulaire} className={style.formulaire}>
                            <label htmlFor='emailConnexion'>Email :</label>
                            <input name='emailConnexion' type='email' value={emailConnexion} onChange={(e) => setEmailConnexion(e.target.value)} />
                            <label htmlFor='passwordConnexion'>Mot de passe :</label>
                            <input name='passwordConnexion' type='password' value={passwordConnexion} onChange={(e) => setPasswordConnexion(e.target.value)} />
                            <button type='submit' >Se connecter</button>
                        </form >
                    </div>
                    <div className={style.auth__formulaire__inscription}>
                        <p>Inscrivez-vous</p>
                        <form onSubmit={envoieFormulaire} className={style.formulaire}>
                            <label htmlFor='prenom'>Prénom :</label>
                            <input name='prenom' value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                            <label htmlFor='nom' >Nom :</label>
                            <input name='nom' value={nom} onChange={(e) => setNom(e.target.value)} />
                            <label htmlFor='adress'>Adresse :</label>
                            <input name='adress' value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                            <label htmlFor='codePostal'>Code postal :</label>
                            <input name='codePostal' value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
                            <label htmlFor='city'>Ville :</label>
                            <input name='city' value={ville} onChange={(e) => setVille(e.target.value)} />
                            <label htmlFor='telephone'>N° de téléphone :</label>
                            <input name='telphone' type='tel' value={numTel} onChange={(e) => setNumtel(e.target.value)} />
                            <label htmlFor='dateAnniv'>Date anniversaire :</label>
                            <input name='dateAnniv' type='date' value={anniv} onChange={(e) => setAnniv(e.target.value)} />
                            <label type='emailInscription'>Email :</label>
                            <input name='emailInscription' type='email' value={emailInscription} onChange={(e) => setEmailInscription(e.target.value)} />
                            <label htmlFor='passwordInscription'>Mot de passe :</label>
                            <input name='passwordInscription' type='password' value={passwordInscription} onChange={(e) => setPasswordInscription(e.target.value)} />
                            <button type='submit'>S'inscire</button>
                        </form >
                    </div>
                </div>
            ) : <></>}
        </header>
    )
}

export default Header;
