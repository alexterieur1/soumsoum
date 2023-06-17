import React, { useState } from 'react'
import style from './Contact.module.scss'
import insta from '../../assets/instagram.svg'
import tiktok from '../../assets/tiktok.svg'
import snapchat from '../../assets/snapchat.svg'
import { Link } from 'react-router-dom';

const envoieMessage = () => {

}
function Contact() {
    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const [objet, setObjet] = useState('')
    const [message, setMessage] = useState('')
    return (
        <>
            <p className={style.text}>Pour me contacter vous pouvez m'envoyez un message via mes reseaux : </p>
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
            <p className={style.text}>ou bien via ce formulaire : </p>
            <form onSubmit={envoieMessage} className={style.formulaire}>
                <label htmlFor='prenom'>prenom :</label>
                <input name='prenom' type='text' value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                <label htmlFor='nom'>nom :</label>
                <input name='nom' type='text' value={nom} onChange={(e) => setNom(e.target.value)} />
                <label htmlFor='email'>email :</label>
                <input name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='objet'>object du message :</label>
                <input name='objet' type='text' value={objet} onChange={(e) => setObjet(e.target.value)} />
                <label htmlFor='message'>object du message :</label>
                <textarea name='message' type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit' >Se connecter</button>
            </form >
        </>
    )
}

export default Contact;
