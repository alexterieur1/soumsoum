import React from 'react';
import style from './Accueil.module.scss'
import Article from '../../components/Article'
import image from '../../assets/image.JPG'
import Banner from '../../components/HeaderAccueil'

function Accueil() {
  return (
    <>
      <Banner />
      <div className={style.categorie}>
        <div className={style.categorie__element}>
          <img className={style.categorie__image} src={image} alt='chaussure' />
          <p className={style.categorie__description}>chaussures</p>
        </div>
        <div className={style.categorie__element}>
          <img className={style.categorie__image} src={image} alt='chaussure' />
          <p className={style.categorie__description}>hauts</p>
        </div>
        <div className={style.categorie__element}>
          <img className={style.categorie__image} src={image} alt='chaussure' />
          <p className={style.categorie__description}>bas</p>
        </div>
        <div className={style.categorie__element}>
          <img className={style.categorie__image} src={image} alt='chaussure' />
          <p className={style.categorie__description}>accessoires</p>
        </div>
      </div>
        <h1 className={style.titre}>Les dernières nouveautés</h1>
      <div className={style.article}>
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={true} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={true} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
      </div>
    </>
  )
}

export default Accueil;
