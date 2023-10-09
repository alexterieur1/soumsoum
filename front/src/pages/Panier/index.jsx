import React, { useEffect, useState, useMemo } from 'react'
import style from './Panier.module.scss'
import { getAllProduit, getPanier, addPanier } from '../../api'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Article from '../../components/ArticlePanier'
import Cookies from 'js-cookie'
import ListePanierAPI from '../../components/panierAPI'

let array = []
const prixTotalArrondi = (prixInitial) => {
    if (prixInitial / 1000 >= 1) {
        let prixArrondi = prixInitial.toPrecision(6)
        let prixMilier = String((prixArrondi / 1000).toFixed(3))
        /* console.log(prixArrondi)
        console.log(String(prixMilier)) */
        return prixMilier.split('.')[0] + ' ' + prixMilier.split('.')[1] + ',' + prixArrondi.split('.')[1]
    }
    if (prixInitial / 100 >= 1) {
        let prixArrondi = prixInitial.toPrecision(5)
        return prixArrondi.split('.')[0] + ',' + prixArrondi.split('.')[1]
    }
    else {
        let prixArrondi = prixInitial.toPrecision(4)
        return prixArrondi.split('.')[0] + ',' + prixArrondi.split('.')[1]
    }
}
const arrayQuantitePrix = (panierLocal, panierLocalStorage) => {
    //console.log(panierLocal)
    let arrayQuantite = []
    let arrayPrix = []
    let arrayPrixElement = []
    if (array.length === 0) {
        panierLocal.map((element) => {
            return arrayQuantite.push(element.quantite)
        })
        //console.log(test)
        panierLocal.map((element) => {
            return arrayPrix.push(element.prix)
        })
        array.push(arrayQuantite, arrayPrix)
        let i = 0
        while (i < arrayPrix.length) {
            let PrixElement = Number(arrayPrix[i]) * Number(arrayQuantite[i])
            arrayPrixElement.push(PrixElement)
            i++
        }
        array.push(arrayPrixElement)
        let totalFinal = 0
        arrayPrixElement.map((element) => {
            return totalFinal = element + totalFinal
        })
        array.push(totalFinal)
    }
    else {
        panierLocalStorage.map((element) => {
            return arrayQuantite.push(element.quantite)
        })
        panierLocal.map((element) => {
            return arrayPrix.push(element.prix)
        })
        array.splice(0, 1, arrayQuantite)
        array.splice(1, 1, arrayPrix)
        let i = 0
        while (i < arrayPrix.length) {
            let PrixElement = Number(arrayPrix[i]) * Number(arrayQuantite[i])
            arrayPrixElement.push(PrixElement)
            i++
        }
        array.splice(2, 1, arrayPrixElement)
        let totalFinal = 0
        arrayPrixElement.map((element) => {
            return totalFinal = element + totalFinal
        })
        array.splice(3, 1, totalFinal)
    }
}
export async function loadData() {
    const infoProduit = await getAllProduit()
    const panierAPI = await getPanier(Cookies.get('userId'))
    return { panierAPI, infoProduit }
}
function Panier() {
    const { panierAPI, infoProduit } = useLoaderData()
    const [panierLocal, updatePanierLocal] = useState(JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem('panier')) : localStorage.setItem('panier', '[]'))
    const [Total, updateTotal] = useState()
    const [Quantite, setQuantite] = useState(1)
    const [indexModif, updateIndexModif] = useState()
    const navigate = useNavigate()
    const [indexPanier, updateIndexPanier] = useState(0)
    let modiflocalStorage = JSON.parse(localStorage.getItem('panier'))

    const listeInfoProduit = useMemo(() => {
        const updatedListeInfoProduit = []
        console.log(panierLocal)
        if (panierLocal.length > 0) {
            panierLocal.forEach((elementLocal) => {
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
    }, [panierLocal, infoProduit])
    useEffect(() => {
        if (indexModif >= 0) {
            //console.log('true')
            //console.log(indexModif)
            //console.log(panierLocal.length)
            if (indexModif < panierLocal.length) {
                panierLocal[indexModif].quantite = Quantite
                //console.log(indexModif, Quantite, panierLocal)
                modiflocalStorage[indexModif].quantite = Quantite
                localStorage.setItem('panier', JSON.stringify(modiflocalStorage))
            }
            /*panierLocal[indexModif].quantite = Quantite
            let modiflocalStorage = JSON.parse(localStorage.getItem('panier'))
            console.log(indexModif, Quantite, panierLocal)
            modiflocalStorage[indexModif].quantite = Quantite
            localStorage.setItem('panier', JSON.stringify(modiflocalStorage))*/
            // cherche si le panier n'existe pas deja, sinon il en créer un dans la base de données
            //console.log(Number(panierAPI[indexPanier].idPanier), JSON.stringify(modiflocalStorage), Cookies.get('userId'))
            if (panierAPI.length !== 0) {
                if (indexPanier > panierAPI.length) {
                    //console.log(panierAPI[indexPanier])
                    addPanier(Number(panierAPI[indexPanier].idPanier), JSON.stringify(modiflocalStorage), Cookies.get('userId'))
                }
                else {
                    //console.log(panierAPI[indexPanier].idPanier)
                    addPanier(Number(panierAPI[indexPanier].idPanier), JSON.stringify(panierLocal), Cookies.get('userId'))
                }
            }
            else {
                addPanier(Date.now(), JSON.stringify(modiflocalStorage), Cookies.get('userId'))
            }
        }
        else {
            console.log('false')
        }
        arrayQuantitePrix(listeInfoProduit, panierLocal)
        let prixFinal = prixTotalArrondi(array[3])
        updateTotal(prixFinal)
        //console.log(listeInfoProduit)
    }, [Quantite, indexModif, panierLocal, listeInfoProduit, panierAPI, indexPanier, modiflocalStorage])
    return (
        <>

            {listeInfoProduit.length > 0 ?
                <>
                    <h1 className={style.titre}>Mon Panier</h1>
                    <div className={style.listePanier}>
                        {listeInfoProduit.map((article, index) =>
                            < Article key={index} index={index} panier={article} constpanierLocal={panierLocal} functionPanierLocal={updatePanierLocal} quantite={setQuantite} updateindex={updateIndexModif} />
                        )}
                    </div >
                    <p className={style.prixFinal}>Total : {Total} €</p>
                    <button onClick={() => navigate('../commande')} className={style.button}>
                        Valider ma commande
                    </button>
                </>
                :
                <div className={style.panierVide}>
                    <svg width="175" height="168" viewBox="0 0 175 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_104_2)">
                            <path d="M40.3389 50H40.338C43.1172 29.5445 62.7226 13 87.5 13C112.277 13 131.883 29.5445 134.662 50H134.614H134.543H134.472H134.401H134.329H134.257H134.184H134.111H134.037H133.963H133.889H133.814H133.739H133.664H133.588H133.511H133.434H133.357H133.28H133.202H133.123H133.044H132.965H132.886H132.805H132.725H132.644H132.563H132.481H132.399H132.317H132.234H132.151H132.067H131.983H131.899H131.814H131.729H131.644H131.558H131.471H131.385H131.297H131.21H131.122H131.034H130.945H130.856H130.767H130.677H130.587H130.496H130.405H130.314H130.222H130.13H130.038H129.945H129.852H129.758H129.664H129.57H129.475H129.38H129.285H129.189H129.093H128.997H128.9H128.802H128.705H128.607H128.509H128.41H128.311H128.211H128.112H128.012H127.911H127.81H127.709H127.607H127.506H127.403H127.301H127.198H127.094H126.991H126.887H126.782H126.678H126.573H126.467H126.361H126.255H126.149H126.042H125.935H125.828H125.72H125.612H125.503H125.394H125.285H125.176H125.066H124.956H124.845H124.734H124.623H124.512H124.4H124.288H124.175H124.062H123.949H123.836H123.722H123.608H123.493H123.379H123.263H123.148H123.032H122.916H122.8H122.683H122.566H122.449H122.331H122.213H122.095H121.976H121.857H121.738H121.619H121.499H121.379H121.258H121.137H121.016H120.895H120.773H120.651H120.529H120.406H120.283H120.16H120.037H119.913H119.789H119.664H119.54H119.415H119.289H119.164H119.038H118.912H118.785H118.658H118.531H118.404H118.276H118.148H118.02H117.892H117.763H117.634H117.504H117.375H117.245H117.115H116.984H116.853H116.722H116.591H116.459H116.327H116.195H116.063H115.93H115.797H115.664H115.53H115.396H115.262H115.128H114.993H114.858H114.723H114.588H114.452H114.316H114.18H114.043H113.907H113.77H113.632H113.495H113.357H113.219H113.08H112.942H112.803H112.664H112.525H112.385H112.245H112.105H111.965H111.824H111.683H111.542H111.401H111.259H111.117H110.975H110.833H110.69H110.547H110.404H110.261H110.117H109.974H109.829H109.685H109.541H109.396H109.251H109.106H108.96H108.814H108.669H108.522H108.376H108.229H108.082H107.935H107.788H107.64H107.493H107.345H107.196H107.048H106.899H106.75H106.601H106.452H106.302H106.153H106.003H105.852H105.702H105.551H105.4H105.249H105.098H104.946H104.795H104.643H104.491H104.338H104.186H104.033H103.88H103.727H103.573H103.42H103.266H103.112H102.958H102.803H102.649H102.494H102.339H102.184H102.028H101.873H101.717H101.561H101.404H101.248H101.091H100.935H100.778H100.621H100.463H100.306H100.148H99.99H99.8319H99.6736H99.5151H99.3564H99.1976H99.0386H98.8794H98.72H98.5604H98.4006H98.2407H98.0806H97.9203H97.7598H97.5992H97.4384H97.2774H97.1162H96.9549H96.7934H96.6317H96.4698H96.3078H96.1456H95.9833H95.8208H95.6581H95.4952H95.3322H95.169H95.0057H94.8422H94.6785H94.5147H94.3507H94.1866H94.0223H93.8578H93.6932H93.5284H93.3635H93.1984H93.0332H92.8678H92.7023H92.5366H92.3708H92.2048H92.0386H91.8724H91.7059H91.5394H91.3727H91.2058H91.0388H90.8716H90.7043H90.5369H90.3694H90.2016H90.0338H89.8658H89.6977H89.5294H89.361H89.1925H89.0238H88.855H88.6861H88.5171H88.3479H88.1786H88.0091H87.8395H87.6698H87.5H87.3302H87.1608H86.9916H86.8227H86.6541H86.4858H86.3177H86.15H85.9825H85.8153H85.6484H85.4818H85.3155H85.1495H84.9837H84.8182H84.653H84.4881H84.3235H84.1591H83.9951H83.8313H83.6678H83.5046H83.3417H83.179H83.0167H82.8546H82.6928H82.5313H82.37H82.2091H82.0484H81.888H81.7279H81.5681H81.4085H81.2493H81.0903H80.9316H80.7732H80.615H80.4571H80.2996H80.1423H79.9852H79.8285H79.672H79.5159H79.3599H79.2043H79.049H78.8939H78.7391H78.5846H78.4304H78.2764H78.1227H77.9693H77.8162H77.6634H77.5108H77.3585H77.2065H77.0548H76.9033H76.7522H76.6013H76.4506H76.3003H76.1502H76.0004H75.8509H75.7017H75.5527H75.404H75.2556H75.1075H74.9596H74.812H74.6647H74.5177H74.3709H74.2244H74.0782H73.9323H73.7866H73.6412H73.4961H73.3513H73.2067H73.0624H72.9184H72.7746H72.6312H72.488H72.345H72.2024H72.06H71.9179H71.7761H71.6345H71.4932H71.3522H71.2114H71.071H70.9308H70.7908H70.6512H70.5118H70.3727H70.2338H70.0952H69.9569H69.8189H69.6811H69.5436H69.4064H69.2695H69.1328H68.9964H68.8602H68.7243H68.5887H68.4534H68.3183H68.1835H68.049H67.9147H67.7808H67.647H67.5136H67.3804H67.2475H67.1148H66.9824H66.8503H66.7185H66.5869H66.4556H66.3245H66.1938H66.0633H65.933H65.803H65.6733H65.5439H65.4147H65.2858H65.1572H65.0288H64.9007H64.7728H64.6452H64.5179H64.3909H64.2641H64.1375H64.0113H63.8853H63.7596H63.6341H63.5089H63.384H63.2593H63.1349H63.0107H62.8869H62.7632H62.6399H62.5168H62.394H62.2714H62.1491H62.0271H61.9053H61.7838H61.6625H61.5415H61.4208H61.3003H61.1801H61.0602H60.9405H60.8211H60.7019H60.583H60.4644H60.346H60.2279H60.11H59.9925H59.8751H59.758H59.6412H59.5247H59.4084H59.2923H59.1766H59.0611H58.9458H58.8308H58.7161H58.6016H58.4874H58.3734H58.2597H58.1462H58.0331H57.9201H57.8075H57.695H57.5829H57.471H57.3593H57.248H57.1368H57.026H56.9153H56.805H56.6949H56.585H56.4754H56.3661H56.257H56.1482H56.0396H55.9313H55.8233H55.7155H55.6079H55.5007H55.3936H55.2868H55.1803H55.074H54.968H54.8623H54.7568H54.6515H54.5465H54.4418H54.3373H54.233H54.129H54.0253H53.9218H53.8186H53.7156H53.6129H53.5105H53.4082H53.3063H53.2046H53.1031H53.0019H52.9009H52.8002H52.6998H52.5996H52.4996H52.3999H52.3005H52.2013H52.1023H52.0036H51.9052H51.807H51.7091H51.6114H51.5139H51.4167H51.3198H51.2231H51.1266H51.0304H50.9345H50.8388H50.7433H50.6481H50.5532H50.4585H50.364H50.2698H50.1758H50.0821H49.9886H49.8954H49.8025H49.7097H49.6173H49.525H49.433H49.3413H49.2498H49.1586H49.0676H48.9768H48.8863H48.7961H48.7061H48.6163H48.5268H48.4375H48.3485H48.2597H48.1711H48.0828H47.9948H47.907H47.8194H47.7321H47.645H47.5582H47.4716H47.3853H47.2992H47.2133H47.1277H47.0423H46.9572H46.8723H46.7877H46.7033H46.6192H46.5352H46.4516H46.3682H46.285H46.202H46.1193H46.0369H45.9547H45.8727H45.7909H45.7095H45.6282H45.5472H45.4664H45.3859H45.3056H45.2256H45.1458H45.0662H44.9869H44.9078H44.8289H44.7503H44.6719H44.5938H44.5159H44.4383H44.3609H44.2837H44.2068H44.1301H44.0536H43.9774H43.9014H43.8256H43.7501H43.6749H43.5998H43.5251H43.4505H43.3762H43.3021H43.2282H43.1546H43.0813H43.0081H42.9352H42.8626H42.7901H42.718H42.646H42.5743H42.5028H42.4315H42.3605H42.2898H42.2192H42.1489H42.0788H42.009H41.9394H41.87H41.8009H41.732H41.6633H41.5949H41.5267H41.4587H41.391H41.3235H41.2562H41.1892H41.1224H41.0558H40.9895H40.9234H40.8575H40.7919H40.7265H40.6613H40.5964H40.5316H40.4672H40.4029H40.3389Z" stroke="#D0B69F" strokeWidth="10" strokeMiterlimit="1.65844" strokeLinejoin="round" />
                            <rect x="27" y="50" width="121" height="95" stroke="#D0B69F" strokeWidth="10" />
                            <circle cx="59.5" cy="77.5" r="12.5" fill="#D0B69F" />
                            <circle cx="115.5" cy="77.5" r="12.5" fill="#D0B69F" />
                            <path d="M51.6183 132.47C50.1266 131.908 49.3024 130.295 49.8145 128.785C52.6331 120.475 57.4415 113.249 63.6947 107.976C70.614 102.142 78.9473 99 87.5 99C96.0528 99 104.386 102.142 111.305 107.976C117.559 113.249 122.367 120.475 125.185 128.785C125.698 130.295 124.873 131.908 123.382 132.47V132.47C121.693 133.107 119.83 132.155 119.213 130.459C116.782 123.777 112.821 117.968 107.735 113.68C101.853 108.721 94.7699 106.05 87.5 106.05C80.2302 106.05 73.1469 108.721 67.2655 113.68C62.1794 117.968 58.2179 123.777 55.7866 130.459C55.1695 132.155 53.307 133.107 51.6183 132.47V132.47Z" fill="#D0B69F" />
                        </g>
                        <defs>
                            <clipPath id="clip0_104_2">
                                <rect width="175" height="168" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <p>oh non... votre panier est vide !</p>
                </div>
            }
            {
                Boolean(Cookies.get('userId')) ?
                    <>
                        <h2 className={style.titre}>Mes autres paniers</h2>
                        {
                            panierAPI.map((element, index) => {
                                let quantitePanierAPI = 0
                                //console.log(element.idPanier)
                                //console.log(JSON.parse(localStorage.getItem('idPanier')))
                                if (Number(element.idPanier) === JSON.parse(localStorage.getItem('idPanier'))) {
                                    return <></>
                                }
                                else {
                                    for (const e of JSON.parse(element.contenu)) {
                                        quantitePanierAPI = e.quantite + quantitePanierAPI
                                        //console.log(quantitePanierAPI)
                                        //console.log(element)
                                    }
                                    return <ListePanierAPI key={index} index={index} updateIndexPanier={updateIndexPanier} updatePanierLocal={updatePanierLocal} quantite={quantitePanierAPI} panier={JSON.parse(element.contenu)} idPanier={JSON.parse(element.idPanier)} />

                                }
                            })
                        }
                        <button onClick={async () => {
                            addPanier(Date.now(), JSON.stringify(modiflocalStorage), Cookies.get('userId'))
                            localStorage.setItem('panier', '[]')
                            updatePanierLocal([])
                            localStorage.setItem('idPanier', JSON.stringify(''))
                        }} className={style.button}>
                            ajouter un nouveau panier
                        </button>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default Panier;
