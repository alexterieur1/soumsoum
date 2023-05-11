import React, { useEffect, useState } from 'react';
import style from './Formulaire.module.scss'
import { creationProduit } from '../../api'


function Formulaire() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageTelechargee, setimageTelechargee] = useState(false);

  const envoieFormulaire = async () => {
    let valeurFormulaire = {
      "nomProduit": nom,
      "descriptionProduit": description,
      "prix": prix,
      "idProduit": '12345678',
      "stockProduit": stock,
      "image": image,
    }
    let test = creationProduit(valeurFormulaire)
    let resultat = (await test).status
    if (resultat === 200) {
      setNom('')
      setDescription('')
      setPrix('')
      setStock('')
      document.getElementById('file').value = ''
      setImage('')
      setimageTelechargee(false)
    }
    //.then((e) => console.log(e))
    //.then((e)=> alert(e))
    //.then(alert('test1'))
  }
  function previewFile(files) {
    setImage(files)
    const file = files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setImagePreview(reader.result)
        setimageTelechargee(true)
        console.log(files)
        console.log(reader)

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
      <input type='file' id='file' onChange={(e) => previewFile(e.target.files[0])} />
      { imageTelechargee ? <img src={`${imagePreview}`} id='imagePreview' alt='test' /> :<></>}
      <button type='button' onClick={envoieFormulaire} value='ajouter le produit'>ajouter le produit </button>
    </form >
  )
}

export default Formulaire;
