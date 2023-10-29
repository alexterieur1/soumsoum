import React from 'react';
import style from './Accueil.module.scss'
import Article from '../../components/Article'
import logo from '../../assets/logo.png'
import imagechaussure from '../../assets/imagechaussure.jpg'
import imagehaut from '../../assets/imagehaut.jpg'
import imagebas from '../../assets/imagebas.jpg'
import imageaccessoire from '../../assets/imageaccessoire.jpg'
import { getAllProduit } from '../../api';
import { Link, useLoaderData } from 'react-router-dom';

export async function loadData() {
  const produit = await getAllProduit()
  return { produit }
}

function Accueil() {
  const { produit } = useLoaderData()
  //let elementCategorie = document.querySelector(`.${style.categorie}`)
  //console.log(elementCategorie)
  //console.log({marbre})
  //setTimeout(elementCategorie.style.background = `http://192.168.1.56:3000/${marbre}`, 10)
  /* const [affichage, updateAffichage] = useState("")
  const [fait, updateFait] = useState(false)
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0 || fait ) {
      updateAffichage(`${style.scroll}`)
      updateFait(true)
      console.log(fait)
    } else {
      updateAffichage(``)
    }
  }) */
  return (
    <>
      <img className={style.image} src={logo} alt='carousel' />
      <div className={style.categorie}>
        {/* <h2 className={style.titre}>Les catégories</h2> */}
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/hauts">
          <img className={style.categorie__image__bottom} src={imagechaussure} alt='Les Hauts' />
          <p className={style.categorie__description}>Les Hauts</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/bas">
          <img className={style.categorie__image__top} src={imagehaut} alt='Les Bas' />
          <p className={style.categorie__description}>Les Bas</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/ensembles">
          <img className={style.categorie__image__bottom} src={imagebas} alt='Les Ensembles' />
          <p className={style.categorie__description}>Les Ensembles</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/accessoires">
          <img className={style.categorie__image} src={imageaccessoire} alt='Les Accessoires' />
          <p className={style.categorie__description}>Les Accessoires</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/baskets">
          <img className={style.categorie__image__bottom} src={imagechaussure} alt='Les Baskets' />
          <p className={style.categorie__description}>Les Baskets</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/sandales">
          <img className={style.categorie__image__top} src={imagehaut} alt='Les Sandales' />
          <p className={style.categorie__description}>Les sandales</p>
        </Link>
      </div>
      <h2 className={style.titre}>Les dernières nouveautées</h2>
      <div className={style.article}>
        {produit ? (
          produit.map((produit, index) => (
            <Article key={index} id={produit.idProduit} image={produit.photoPrincipal} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} promotion={produit.promotion} epuise={false} />
          ))
        ) : <>chargement ...</>}
      </div>
      <h2 className={style.titre}>Les tendances</h2>
      <div className={style.article}>
        {produit ? (
          produit.map((produit, index) => (
            <Article key={index} id={produit.idProduit} image={produit.photoPrincipal} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} promotion={produit.promotion} epuise={false} />
          ))
        ) : <>chargement ...</>}
      </div>
    </>
  )
}

export default Accueil;
