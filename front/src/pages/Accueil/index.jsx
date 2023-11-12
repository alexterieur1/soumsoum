import React from 'react';
import style from './Accueil.module.scss'
import Article from '../../components/Article'
import logo from '../../assets/logo.png'
import imagechaussure from '../../assets/imagechaussure.jpg'
import imagehaut from '../../assets/imagehaut.jpg'
import imagebas from '../../assets/imagebas.jpg'
import imageaccessoire from '../../assets/imageaccessoire.jpg'
import { getAllProduit, getAllProduitStock, getproduitTendances } from '../../api';
import { Link, useLoaderData } from 'react-router-dom';

export async function loadData() {
  const produit = await getAllProduit()
  const tendances = await getproduitTendances()
  const stock = await getAllProduitStock()
  return { produit, tendances, stock }
}

function Accueil() {
  const { produit, stock, tendances } = useLoaderData()
  const verificationStock = (array) => {
    const arrayStock = array.map((element) => {
      if (
        Number(element.xs) > 1 ||
        Number(element.s) > 1 ||
        Number(element.sm) > 1 ||
        Number(element.m) > 1 ||
        Number(element.ml) > 1 ||
        Number(element.l) > 1 ||
        Number(element.lxl) > 1 ||
        Number(element.xl) > 1
      ) {
        return false;
      } else {
        return true;
      }
    });
  
    return arrayStock;
  };
  let stockproduit = verificationStock(stock)
  

  const fusion = tendances.map((element) => {
    const correspondance = stock.find((item) => item.idProduit === element.idProduit);
    return { ...element, ...correspondance };
  });
  let stockTendances = verificationStock(fusion)
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
            <Article key={index} id={produit.idProduit} image={produit.photoPrincipal} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} promotion={produit.promotion} epuise={stockproduit[index]} />
          ))
        ) : <>chargement ...</>}
      </div>
      <h2 className={style.titre}>Les tendances</h2>
      <div className={style.article}>
        {tendances ? (
          tendances.map((produit, index) => (
            <Article key={index} id={produit.idProduit} image={produit.photoPrincipal} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} promotion={produit.promotion} epuise={stockTendances[index]} />
          ))
        ) : <>chargement ...</>}
      </div>
    </>
  )
}

export default Accueil;
