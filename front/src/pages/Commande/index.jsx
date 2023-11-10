import React, { useState, useMemo, useEffect, useCallback } from 'react';
import style from './Commande.module.scss';
import { Link, useLoaderData } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
    getPanier,
    informationClient,
    getAllProduit,
    CommandePaypal,
    decompteCommandePaypal,
    pointRelais
} from '../../api';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import loupe from '../../assets/loupe.svg';

export async function loadData() {
    const panier = await getPanier(Cookies.get('userId'));
    const infoClient = await informationClient(Cookies.get('userId'));
    const infoProduit = await getAllProduit();
    console.log(panier);
    return { panier, infoClient, infoProduit };
}

// Fonction pour calculer le sous-total du panier
function sousTotal(panier) {
    let prixTotalArticle = 0;

    panier.forEach((element) => {
        if (element.promotion !== 0) {
            prixTotalArticle += (Number(element.prix) * ((100 - Number(element.promotion)) / 100)).toFixed(2) * element.quantite;
        } else {
            prixTotalArticle += Number(element.prix) * element.quantite;
        }
    });

    return prixTotalArticle;
}

function Commande() {
    const { infoClient, infoProduit } = useLoaderData();
    const panier = JSON.parse(localStorage.getItem('panier'));
    const [livraison, setLivraison] = useState('domicile');
    const [isChecked, setIschecked] = useState(false);
    const [codePostal, setCodePostal] = useState('00000');
    const [openMap, setOpenmap] = useState(false);
    const [markerArray, setMarkerArray] = useState([]);

    // Calcul des informations de produits
    const listeInfoProduit = useMemo(() => {
        const updatedListeInfoProduit = [];
        if (panier.length > 0) {
            panier.forEach((elementLocal) => {
                for (let i = 0; i < infoProduit.length; i++) {
                    if (elementLocal.produit === infoProduit[i].idProduit) {
                        const productInfo = { ...infoProduit[i] };
                        productInfo.quantite = elementLocal.quantite;
                        productInfo.taille = elementLocal.tailleProduit;
                        updatedListeInfoProduit.push(productInfo);
                    }
                }
            });
        }
        return updatedListeInfoProduit;
    }, [panier, infoProduit]);

    const total = sousTotal(listeInfoProduit);

    const customIcon = new Icon({
        iconUrl: require("../../assets/placeholder.png"),
        iconSize: [38, 38]
    });

    // Fonction asynchrone pour rechercher les relais
    const rechercheRelais = useCallback(async (code) => {
        try {
            const result = await pointRelais(code);
            let markers = []
            markers = result.map((element) => ({
                geocode: [element.results[0].latitude, element.results[0].longitude],
                popUp: `${element.results[0].caracteristique_du_site}`,
                adresse: `${element.results[0].adresse}, ${element.results[0].localite}, ${element.results[0].code_postal}`
            }));
            setOpenmap(true);
            console.log(markers);
            setMarkerArray(markers); // Mise à jour des marqueurs
        } catch (error) {
            console.error('Erreur lors de la recherche des relais :', error);
        }
    }, []);

    useEffect(() => {
        console.log(markerArray);
    }, [markerArray]);

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
                            {element.promotion !== 0 ?
                                <p>{(Number(element.prix) * ((100 - Number(element.promotion)) / 100)).toFixed(2) * element.quantite} € soit {(Number(element.prix) * ((100 - Number(element.promotion)) / 100)).toFixed(2)} € l'unité</p>
                                : <p>{element.prix * element.quantite} € soit {element.prix} € l'unité</p>}
                        </div>
                    </div>
                )}
                <div className={style.gridTotal}>
                    <div>
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
                            <p>livré a cette adresse : {}</p>
                        </form>
                        <div className={style.recapPrix}>
                            <p>sous-total : <span>{total.toFixed(2)} €</span></p>
                            <p>frais de port : <span>{livraison === 'domicile' ? '3.00€' : 'gratuit'}</span></p>
                            <p>sous-total : <span>{livraison === 'domicile' ? (total + 3).toFixed(2) : total.toFixed(2)} €</span></p>
                        </div>
                        <span className={style.validationCGV}>
                            <input id='cgv' type="checkbox" checked={isChecked} onChange={() => setIschecked(isChecked => !isChecked)} />
                            <label htmlFor="cgv"><p>Vous acceptez les <Link to={`/CGV`} className={style.liens_cgv}> conditions générales de ventes.</Link></p></label>
                        </span>
                    </div>
                    {isChecked ?
                        infoClient[0] ? (
                            <PayPalScriptProvider
                                style={{
                                    disableMaxWidth: true,
                                    width: '100%',
                                    height: '100vh'
                                }}
                                options={{
                                    "clientId": "Ae7Ncikmzv1zaXolykUCsDMSSnu5J5CavM9djOBzqYy23lM_GVgd5W-4Mq3g8K5_VW1dJ7NgZrvrps7k",
                                    currency: "EUR"
                                }}
                            >
                                <PayPalButtons style={{ layout: 'vertical', shape: 'pill' }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: livraison === 'domicile' ? (total + 3).toFixed(2) : total.toFixed(2)
                                                    }
                                                }
                                            ]
                                        });
                                    }}
                                    onApprove={async (data, actions) => {
                                        const details = await actions.order.capture();
                                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                                        CommandePaypal(Cookies.get('userId'), details.id, details.status, localStorage.getItem('panier'));
                                        decompteCommandePaypal(Cookies.get('userId'), localStorage.getItem('idPanier'), localStorage.getItem('panier'));
                                        localStorage.removeItem('idPanier');
                                        localStorage.setItem('panier', '[]');
                                        actions.redirect('http://192.168.1.56:3000/panier');
                                        console.log(details);
                                    }}
                                    onCancel={(data, actions) => {
                                        console.log(data, actions);
                                    }
                                    } />
                            </PayPalScriptProvider>
                        ) : (
                            <button className={style.button}>
                                Vous n'êtes pas connecté
                            </button>
                        )
                        : <></>
                    }
                </div>
            </div>
            {livraison === "relay" ?
                <div className={style.choixPointRelay}>
                    <p>Veuillez choisir votre point relais</p>
                    <span>
                        <input type='text' onChange={(e) => setCodePostal(e.target.value)} placeholder='75000' />
                        <img className={style.iconeMenu} onClick={() => rechercheRelais(codePostal)} src={loupe} alt='recherche' />
                    </span>
                    {openMap ? (
                        <>
                            <MapContainer className={style.test} center={markerArray[0].geocode} zoom={12}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {markerArray.length > 0 ? markerArray.map((marker, index) => (
                                    <Marker key={index} position={marker.geocode} icon={customIcon}>
                                        <Popup>{marker.popUp}</Popup>
                                    </Marker>
                                )) : <></>}
                            </MapContainer>
                            {console.log(markerArray)}
                            <div className={style.listePointRelais}>
                                {markerArray.map((marker, index) => (
                                    <p key={index}>{marker.adresse}</p>
                                )
                                )}
                            </div>
                        </>
                    ) : <></>}
                </div>
                : <></>
            }
        </>
    );
}

export default Commande;
