import React, { useState } from 'react'
import style from './ListeCommande.module.scss'

function MonCompte({ commande }) {
    const [isOpen, setisopen] = useState(false)
    let listeCommande = JSON.parse(commande.article)
    return (
        <div className={style.Commande}>
            <span className={style.Commande_header}>
                <p>commande numéro {commande.idCommande}</p>
                <svg onClick={() => setisopen(isOpen => !isOpen)} className={style.fleche_bas} viewBox="0 0 175 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 49L88 99L138 49" stroke="white" stroke-width="6" stroke-linecap="round" />
                </svg>
            </span>
            {isOpen ?
                listeCommande.map((element, index) => {
                    return (
                        <p>{element.produit}</p>
                    )
                })
                :
                <></>}
        </div>
    )
}

export default MonCompte;
