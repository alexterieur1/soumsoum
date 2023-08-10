import React from 'react'
import style from './panierAPI.module.scss'

const AjoutPanierLocalStorage = (panier, functionPanierLocal) => {
    console.log(functionPanierLocal)
    functionPanierLocal(panier)
    localStorage.setItem('panier', JSON.stringify(panier))
}

function PanierAPI({ index, quantite, panier, updateIndexPanier, updatePanierLocal }) {
    return (
        <div onClick={() => {
            AjoutPanierLocalStorage(panier, updatePanierLocal)
            updateIndexPanier(index)
            console.log(index)
        }
        } className={style.autrePanier} >
            <p>votre panier n°{index + 1}</p>
            <p>dans lequel vous avez {quantite} {quantite > 1 ? 'articles' : 'article'}</p>
        </div >
    )
}

export default PanierAPI;
