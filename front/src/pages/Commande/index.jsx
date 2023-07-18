import React, { useState } from 'react'
import style from './Commande.module.scss'
import { useLoaderData } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getPanier, informationClient } from '../../api'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

export async function loadData() {
    const panier = await getPanier(Cookies.get('userId'))
    const infoClient = await informationClient(Cookies.get('userId'))
    console.log(panier)
    return { panier, infoClient }
}

let prixTotalArticle = 0
const sousTotal = (panier) => {
    panier.map((element) =>
        prixTotalArticle = prixTotalArticle + element.prix * element.quantite
    )
    return prixTotalArticle / 2
}

function Commande() {
    const { panier, infoClient } = useLoaderData()
    let total = sousTotal(panier)
    console.log(total, infoClient)
    const [livraison, setLivraison] = useState('domicile')


    return (
        <>
            <h1>Récapitulatif de la commande</h1>
            <div className={style.panier}>
                {panier.map((element, index) =>
                    <div key={index} className={style.element}>
                        <img className={style.element_image} src={element.liens} alt={element.nomProduit} />
                        <div className={style.element_description}>
                            <p>{element.nomProduit}</p>
                            <p>Quantité: {element.quantite}</p>
                            <p>taille: {element.taille}</p>
                            <p>{element.prix} €</p>
                        </div>
                    </div>

                )}
                <p>livraison</p>
                <form>
                    <fieldset className={style.livraison}>
                        <div className={style.livraison_element}>
                            <input type='radio' id='domicile' name='domicile' value='domicile' checked={livraison === 'domicile'} onChange={(e) => setLivraison(e.target.value)} />
                            <label className={style.livraison_description} htmlFor='domicile'>Livraison à domicile en 2 à 4 jours<span className={style.livraison_prix}>gratuit</span></label>
                        </div>
                        <div className={style.livraison_element}>
                            <input type='radio' id='relay' name='relay' value='relay' checked={livraison === 'relay'} onChange={(e) => setLivraison(e.target.value)} />
                            <label className={style.livraison_description} htmlFor='relay'>Livraison en point relay en 2 à 4 jours<span className={style.livraison_prix}>gratuit</span></label>
                        </div>
                    </fieldset>
                </form>
                <div className={style.recapPrix}>
                    <p>sous-total : <span>{total} €</span></p>
                    <p>frais de port : <span>gratuit</span></p>
                    <p>sous-total : <span>{total} €</span></p>
                </div>
                     <PayPalScriptProvider
                        style={
                            {
                                disableMaxWidth: true,
                                width: '100%',
                                height:'100vh'
                            }
                        }
                        options={{
                            "clientId":
                                "Ae7Ncikmzv1zaXolykUCsDMSSnu5J5CavM9djOBzqYy23lM_GVgd5W-4Mq3g8K5_VW1dJ7NgZrvrps7k"
                        }}
                    >
                        <PayPalButtons style={{ layout: 'vertical', shape: 'pill' }}
                            createOrder={(data, actions) => {
                                console.log(data, actions)
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "20.00",
                                            }
                                        }
                                    ]
                                })
                            }}
                            onApprove={(data, actions) => {
                                console.log(actions)
                                console.log(data)
                                return actions.order.capture().then((details) => {
                                    console.log(`Transaction completed by ${details.payer.name.given_name}`)
                                    console.log(details);
                                });
                            }}
                            onCancel={(data, actions) => {
                                console.log(data, actions)
                            }} />
                    </PayPalScriptProvider> 
            </div >

        </>
    )
}

export default Commande;
