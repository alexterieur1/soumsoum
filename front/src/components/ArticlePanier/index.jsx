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
    const [number1, updateNumber1] = useState(panier.quantite)
    const [number2, updateNumber2] = useState(Number(panier.quantite) - 1)
    let prixArticle = panier.prix.split('.')[0] + ',' + panier.prix.split('.')[1]
    const [prixTotal, updatePrixTotal] = useState(prixArticle)
    //permet de calculer le prix des différents éléments
    useEffect(() => {
        if (number1 > number2) {
            let prixTotalArrondi = panier.prix * number1
            if (prixTotalArrondi / 100 >= 1) {
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

        }
        if (number1 < number2) {
            let prixTotalArrondi = panier.prix * number1
            if (prixTotalArrondi / 100 >= 1) {
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
        }
    }, [number1, number2, panier.prix, quantite, index, prixTotal, updateindex, panier.quantite])
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
                        <p className={style.description__prix}>{prixArticle} €</p>
                        <div className={style.quantite}>
                            <img onClick={() => {
                                if (number1 > 1) {
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
                        <button className={style.button} onClick={() => { supprimerArticle(constpanierLocal, functionPanierLocal, index, updateindex); console.log('test') }}>
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
