import React, { useState } from 'react';
import style from './Formulaire.module.scss'
import { creationProduit } from '../../api'


function Formulaire() {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(false);

    const envoieFormulaire = () => {
        let valeurFormulaire = {
            "nomProduit": nom,
            "descriptionProduit": description,
            "prix": prix,
            "idProduit": '12346',
            "stockProduit": stock,
            "image": image,
        }
        creationProduit(valeurFormulaire)

    }
    function previewFile(files) {
        setImage(files)
        const preview = document.getElementById('imagePreview');
        const file = files;
        const reader = new FileReader();
      
        reader.addEventListener(
          "load",
          () => {
            // convert image file to base64 string
            preview.src = reader.result;
          },
          false
        );
      
        if (file) {
          reader.readAsDataURL(file);
        }
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
            <input type='file' onChange={(e) => previewFile(e.target.files[0])} />
            <img src='' id='imagePreview' alt='test'/>
            <button onClick={envoieFormulaire}>Submit</button>
        </form >
    )
}

export default Formulaire;
