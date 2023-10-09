import React, { useEffect, useState, useRef } from 'react'
import style from './Article.module.scss'
import { getUnProduit, CompteurVue, mailVerification} from '../../api'
//import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import Cookies from 'js-cookie'
import Avis from '../../components/Avis'

export async function loadData(props) {
    const produit = await getUnProduit(props.params.id)
    mailVerification(Cookies.get('userId'), 'Alexandre')
    await CompteurVue(props.params.id)
    return { produit }
}
const addPanier = (taille, idProduit) => {
    let panierLocal = localStorage.getItem('panier')
    let objectaddPanier = {
        produit: idProduit,
        tailleProduit: taille,
        quantite: 1
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
            /* JSONPanierLocal.map((element) => {

            }) */
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
            /* JSONPanierLocal.map((element) => {

            }) */
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
        if (video.paused && videoRef.current.attributes.playsinline.nodeType === 2) {
            console.log(video.load())
            video.play()
        } else {
            video.pause()
        }
    };
    let informationsProduit = produit[0]
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
    return (
        <>
            <div className={style.photos}>
                <div className={style.photoGrand}>
                    {
                        <>
                            <img className={style.photoGrand__img} style={{ display: isImage ? 'block' : 'none' }} src={produit[1][image].liens} alt="" />
                            <span style={{ display: !isImage ? 'contents' : 'none' }}>
                                <video ref={videoRef} id='id' onTimeUpdate={avancementVideo} preload='auto' poster="http://192.168.1.56:4200/images/test_minia.JPG" onClick={togglePlayback} muted loop playsInline={true} className={style.photoGrand_video}>
                                    <source src={produit[1][image].liens} type="video/mp4" />
                                </video>
                                {metadataLoaded ? <div className={style.photoGrand_description} style={{ width: largeurVideo + 'px' }}>
                                    <p className={style.photoGrand_description_duree}>{test}:{Math.round(videoRef.current.duration) > 10 ? Math.round(videoRef.current.duration) : "0" + Math.round(videoRef.current.duration)}</p>
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
                            } else {
                                return (
                                    <img
                                        key={index}
                                        onClick={() => updateImage(index)}
                                        className={style.listePhoto__img}
                                        src="http://192.168.1.56:4200/images/test_minia.JPG"
                                        alt=""
                                    />
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
                <p>{informationsProduit.prix} €</p>
                <p>{informationsProduit.descriptionProduit}</p>
            </div>
            <div className={style.taille}>
                {Number(stockProduit.xs) >= 0 ? <p id="xs" onClick={() => setTaille('xs')} className={Number(stockProduit.xs) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xs</p> : <></>}
                {Number(stockProduit.s) >= 0 ? <p id="s" onClick={() => setTaille('s')} className={Number(stockProduit.s) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s</p> : <></>}
                {Number(stockProduit.sm) >= 0 ? <p id="sm" onClick={() => setTaille('sm')} className={Number(stockProduit.sm) !== 0 ? style.taille__unite : style.taille__unite__epuise}>s-m</p> : <></>}
                {Number(stockProduit.m) >= 0 ? <p id="m" onClick={() => setTaille('m')} className={Number(stockProduit.m) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m</p> : <></>}
                {Number(stockProduit.ml) >= 0 ? <p id="ml" onClick={() => setTaille('ml')} className={Number(stockProduit.ml) !== 0 ? style.taille__unite : style.taille__unite__epuise}>m-l</p> : <></>}
                {Number(stockProduit.l) >= 0 ? <p id="l" onClick={() => setTaille('l')} className={Number(stockProduit.l) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l</p> : <></>}
                {Number(stockProduit.lxl) >= 0 ? <p id="lxl" onClick={() => setTaille('lxl')} className={Number(stockProduit.lxl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>l-xl</p> : <></>}
                {Number(stockProduit.xl) >= 0 ? <p id="xl" onClick={() => setTaille('xl')} className={Number(stockProduit.xl) !== 0 ? style.taille__unite : style.taille__unite__epuise}>xl</p> : <></>}
            </div>
            <button onClick={() => {
                if (taille && taille !== 'NULL') {
                    addPanier(taille, informationsProduit.idProduit)
                }
                else {
                    setTaille('NULL')
                }
            }} className={style.button}>
                ajouter au panier
            </button>
            {taille === 'NULL' ? <p className={style.msgError}>Selectionnez une taille</p> : <></>}
            <Avis etoilesscore={4.3} />
        </>
    )
}


export default Article;
