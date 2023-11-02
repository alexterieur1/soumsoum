import React, { useEffect, useState } from 'react';
import style from './ArticlePanier.module.scss'
import plus from '../../assets/plus.svg'
import moins from '../../assets/moins.svg'
//import { deletePanier } from '../../api';
//import Cookies from 'js-cookie';

const supprimerArticle = async (constpanierLocal, functionPanierLocal, index, updateindex) => {
    //let test = await deletePanier(panier.id, Cookies.get('userId'))
    let nouveauPanier = [...constpanierLocal]
    //updateindex(index)
    console.log(index)
    nouveauPanier.splice(index, 1)
    console.log(nouveauPanier)
    functionPanierLocal(nouveauPanier)
    localStorage.setItem('panier', JSON.stringify(nouveauPanier))
}
function Panier({ index, panier, quantite, updateindex, constpanierLocal, functionPanierLocal }) {
    let prixEuros = panier.prix.split('.')
    let prixReduit = String((Number(panier.prix) * ((100 - Number(panier.promotion)) / 100)).toFixed(2))
    let prixEurosSolde = prixReduit.split('.')
    const [number1, updateNumber1] = useState(panier.quantite)
    const [number2, updateNumber2] = useState(Number(panier.quantite) - 1)
    //let prixArticle = panier.prix.split('.')[0] + ',' + panier.prix.split('.')[1]
    const [prixTotal, updatePrixTotal] = useState((Number(panier.prix) * ((100 - Number(panier.promotion)) / 100)).toFixed(2))
    //permet de calculer le prix des différents éléments
    useEffect(() => {
        if (number1 > number2) {
            let prixTotalArrondi = 0
            panier.promotion !== 0 ? prixTotalArrondi = Number(prixReduit) * number1 : prixTotalArrondi = panier.prix * number1

            console.log(panier.promotion, prixTotalArrondi, Number(prixReduit))
            if (prixTotalArrondi / 100 >= 1) {
                console.log(prixTotalArrondi)
                prixTotalArrondi = prixTotalArrondi.toPrecision(5)
                updatePrixTotal(prixTotalArrondi.split('.')[0] + ',' + prixTotalArrondi.split('.')[1])
                quantite(number1)
                updateindex(index)
                updateNumber2(number1)
            }
            else {
                console.log(prixTotalArrondi)
                prixTotalArrondi = prixTotalArrondi.toPrecision(4)
                updatePrixTotal(prixTotalArrondi.split('.')[0] + ',' + prixTotalArrondi.split('.')[1])
                quantite(number1)
                updateindex(index)
                updateNumber2(number1)
            }

        }
        /* diminution */
        if (number1 < number2) {
            let prixTotalArrondi = 0
            panier.promotion !== 0 ? prixTotalArrondi = Number(prixReduit) * number1 : prixTotalArrondi = panier.prix * number1
            if (prixTotalArrondi / 100 >= 1) {
                console.log(prixTotalArrondi)
                prixTotalArrondi = prixTotalArrondi.toPrecision(5)
                updatePrixTotal(prixTotalArrondi.split('.')[0] + ',' + prixTotalArrondi.split('.')[1])
                quantite(number1)
                updateindex(index)
                updateNumber2(number1)
            }
            else {
                prixTotalArrondi = prixTotalArrondi.toPrecision(4)
                updatePrixTotal(prixTotalArrondi.split('.')[0] + ',' + prixTotalArrondi.split('.')[1])
                quantite(number1)
                updateindex(index)
                updateNumber2(number1)
            }
            if (number1 === 0) {
                supprimerArticle(constpanierLocal, functionPanierLocal, index, updateindex)
            }
        }
    }, [number1, number2, panier.prix, quantite, index, prixTotal, updateindex, panier.quantite, panier.promotion, prixReduit, constpanierLocal, functionPanierLocal])
    useEffect(() => {
        updateNumber1(panier.quantite)
    }, [panier])
    return (
        <div className={style.article} id={index}>
            <div className={style.article_main}>
                <div className={style.article__image}>
                    <img className={style.article__image__contenu} src={panier.photoPrincipal} alt="article 1 panier" />
                </div>
                <div>
                    <div className={style.description}>
                        <p className={style.description__titre}>{panier.nomProduit}</p>
                        {panier.promotion !== 0 ?
                            <div className={style.promotion_prix}>
                                <p className={style.prix}>{prixEurosSolde[0]},{prixEurosSolde[1]} €</p>
                                <p className={style.prix_solde}>{prixEuros[0]},{prixEuros[1]} €</p>
                            </div>
                            : <p className={style.prix}>{prixEuros[0]},{prixEuros[1] ? prixEuros[1] : '00'} €</p>}
                        <div className={style.quantite}>
                            <img onClick={() => {
                                if (number1 > 0) {
                                    updateNumber1(number1 - 1)
                                }
                            }} src={moins} alt='diminuer' />
                            <p>{number1}</p>
                            <img onClick={() => {
                                if (number1 < 10) {
                                    updateNumber1(number1 + 1)
                                }
                            }} src={plus} alt='augmenter' />
                        </div>
                        <p>Taille : {panier.taille}</p>
                        <button className={style.button} onClick={() => { supprimerArticle(constpanierLocal, functionPanierLocal, index, updateindex) }}>
                            Supprimer
                        </button>
                        <p>Total : {prixTotal} €</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Panier;
