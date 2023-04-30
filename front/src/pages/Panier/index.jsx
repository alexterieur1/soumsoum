import React, { useState} from 'react';
import Banner from '../../components/Header'
import style from './Panier.module.scss'
import image from '../../assets/image.jpg'
import plus from '../../assets/plus.svg'
import moins from '../../assets/moins.svg'


function Panier() {
    const [number1, updateNumber1] = useState(1)
    const [number2, updateNumber2] = useState(1)
    console.log(number1)
    console.log(number2)
    return (
        <>
            <Banner />
            <h1 className={style.titre}>Mon Panier</h1>
            <div className={style.listePanier}>
                <div className={style.article}>
                    <div className={style.article__image}>
                        <img className={style.article__image__contenu} src={image} alt="article 1 panier" />
                    </div>
                    <div>
                        <div className={style.description}>
                            <p className={style.description__titre}>lorem ipsum</p>
                            <p className={style.description__prix}>25,00 €</p>
                            <div className={style.quantite}>
                                <img onClick={()=> updateNumber1(number1 - 1)} src={moins} alt='diminuer'/>
                                <p>{number1}</p>
                                <img onClick={()=> updateNumber1(number1 + 1)} src={plus} alt='augmenter'/>
                            </div>
                            <button className={style.button}>
                                supprimer
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.article__image}>
                        <img className={style.article__image__contenu} src={image} alt="article 1 panier" />
                    </div>
                    <div>
                        <div className={style.description}>
                            <p className={style.description__titre}>lorem ipsum</p>
                            <p className={style.description__prix}>25,00 €</p>
                            <div className={style.quantite}>
                                <img onClick={()=> updateNumber1(number2 - 1)} src={moins} alt='diminuer'/>
                                <p>{number2}</p>
                                <img onClick={()=> updateNumber2(number2 + 1)} src={plus} alt='augmenter'/>
                            </div>
                            <button className={style.button}>
                                supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Panier;
