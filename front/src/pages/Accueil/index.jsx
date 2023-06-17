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
import Cookies from 'js-cookie'

export async function loadData() {
  const produit = await getAllProduit()
  return { produit }
}

function Accueil() {
  let test = Cookies.get('session')
  console.log(test)
  const { produit } = useLoaderData()
  console.log(produit)
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
      <img className={style.image} src={logo} alt='carousel'/>
      <div className={style.categorie}>
        {/* <h2 className={style.titre}>Les catégories</h2> */}
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/chaussures">
          <img className={style.categorie__image__bottom} src={imagechaussure} alt='chaussures' />
          <p className={style.categorie__description}>chaussures</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/hauts">
          <img className={style.categorie__image__top} src={imagehaut} alt='hauts' />
          <p className={style.categorie__description}>hauts</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/bas">
          <img className={style.categorie__image__bottom} src={imagebas} alt='bas' />
          <p className={style.categorie__description}>bas</p>
        </Link>
        <Link className={`${style.categorie__element} ${style.scroll}`} to="./article/accessoires">
          <img className={style.categorie__image} src={imageaccessoire} alt='accessoires' />
          <p className={style.categorie__description}>accessoires</p>
        </Link>
      </div>
      <h2 className={style.titre}>Les dernières nouveautées</h2>
      <div className={style.article}>
        {produit ? (
          produit.map((produit, index)=>(
            <Article key={index} id={produit.idProduit} image={produit.liens} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} epuise={false} />
          ))
        ) : <>chargement ...</>}
        {/* <Article image={image1} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image2} description={"lorem ipsum"} prix={"25,00"} epuise={true} /> */}
      </div>
    </>
  )
}

export default Accueil;
