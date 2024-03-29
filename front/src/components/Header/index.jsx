import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import loupe from '../../assets/loupe.svg'
import panier from '../../assets/panier.svg'
import burger from '../../assets/burger.svg'
import logo from '../../assets/logo-header.webp'
//import connexion from '../../assets/connexion.svg'
import croix from '../../assets/croix.svg'
import { Link, useNavigate } from 'react-router-dom'
import { connexion, inscription, getCategorieRecherche, getAllProduit, deconnexion } from '../../api'
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

    const [emailConnexionregex, setEmailConnexionregex] = useState(false)
    const [passwordConnexionregex, setPasswordConnexionregex] = useState(false)
    const [prenomregex, setPrenomregex] = useState(false)
    const [nomregex, setNomregex] = useState(false)
    const [adresseregex, setAdresseregex] = useState(false)
    const [codePostalregex, setCodePostalregex] = useState(false)
    const [villeregex, setVilleregex] = useState(false)
    const [numTelregex, setNumtelregex] = useState(false)
    const [annivregex, setAnnivregex] = useState(false)
    const [emailInscriptionregex, setEmailInscriptionregex] = useState(false)
    const [passwordInscriptionregex, setPasswordInscriptionregex] = useState(false)

    const [emailConnexionfocus, setEmailConnexionfocus] = useState(false)
    const [passwordConnexionfocus, setPasswordConnexionfocus] = useState(false)
    const [prenomfocus, setPrenomfocus] = useState(false)
    const [nomfocus, setNomfocus] = useState(false)
    const [adressefocus, setAdressefocus] = useState(false)
    const [codePostalfocus, setCodePostalfocus] = useState(false)
    const [villefocus, setVillefocus] = useState(false)
    const [numTelfocus, setNumtelfocus] = useState(false)
    const [annivfocus, setAnnivfocus] = useState(false)
    const [emailInscriptionfocus, setEmailInscriptionfocus] = useState(false)
    const [passwordInscriptionfocus, setPasswordInscriptionfocus] = useState(false)

    const [etatConnexion, setEtatconnexion] = useState([])

    const navigate = useNavigate()

    const envoieFormulaire = async (e) => {
        e.preventDefault()
        if (e.target.id === 'connexion') {
            if (emailConnexionregex && passwordConnexionregex && emailConnexion && passwordConnexion) {
                let objetConnexion = {
                    "email": emailConnexion,
                    "password": passwordConnexion
                }
                try {
                    let cookieplayload = await connexion(objetConnexion)
                    if (cookieplayload[0]) {
                        console.log(cookieplayload)
                        Cookies.set('userId', cookieplayload[1])
                        updateMenu(false)
                        setisAuth(false)
                        navigate('./')
                    }
                    else {
                        setEtatconnexion(cookieplayload)
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            else {
                setEtatconnexion([false, "un des champs n'est pas rempli", "connexion"])
            }
        }
        if (e.target.id === 'inscription') {
            console.log(prenomregex, nomregex, adresseregex, codePostalregex, villeregex, numTelregex, annivregex, emailInscriptionregex, passwordInscriptionregex)
            if (prenomregex && nomregex && adresseregex && codePostalregex && villeregex && numTelregex && annivregex && emailInscriptionregex && passwordInscriptionregex && prenom && nom && adresse && codePostal && ville && numTel && anniv && emailInscription && passwordInscription) {
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
                    if (cookieplayload[0]) {
                        console.log(cookieplayload)
                        Cookies.set('userId', cookieplayload[1])
                        updateMenu(false)
                        setisAuth(false)
                        navigate('./')
                    }
                    else {
                        setEtatconnexion(cookieplayload)
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            else {
                setEtatconnexion([false, "un des champs n'est pas rempli", "inscription"])
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

    useEffect(() => {
        //console.log(Boolean(emailConnexion.length < 1), emailConnexionfocus)
        if (emailConnexion.length < 1 || emailConnexionfocus) {
            setEmailConnexionregex(true)
        } else {
            setEmailConnexionregex(/^[a-zA-Z-0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(emailConnexion))
        }
        if (passwordConnexion.length < 1 || passwordConnexionfocus) {
            setPasswordConnexionregex(true)
        } else {
            setPasswordConnexionregex(/^[a-zA-Z-0-9]{8,}$/.test(passwordConnexion))
        }
        if (prenom.length < 1 || prenomfocus) {
            setPrenomregex(true)
        } else {
            setPrenomregex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(prenom))
        }
        if (nom.length < 1 || nomfocus) {
            setNomregex(true)
        } else {
            setNomregex(/[a-zA-Z- ]{3,}/.test(nom))
        }
        if (adresse.length < 1 || adressefocus) {
            setAdresseregex(true)
        } else {
            setAdresseregex(/^\d+\s(?:rue|route|chemin)\s[a-zA-Zéèî\s]+$/.test(adresse))
        }
        if (codePostal.length < 1 || codePostalfocus) {
            setCodePostalregex(true)
        } else {
            setCodePostalregex(/^\d{5}$/.test(codePostal))
        }
        if (ville.length < 1 || villefocus) {
            setVilleregex(true)
        } else {
            setVilleregex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(ville))
        }
        if (numTel.length < 1 || numTelfocus) {
            setNumtelregex(true)
        } else {
            setNumtelregex(/^0+\d{9}/.test(numTel))
        }
        if (anniv.length < 1 || annivfocus) {
            setAnnivregex(true)
        } else {
            setAnnivregex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/gm.test(anniv))
        }
        if (emailInscription.length < 1 || emailInscriptionfocus) {
            setEmailInscriptionregex(true)
        } else {
            setEmailInscriptionregex(/^[a-zA-Z-0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/gm.test(emailInscription))
        }
        if (passwordInscription.length < 1 || passwordInscriptionfocus) {
            setPasswordInscriptionregex(true)
        } else {
            setPasswordInscriptionregex(/^[a-zA-Z-0-9]{8,}$/.test(passwordInscription))
        }
    }, [emailConnexion, passwordConnexion, prenom, nom, adresse, codePostal, ville, numTel, anniv, emailInscription, passwordInscription, emailConnexionfocus, passwordConnexionfocus, prenomfocus, nomfocus, adressefocus, codePostalfocus, villefocus, numTelfocus, annivfocus, emailInscriptionfocus, passwordInscriptionfocus])
    return (
        <header>
            <div className={style.navbar}>
                <div onClick={() => updateMenu(menu => !menu)} className={style.menuBurger}>
                    <img className={style.iconeMenu} src={burger} alt='menu' />
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
                    <div className={style.element_header}>
                        <div className={style.liste}>
                            <Link to='/nouveau'>
                                <h3>Nouveautées</h3>
                            </Link><Link to={`./article/promotions`}>
                                <h3>Promotions</h3>
                            </Link>
                            <ul>
                                <ListeHeader titre="Vetements" elements={['Les Hauts', 'Les Bas', 'Les Ensembles']} />
                            </ul>
                            <Link to={`./article/accesoires`}>
                                <h3>Accesoires</h3>
                            </Link>
                            <ul>
                                <ListeHeader titre="Chaussures" elements={['Les Baskets', 'Les Sandales']} />
                            </ul>
                        </div>
                        <div className={style.connexion}>
                            {
                                Cookies.get('userId') ?
                                    <>
                                        <Link to='/moncompte'>
                                            <h3 >Mon compte</h3>
                                        </Link>
                                        <h3 onClick={() => {
                                            console.log(isAuth)
                                            deconnexion()
                                            localStorage.removeItem('idPanier')
                                            Cookies.remove('userId')
                                            window.location.reload()
                                        }}>je me déconnecte</h3>
                                    </>
                                    :
                                    <h3 onClick={() => setisAuth(isAuth => !isAuth)}>Je me connecte</h3>
                            }

                        </div>
                    </div>
                </div>
                {isRecherche ?
                    <span className={style.recherche__open}>
                        <input type="text" className={style.recherche__input} placeholder='Rechercher' value={valeurRecherche} onChange={(e) => updateValeurRecherche(e.target.value)} />
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
                    <img className={style.iconeMenu} onClick={() => updateIsRecherche(isRecherche => !isRecherche)} src={loupe} alt='recherche' />
                </div>
                <Link to='./panier'>
                    <div><img className={style.iconeMenu} src={panier} alt='panier' /></div>
                </Link>
            </div>
            {
                isAuth ? (
                    <div id='auth' className={style.auth}>
                        <img onClick={() => setisAuth(isAuth => !isAuth)} className={style.auth__croix} src={croix} alt='enlever' />
                        <div className={style.auth__formulaire__connexion}>
                            <p>Connectez-vous</p>
                            <form id='connexion' onSubmit={envoieFormulaire} className={style.formulaire}>
                                <label htmlFor='emailConnexion'>Email :</label>
                                <input name='emailConnexion' type='email' onFocus={() => setEmailConnexionfocus(true)} onBlur={() => setEmailConnexionfocus(false)} value={emailConnexion} onChange={(e) => setEmailConnexion(e.target.value)} />
                                {emailConnexionregex ? <></> : <p>Veuillez inscire une adresse mail valide</p>}
                                <label htmlFor='passwordConnexion'>Mot de passe :</label>
                                <input name='passwordConnexion' type='password' onFocus={() => setPasswordConnexionfocus(true)} onBlur={() => setPasswordConnexionfocus(false)} value={passwordConnexion} onChange={(e) => setPasswordConnexion(e.target.value)} />
                                {passwordConnexionregex ? <></> : <p>Veuillez inscire un mot de passe valide</p>}
                                <button type='submit' >Se connecter</button>
                                {(etatConnexion.length !== 0 && etatConnexion[2] === 'connexion') ? <p>{etatConnexion[1]}</p> : <></>}

                            </form >
                        </div>
                        <div className={style.auth__formulaire__inscription}>
                            <p>Inscrivez-vous</p>
                            <form id='inscription' onSubmit={envoieFormulaire} className={style.formulaire}>
                                <label htmlFor='prenom'>Prénom :</label>
                                <input name='prenom' onFocus={() => setPrenomfocus(true)} onBlur={() => setPrenomfocus(false)} value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                {prenomregex ? <></> : <p>Veuillez inscire un prénom valide</p>}
                                <label htmlFor='nom' >Nom :</label>
                                <input name='nom' onFocus={() => setNomfocus(true)} onBlur={() => setNomfocus(false)} value={nom} onChange={(e) => setNom(e.target.value)} />
                                {nomregex ? <></> : <p>Veuillez inscire un nom valide</p>}
                                <label htmlFor='adress'>Adresse :</label>
                                <input name='adress' onFocus={() => setAdressefocus(true)} onBlur={() => setAdressefocus(false)} value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                                {adresseregex ? <></> : <p>Veuillez inscire une adresse valide</p>}
                                <label htmlFor='codePostal'>Code postal :</label>
                                <input name='codePostal' onFocus={() => setCodePostalfocus(true)} onBlur={() => setCodePostalfocus(false)} value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
                                {codePostalregex ? <></> : <p>Veuillez inscire un code Postal valide</p>}
                                <label htmlFor='city'>Ville :</label>
                                <input name='city' onFocus={() => setVillefocus(true)} onBlur={() => setVillefocus(false)} value={ville} onChange={(e) => setVille(e.target.value)} />
                                {villeregex ? <></> : <p>Veuillez inscire une ville valide</p>}
                                <label htmlFor='telephone'>N° de téléphone :</label>
                                <input name='telphone' type='tel' onFocus={() => setNumtelfocus(true)} onBlur={() => setNumtelfocus(false)} value={numTel} onChange={(e) => setNumtel(e.target.value)} />
                                {numTelregex ? <></> : <p>Veuillez inscire un numéro de téléphone valide</p>}
                                <label htmlFor='dateAnniv'>Date anniversaire :</label>
                                <input name='dateAnniv' type='date' onFocus={() => setAnnivfocus(true)} onBlur={() => setAnnivfocus(false)} value={anniv} onChange={(e) => setAnniv(e.target.value)} />
                                {annivregex ? <></> : <p>Veuillez inscire un date d'anniversaire valide</p>}
                                <label type='emailInscription'>Email :</label>
                                <input name='emailInscription' type='email' onFocus={() => setEmailInscriptionfocus(true)} onBlur={() => setEmailInscriptionfocus(false)} value={emailInscription} onChange={(e) => setEmailInscription(e.target.value)} />
                                {emailInscriptionregex ? <></> : <p>Veuillez inscire une adresse mail valide</p>}
                                <label htmlFor='passwordInscription'>Mot de passe :</label>
                                <input name='passwordInscription' type='password' onFocus={() => setPasswordInscriptionfocus(true)} onBlur={() => setPasswordInscriptionfocus(false)} value={passwordInscription} onChange={(e) => setPasswordInscription(e.target.value)} />
                                {passwordInscriptionregex ? <></> : <p>Veuillez inscire un mot de passe valide</p>}
                                <button type='submit'>S'inscire</button>
                                {console.log(etatConnexion)}
                                {console.log(Boolean(etatConnexion.length !== 0), Boolean(etatConnexion[2] === 'connexion'))}
                                {console.log(Boolean(etatConnexion.length !== 0), Boolean(etatConnexion[2] === 'inscription'))}
                                {etatConnexion.length !== 0 && etatConnexion[2] === 'inscription' ? <p>{etatConnexion[1]}</p> : <></>}
                            </form >
                        </div>
                    </div>
                ) : <></>
            }
        </header >
    )
}

export default Header;
