import React, { useState } from 'react'
import style from './MonCompte.module.scss'
import { useLoaderData } from 'react-router-dom'
import { informationClient, getAllCommande, getAllProduit } from '../../api'
import Cookies from 'js-cookie'
import ListeCommande from '../../components/ListeCommande'

export async function loadData() {
    const produit = await getAllProduit()
    const infoClient = await informationClient(Cookies.get('userId'))
    const allCommande = await getAllCommande(Cookies.get('userId'))
    return { infoClient, allCommande, produit }
}/*
const envoiemail = async()=>{
    let test = await mailVerification(Cookies.get('userId'))
    console.log(test)
}*/

function MonCompte() {
    const { infoClient, allCommande, produit } = useLoaderData()
    const [affichage, updateAffichage] = useState(true)
    console.log(infoClient[1])
    console.log(allCommande)
    //envoiemail()
    return (
        <>
            {infoClient[1] === 200 ?
                <>
                    <div className={style.header}>
                        <p className={affichage ? style.header_selected : ''} onClick={() => updateAffichage(true)}>Mes informations</p>
                        <p className={affichage ? '' : style.header_selected} onClick={() => updateAffichage(false)}>mes commandes</p>
                    </div>
                    {infoClient ?
                        <div className={style.MonCompte_body}>
                            {affichage ?
                                <>
                                    <h2>informations Personnelles</h2>
                                    <div className={style.informationClient}>
                                        <div className={style.informationClient__element}>
                                            <p>Prénom : </p>
                                            <p>{infoClient[0].prenom}</p>
                                        </div>
                                        <div className={style.informationClient__element}>
                                            <p>Nom : </p>
                                            <p>{infoClient[0].nom}</p>
                                        </div>
                                        <div className={style.informationClient__element}>
                                            <p>Email : </p>
                                            <p>{infoClient[0].mail}</p>
                                        </div>
                                        <div className={style.informationClient__element}>
                                            <p>Numéro de téléphone : </p>
                                            <p>{infoClient[0].tel}</p>
                                        </div>
                                        <div className={style.informationClient__element}>
                                            <p>Date d'anniversaire : </p>
                                            <p>{infoClient[0].jours}/{infoClient[0].mois}/{infoClient[0].annee}</p>
                                        </div>

                                        <div className={style.informationClient__element}>
                                            {infoClient[0].verifier ?
                                                <>
                                                    <p>Mon adresse mail vérifié est : </p>
                                                    <p>{infoClient[0].mail}</p>
                                                </> :
                                                <>
                                                    <p>Vérifier mon adresse mail : </p>
                                                    <p>{infoClient[0].mail}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <h2>Mon adresse Postale</h2>
                                    <div className={style.informationClient}>
                                        <div className={style.informationClient__element}>
                                            <p>Prénom : </p>
                                            <p>{infoClient[0].adresse}</p>
                                        </div>
                                        <div className={style.informationClient__element}>
                                            <p>Code postal : </p>
                                            <p>{infoClient[0].codePostale}</p>
                                        </div>
                                        <div className={style.informationClient__element}>
                                            <p>Ville : </p>
                                            <p>{infoClient[0].ville}</p>
                                        </div>
                                    </div>

                                </>
                                : <>{
                                    allCommande.map((element, index) => {
                                        console.log(element, index)
                                        return (<ListeCommande commande={element} allProduit={produit} />)
                                    })
                                }</>}
                        </div>

                        : <p>chargement...</p>}
                </> :
                <>
                    <p>Vous n'etes pas connecté</p>
                </>
            }
        </>
    )
}

export default MonCompte;
