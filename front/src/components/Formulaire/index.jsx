import React, { useState } from 'react';
import style from './Formulaire.module.scss'
import { creationProduit } from '../../api'


function Formulaire() {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');


    const envoieFormulaire = () => {
        var valeurFormulaire = {
            "nomProduit": `${nom}`,
            "descriptionProduit": `${description}`,
            "prix": `${prix}`,
            "idProduit": '123456',
            "stockProduit": `${stock}`
        }
        creationProduit(valeurFormulaire)
    }

    return (
        <form className={style.formulaire}>
            <label>nom :</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} />
            <label>description :</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>prix :</label>
            <input value={prix} onChange={(e) => setPrix(e.target.value)} />
            <label>stock :</label>
            <input value={stock} onChange={(e) => setStock(e.target.value)} />
            <input type='file' value={image} onChange={(e) => setImage(e.target.value)} />
            <button onClick={envoieFormulaire}>Submit</button>
        </form>
    )
}

export default Formulaire;
