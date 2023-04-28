import React from 'react';
import image from '../../assets/image.JPG'
import style from './Carousel.module.scss'

function Carousel() {
    return (
        <>
        <img className={style.image} src={image} alt='carousel'/>
        </>
    )
}

export default Carousel;
