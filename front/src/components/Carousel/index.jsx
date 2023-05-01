import React from 'react';
//import image from '../../assets/image.jpg'
import style from './Carousel.module.scss'
import logo from '../../assets/logo.png'

function Carousel() {
    return (
        <>
        <img className={style.image} src={logo} alt='carousel'/>
        </>
    )
}

export default Carousel;
