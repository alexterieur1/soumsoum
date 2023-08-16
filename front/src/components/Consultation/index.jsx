import React from 'react';
import style from './Consultation.module.scss'
import { Link } from 'react-router-dom';


function Consultation({ produit }) {
  console.log(produit)
  return (
    <div className={style.containers}>
      {produit ? produit.map((element,index) =>
        <Link key={index} to={`/article/${element.categorie}/${element.idProduit}`} className={style.article}>
          <span>{element.nomProduit}</span>
          <img className={style.article_image} src={element.photoPrincipal} alt='article' />
          <span>vues {element.NbrVues}</span>
          <ul className={style.article_liste}>
            <li>xs : {element.xs}</li>
            <li>s : {element.s}</li>
            <li>s-m : {element.sm}</li>
            <li>m : {element.m}</li>
            <li>m-l : {element.ml}</li>
            <li>l : {element.l}</li>
            <li>l-xl : {element.lxl}</li>
            <li>xl : {element.xl}</li>
          </ul>
        </Link>
      ) : <></>}
    </div>
  )
}

export default Consultation;
