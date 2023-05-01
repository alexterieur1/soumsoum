import React from 'react';
import style from './Accueil.module.scss'
import Article from '../../components/Article'
import image1 from '../../assets/image1.jpg'
import image2 from '../../assets/image2.jpg'
import image3 from '../../assets/image3.jpg'
import image4 from '../../assets/image4.jpg'
import image5 from '../../assets/image5.jpg'
import image6 from '../../assets/image6.jpg'
import image7 from '../../assets/image7.jpg'
import image8 from '../../assets/image8.jpg'
import imagechaussure from '../../assets/imagechaussure.jpg'
import imagehaut from '../../assets/imagehaut.jpg'
import imagebas from '../../assets/imagebas.jpg'
import imageaccessoire from '../../assets/imageaccessoire.jpg'
import Banner from '../../components/HeaderAccueil'
import marbre from '../../assets/marbre_blanc.png'


function Accueil() {
  let elementCategorie = document.querySelector(`.${style.categorie}`)
  console.log(elementCategorie)
  console.log({marbre})
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
      <Banner />
      <div className={style.categorie}>
        {/* <h2 className={style.titre}>Les catégories</h2> */}
        <div className={`${style.categorie__element} ${style.scroll}`}>
          <img className={style.categorie__image__bottom} src={imagechaussure} alt='chaussures' />
          <p className={style.categorie__description}>chaussures</p>
        </div>
        <div className={`${style.categorie__element} ${style.scroll}`}>
          <img className={style.categorie__image__top} src={imagehaut} alt='hauts' />
          <p className={style.categorie__description}>hauts</p>
        </div>
        <div className={`${style.categorie__element} ${style.scroll}`}>
          <img className={style.categorie__image__bottom} src={imagebas} alt='bas' />
          <p className={style.categorie__description}>bas</p>
        </div>
        <div className={`${style.categorie__element} ${style.scroll}`}>
          <img className={style.categorie__image} src={imageaccessoire} alt='accessoires' />
          <p className={style.categorie__description}>accessoires</p>
        </div>
      </div>
      <h2 className={style.titre}>Les dernières nouveautés</h2>
      <div className={style.article}>
        <Article image={image1} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image2} description={"lorem ipsum"} prix={"25,00"} epuise={true} />
        <Article image={image3} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image4} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image5} description={"lorem ipsum"} prix={"25,00"} epuise={true} />
        <Article image={image6} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image7} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
        <Article image={image8} description={"lorem ipsum"} prix={"25,00"} epuise={false} />
      </div>
    </>
  )
}

export default Accueil;
