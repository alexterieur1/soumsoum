import React from 'react'
import style from './panierAPI.module.scss'

const AjoutPanierLocalStorage = (panier, functionPanierLocal, idPanier) => {
    functionPanierLocal(panier)
    localStorage.setItem('panier', JSON.stringify(panier))
    localStorage.setItem('idPanier', JSON.stringify(idPanier))
    
}

function PanierAPI({ index, quantite, panier, updateIndexPanier, updatePanierLocal, idPanier}) {
    return (
        <div onClick={() => {
            AjoutPanierLocalStorage(panier, updatePanierLocal, idPanier)
            updateIndexPanier(index)
            console.log(index)
        }
        } className={style.autrePanier} id={`${index}`}>
            <p>votre panier n°{index + 1}</p>
            <p>dans lequel vous avez {quantite} {quantite > 1 ? 'articles' : 'article'}</p>
        </div >
    )
}

export default PanierAPI;
