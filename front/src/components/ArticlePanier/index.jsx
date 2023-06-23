import React, { useEffect, useState } from 'react';
import style from './ArticlePanier.module.scss'
import plus from '../../assets/plus.svg'
import moins from '../../assets/moins.svg'
import { getPanier } from '../../api';

const supprimerArticle = async () =>{
    let panier = await getPanier(panier.id)
    console.log(panier)
}
function Panier({ index, panier, quantite, updateindex }) {
    const [number1, updateNumber1] = useState(panier.quantite)
    const [number2, updateNumber2] = useState(Number(panier.quantite) - 1)
    let prixArticle = panier.prix.split('.')[0] + ',' + panier.prix.split('.')[1]
    const [prixTotal, updatePrixTotal] = useState(prixArticle)
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
    }, [number1, number2, panier.prix, quantite, index, prixTotal, updateindex])
    return (
        <div className={style.article}>
            <div className={style.article__image}>
                <img className={style.article__image__contenu} src={panier.liens} alt="article 1 panier" />
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
                    <button className={style.button} onClick={supprimerArticle}>
                        Supprimer
                    </button>
                    <p>Total : {prixTotal} €</p>
                </div>
            </div>
        </div>
    )
}

export default Panier;
