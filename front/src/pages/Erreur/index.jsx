import React from 'react';
import style from './Erreur.module.scss'
import { Link } from 'react-router-dom';

function Erreur() {
  return (
    <div className={style.countain}>
    <p className={style.titre}>oops...</p>
      <p className={style.sousTitre}>erreur 404</p>
      <p className={style.text}>
        Vous me semblez être perdu dans les rayons<br />
        Allez je vous ramène à <Link className={style.liens} to='./'>l'accueil</Link>
      </p>
    </div>
  )
}

export default Erreur;
