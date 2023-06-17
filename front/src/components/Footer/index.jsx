import React from 'react';
import style from './Footer.module.scss'
import insta from '../../assets/instagram.svg'
import tiktok from '../../assets/tiktok.svg'
import snapchat from '../../assets/snapchat.svg'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className={style.footer_liste}>
                <div className={style.liste}>
                    <p>commandes</p>
                    <ul>
                        <li>Mon compte</li>
                        <li>Suivi de commande</li>
                        <li>Retour</li>
                    </ul>
                </div>
                <div className={style.liste}>
                    <p>à Propos</p>
                    <ul>
                        <li>Conditions générales de vente</li>
                        <li>Crédit</li>
                        <li>Mentions légales</li>
                    </ul>
                </div>
                <div className={style.liste}>
                    <p>contact</p>
                    <ul>
                        <li>Contactez-moi</li>
                    </ul>
                </div>
            </div>
            <div className={style.listeRS}>
                <Link to='https://www.instagram.com/mille_et_une_merveilles_shop/?hl=fr'>
                    <img className={style.liensRS} src={insta} alt="liens instagram" />
                </Link>
                <Link to='https://www.tiktok.com/@mille_et_une_merveilles_?_t=8c8BtszLbK7&_r=1'>
                    <img className={style.liensRS} src={tiktok} alt="liens tiktok" />
                </Link>
                <Link to='https://www.snapchat.com/add/m_unemerveilles?share_id=sXxolvhvQSWPjMjEJ7dMRA&locale=fr_FR&sid=b754a73b596143cb8e30275cab08d830'>
                    <img className={style.liensRS} src={snapchat} alt="liens snapchat" />
                </Link>
            </div>
            <p>© 2023 - fait avec le ♡ par <Link className={style.liensAlexandre} to='https://alexandrerichard.fr' target="_blank"> Alexandre</Link></p>
        </footer>
    )
}

export default Footer;
