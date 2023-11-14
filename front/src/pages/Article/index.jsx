import React, { useEffect, useState, useRef } from 'react'
import style from './Article.module.scss'
import { getUnProduit, CompteurVue, mailVerification } from '../../api'
//import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
//import Avis from '../../components/Avis'

export async function loadData(props) {
    const produit = await getUnProduit(props.params.id)
    //mailVerification(Cookies.get('userId'), 'Alexandre')
    await CompteurVue(props.params.id)
    return { produit }
}
const addPanierfunction = (taille, idProduit, idClient) => {
    let panierLocal = localStorage.getItem('panier')
    let idPanierLocal = localStorage.getItem('idPanier')
    let objectaddPanier = {
        produit: idProduit,
        tailleProduit: taille,
        quantite: 1
    }
    if(!idPanierLocal){
localStorage.setItem('idPanier', new Date().getTime())
    }
    // verfier que le panier existe
    if (panierLocal) {
        let JSONPanierLocal = JSON.parse(panierLocal)

        //verifier si le produit n'est pas deja dans le panier avec la meme taille
        console.log(JSONPanierLocal)
        if (JSONPanierLocal.length === 0) {
            JSONPanierLocal.push(objectaddPanier)
            localStorage.setItem('panier', JSON.stringify(JSONPanierLocal))
        }
        else {
            let i = 0
            while (i < JSONPanierLocal.length) {
                if (JSONPanierLocal[i].produit === idProduit && JSONPanierLocal[i].tailleProduit === taille) {
                    JSONPanierLocal[i].quantite = JSONPanierLocal[i].quantite + 1
                    localStorage.setItem('panier', JSON.stringify(JSONPanierLocal))
                    break
                }
                if (i === JSONPanierLocal.length - 1) {
                    objectaddPanier.quantite = 1
                    console.log(objectaddPanier.quantite)
                    JSONPanierLocal.push(objectaddPanier)
                    localStorage.setItem('panier', JSON.stringify(JSONPanierLocal))
                    break
                }
                i++
            }
        }
    }
    else {
        let JSONPanierLocal = []

        //verifier si le produit n'est pas deja dans le panier avec la meme taille
        console.log(JSONPanierLocal)
        if (JSONPanierLocal.length === 0) {
            JSONPanierLocal.push(objectaddPanier)
            localStorage.setItem('panier', JSON.stringify(JSONPanierLocal))
        }
        else {
            let i = 0
            while (i < JSONPanierLocal.length) {
                if (JSONPanierLocal[i].produit === idProduit && JSONPanierLocal[i].tailleProduit === taille) {
                    JSONPanierLocal[i].quantite = JSONPanierLocal[i].quantite + 1
                    localStorage.setItem('panier', JSON.stringify(JSONPanierLocal))
                    break
                }
                if (i === JSONPanierLocal.length - 1) {
                    objectaddPanier.quantite = 1
                    console.log(objectaddPanier.quantite)
                    JSONPanierLocal.push(objectaddPanier)
                    localStorage.setItem('panier', JSON.stringify(JSONPanierLocal))
                    break
                }
                i++
            }
        }
    }
}
function Article() {
    const videoRef = useRef(null);
    const { produit } = useLoaderData()
    const [test, upadteTest] = useState('00')
    const [isImage, setIsimage] = useState(true)

    const togglePlayback = () => {
        const video = videoRef.current;
        console.log(video)
        if (video.paused) {
            console.log(video.load())
            video.play()
        } else {
            video.pause()
        }
    };
    let informationsProduit = produit[0]
    let prixEuros = informationsProduit.prix.split('.')
    let prixReduit = String((Number(informationsProduit.prix) * ((100 - Number(informationsProduit.promotion)) / 100)).toFixed(2))
    let prixEurosSolde = prixReduit.split('.')
    let photosProduit = produit[1]
    let stockProduit = produit[2]
    const [image, updateImage] = useState(0)
    const [taille, setTaille] = useState('')

    const avancementVideo = () => {
        const video = videoRef.current
        //const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60);

        upadteTest(/* ${minutes} :  */`${seconds > 10 ? seconds : `0${seconds}`}`)
    }
    useEffect(() => {
        let elementTaille = document.getElementById(taille)
        if (elementTaille === null) {
            return
        }
        if (document.querySelector(`.${style.taille__unite__selected}`)) {
            document.querySelector(`.${style.taille__unite__selected}`).classList.remove(`${style.taille__unite__selected}`)
        }
        if (elementTaille.className === `${style.taille__unite}`) {
            elementTaille.classList.add(`${style.taille__unite__selected}`)
        }
    }, [taille])

    useEffect(() => {
        if (image < 3) {
            setIsimage(true)
        }
        else {
            setIsimage(false)
        }
    }, [image])
    const [metadataLoaded, setMetadataLoaded] = useState(false);
    const [largeurVideo, setLargeurvideo] = useState()
    useEffect(() => {
        const video = videoRef.current
        // Fonction de rappel appelée lorsque les métadonnées de la vidéo sont chargées
        const handleMetadataLoaded = () => {
            // Mettre à jour l'état pour indiquer que les métadonnées sont chargées
            setMetadataLoaded(true);
            setLargeurvideo(videoRef.current.clientWidth)
            // Vous pouvez accéder aux métadonnées de la vidéo ici
            console.log('Durée de la vidéo :', videoRef.current.duration);
            console.log('Largeur de la vidéo :', videoRef.current.videoWidth);
            console.log('Hauteur de la vidéo :', videoRef.current.videoHeight);
        };

        // Écoutez l'événement 'loadedmetadata' pour détecter le chargement des métadonnées
        video.addEventListener('canplay', handleMetadataLoaded);

        // N'oubliez pas de supprimer l'écouteur d'événements lorsque le composant est démonté
        return () => {
            video.removeEventListener('loadedmetadata', handleMetadataLoaded);
        };
    }, []);
    useEffect(() => {
        if (!isImage) {

        }
    }, [videoRef, isImage])
    return (
        <>
            <div className={style.photos}>
                <div className={style.photoGrand}>
                    {
                        <>
                            <img className={style.photoGrand__img} style={{ display: isImage ? 'block' : 'none' }} src={produit[1][image].liens} alt="" />
                            <span style={{ display: !isImage ? 'contents' : 'none' }}>
                                <video ref={videoRef} id='id' onTimeUpdate={avancementVideo} preload='auto' poster="http://192.168.1.56:4200/images/Bas_premierTest_1697991252196.jpg" onClick={togglePlayback} muted loop playsInline={true} className={style.photoGrand_video}>
                                    <source src={produit[1][image].liens} type="video/mp4" />
                                </video>
                                {metadataLoaded ? <div className={style.photoGrand_description} style={{ width: largeurVideo + 'px' }}>
                                    {videoRef.current.duration ? <p className={style.photoGrand_description_duree}>{test}:{Math.round(videoRef.current.duration) > 10 ? Math.round(videoRef.current.duration) : "0" + Math.round(videoRef.current.duration)}</p> : <p className={style.photoGrand_description_duree}>{test}:{Math.round(videoRef.current.duration) > 10 ? Math.round(videoRef.current.duration) : "00"}</p>}
                                </div> : <></>}

                            </span>
                        </>

                    }
                </div>
                <div className={style.listePhoto}>
                    {photosProduit ? (
                        photosProduit.map((element, index) => {
                            if (element.liens.split('.')[4] === 'webp') {
                                return (
                                    <img
                                        key={index}
                                        onClick={() => updateImage(index)}
                                        className={style.listePhoto__img}
                                        src={element.liens}
                                        alt=""
                                    />
                                );
                            }
                            if (element.liens.split('.')[4] === 'mp4') {
                                return (
                                    <img
                                        key={index}
                                        onClick={() => updateImage(index)}
                                        className={style.listePhoto__img}
                                        src="http://192.168.1.56:4200/images/Bas_premierTest_1697991252196.jpg"
                                        alt=""
                                    />
                                );
                            }
                            else {
                                return (
                                    <></>
                                );
                            }
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className={style.description}>
                <p>{informationsProduit.nomProduit}</p>
                {console.log(prixEuros)}
                {produit[0].promotion !== 0 ?
                    <div className={style.promotion_prix}>
                        <p className={style.prix}>{prixEurosSolde[0]},{prixEurosSolde[1]} €</p>
                        <p className={style.prix_solde}>{prixEuros[0]},{prixEuros[1]} €</p>
                    </div>
                    : <p className={style.prix}>{prixEuros[0]},{prixEuros[1] ? prixEuros[1] : '00'} €</p>}
                <p>{informationsProduit.descriptionProduit}</p>
            </div>
            <div className={style.taille}>
                {Number(stockProduit.xs) >= 0 ? <p id="xs" onClick={() => { if (Number(stockProduit.xs) !== 0) { setTaille('xs') } }} className={Number(stockProduit.xs) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xs</p> : <></>}
                {Number(stockProduit.s) >= 0 ? <p id="s" onClick={() => { if (Number(stockProduit.s) !== 0) { setTaille('s') } }} className={Number(stockProduit.s) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s</p> : <></>}
                {Number(stockProduit.sm) >= 0 ? <p id="sm" onClick={() => { if (Number(stockProduit.sm) !== 0) { setTaille('sm') } }} className={Number(stockProduit.sm) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s-m</p> : <></>}
                {Number(stockProduit.m) >= 0 ? <p id="m" onClick={() => { if (Number(stockProduit.m) !== 0) { setTaille('m') } }} className={Number(stockProduit.m) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m</p> : <></>}
                {Number(stockProduit.ml) >= 0 ? <p id="ml" onClick={() => { if (Number(stockProduit.ml) !== 0) { setTaille('ml') } }} className={Number(stockProduit.ml) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m-l</p> : <></>}
                {Number(stockProduit.l) >= 0 ? <p id="l" onClick={() => { if (Number(stockProduit.l) !== 0) { setTaille('l') } }} className={Number(stockProduit.l) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l</p> : <></>}
                {Number(stockProduit.lxl) >= 0 ? <p id="lxl" onClick={() => { if (Number(stockProduit.lxl) !== 0) { setTaille('lxl') } }} className={Number(stockProduit.lxl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l-xl</p> : <></>}
                {Number(stockProduit.xl) >= 0 ? <p id="xl" onClick={() => { if (Number(stockProduit.xl) !== 0) { setTaille('xl') } }} className={Number(stockProduit.xl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xl</p> : <></>}
            </div >
            {
                stockProduit.xs > 0 || stockProduit.s > 0 || stockProduit.sm > 0 || stockProduit.m > 0 || stockProduit.ml > 0 || stockProduit.l > 0 || stockProduit.lxl > 0 || stockProduit.xl > 0 ?
                    <button onClick={() => {
                        if (taille && taille !== 'NULL') {
                            addPanierfunction(taille, informationsProduit.idProduit)
                        }
                        else {
                            setTaille('NULL')
                        }
                    }} className={style.button}>
                        ajouter au panier
                    </button>
                    : <div className={style.button}>rupture de stock</div>
            }

            {taille === 'NULL' ? <p className={style.msgError}>Selectionnez une taille</p> : <></>}
            {/* <Avis etoilesscore={4.3} /> */}
        </>
    )
}


export default Article;
