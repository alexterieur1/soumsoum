import React from 'react';
import style from './Accueil.module.scss'
import Article from '../../components/Article'
import image from '../../assets/image.JPG'
import Banner from '../../components/HeaderAccueil'

function Accueil() {
  return (
    <>
      <Banner />
      <div className={style.article}>
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={true} />
      </div>
    </>
  )
}

export default Accueil;
