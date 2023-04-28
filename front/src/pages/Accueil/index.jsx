import React from 'react';
import style from './Accueil.module.scss'
import Article from '../../components/Article'
import image from '../../assets/image.JPG'

function Accueil() {
  return (
    <>
    <div className={style.article}>
    <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false}/>
    <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={true}/>
    </div>
    </>
  )
}

export default Accueil;
