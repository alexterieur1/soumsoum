import React, { useState } from 'react';
import fleche from '../../assets/fleche_bas.svg'
import style from './ListeHeader.module.scss'
import { Link } from 'react-router-dom';



function ListeHeader(props) {
    const [isOpen, setisOpen] = useState(false)
    console.log(props.elements)
    return (
        <li className={style.liste__categorie}>
            <div className={style.liste__balise__titre} onClick={() => { setisOpen(isOpen => !isOpen); console.log(isOpen) }}>
                <h3>{props.titre}</h3>
                <img src={fleche} alt="menu déroulant" />
            </div>
            {isOpen ? (
            <ul className={style.liste__contenue}>
                {props.elements.map((element) =>
                    <li><Link to={`./article/${element.split(' ')[1].toLowerCase()}`}>{element}</Link></li>
                )}
            </ul>) : <></>}

        </li>
    )
}

export default ListeHeader;
