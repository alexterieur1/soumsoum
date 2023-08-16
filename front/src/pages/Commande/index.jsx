import React, { useState, useMemo } from 'react'
import style from './Commande.module.scss'
import { useLoaderData } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getPanier, informationClient, getAllProduit, CommandePaypal } from '../../api'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

export async function loadData() {
    const panier = await getPanier(Cookies.get('userId'))
    const infoClient = await informationClient(Cookies.get('userId'))
    const infoProduit = await getAllProduit()
    console.log(panier)
    return { panier, infoClient, infoProduit }
}

let prixTotalArticle = 0
const sousTotal = (panier) => {
    prixTotalArticle = 0
    panier.map((element) =>
        prixTotalArticle = prixTotalArticle + Number(element.prix) * element.quantite
    )
    return prixTotalArticle
}
/* 
const redirection = (data, actions) => {
    localStorage.setItem('testData', JSON.stringify(data))
    localStorage.setItem('testActions', JSON.stringify(actions))
    window.location.assign('/')
}
 */
function Commande() {
    const { infoClient, infoProduit } = useLoaderData()
    let panier = JSON.parse(localStorage.getItem('panier'))
    const [livraison, setLivraison] = useState('domicile')

    const listeInfoProduit = useMemo(() => {
        const updatedListeInfoProduit = []
        if (panier.length > 0) {
            panier.forEach((elementLocal) => {
                for (let i = 0; i < infoProduit.length; i++) {
                    if (elementLocal.produit === infoProduit[i].idProduit) {
                        let object = { ...infoProduit[i] }
                        object.quantite = elementLocal.quantite
                        object.taille = elementLocal.tailleProduit
                        updatedListeInfoProduit.push(object)
                    }
                }
            })
        }

        return updatedListeInfoProduit
    }, [panier, infoProduit])
    let total = sousTotal(listeInfoProduit)
    console.log(total, infoClient)
    return (
        <>
            <h1>Récapitulatif de la commande</h1>
            <div className={style.panier}>
                {listeInfoProduit.map((element, index) =>
                    <div key={index} className={style.element}>
                        <img className={style.element_image} src={element.photoPrincipal} alt={element.nomProduit} />
                        <div className={style.element_description}>
                            <p>{element.nomProduit}</p>
                            <p>Quantité: {element.quantite}</p>
                            <p>taille: {element.taille}</p>
                            <p>{element.prix * element.quantite} € soit {element.prix} € l'unité</p>
                        </div>
                    </div>

                )}
                <p>livraison</p>
                <form>
                    <fieldset className={style.livraison}>
                        <div className={style.livraison_element}>
                            <input type='radio' id='domicile' name='domicile' value='domicile' checked={livraison === 'domicile'} onChange={(e) => setLivraison(e.target.value)} />
                            <label className={style.livraison_description} htmlFor='domicile'>Livraison à domicile en 2 à 4 jours<span className={style.livraison_prix}>3 €</span></label>
                        </div>
                        <div className={style.livraison_element}>
                            <input type='radio' id='relay' name='relay' value='relay' checked={livraison === 'relay'} onChange={(e) => setLivraison(e.target.value)} />
                            <label className={style.livraison_description} htmlFor='relay'>Livraison en point relay en 2 à 4 jours<span className={style.livraison_prix}>gratuit</span></label>
                        </div>
                    </fieldset>
                </form>
                <div className={style.recapPrix}>
                    <p>sous-total : <span>{total} €</span></p>
                    <p>frais de port : <span>{livraison === 'domicile' ? '3.00€' : 'gratuit'}</span></p>
                    <p>sous-total : <span>{livraison === 'domicile' ? total + 3 : total} €</span></p>
                </div>
                {infoClient[0] ? <PayPalScriptProvider
                    style={
                        {
                            disableMaxWidth: true,
                            width: '100%',
                            height: '100vh'
                        }
                    }
                    options={{
                        "clientId":
                            "Ae7Ncikmzv1zaXolykUCsDMSSnu5J5CavM9djOBzqYy23lM_GVgd5W-4Mq3g8K5_VW1dJ7NgZrvrps7k",
                        currency: "EUR"
                    }}
                >
                    <PayPalButtons style={{ layout: 'vertical', shape: 'pill' }}
                        createOrder={(data, actions) => {
                            console.log(data, actions)
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: livraison === 'domicile' ? total + 3 : total
                                        }
                                    }
                                ]
                            })
                        }}
                        onApprove={(data, actions) => {
                            actions.order.capture().then((details) => {
                                console.log(`Transaction completed by ${details.payer.name.given_name}`);
                                //actions.redirect('http://192.168.1.56:3000/panier')
                            })
                            actions.order.capture().then((details) => {
                                CommandePaypal(Cookies.get('userId'), details.id, details.status, localStorage.getItem('panier'))
                                //actions.redirect('http://192.168.1.56:3000/#')
                                console.log(details)
                            })
                            actions.order.get().then((details) => {
                                console.log(details)
                            })
                        }}
                        onCancel={(data, actions) => {
                            console.log(data, actions)
                        }} />
                </PayPalScriptProvider>
                    : <button className={style.button}>
                        Vous n'etes pas connecté
                    </button>}

            </div >

        </>
    )
}

export default Commande;
