import React, { useState } from 'react'
import style from './MonCompte.module.scss'
import { useLoaderData } from 'react-router-dom'
import { informationClient } from '../../api'
import Cookies from 'js-cookie'

export async function loadData() {
    const infoClient = await informationClient(Cookies.get('userId'))
    console.log(infoClient)
    return { infoClient }
}

function MonCompte() {
    const { infoClient } = useLoaderData()
    const [affichage, updateAffichage] = useState(true)
    console.log(infoClient[1])
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
                                    </div>
                                    <h2>informations Personnelles</h2>
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
                                        <div className={style.informationClient__element}>
                                            <p>Numéro de téléphone : </p>
                                            <p>{infoClient[0].tel}</p>
                                        </div>
                                        <div className={style.informationClient__element}>
                                            <p>Date d'anniversaire : </p>
                                            <p>{infoClient[0].jours}/{infoClient[0].mois}/{infoClient[0].annee}</p>
                                        </div>
                                    </div>

                                </>
                                : <></>}
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
