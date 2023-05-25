import React, { useState } from 'react';
import style from './Formulaire.module.scss'
import { creationProduit } from '../../api'


function Formulaire() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageTelechargee, setimageTelechargee] = useState(false);
  const [xs, setXs] = useState(-1);
  const [s, setS] = useState(-1);
  const [sm, setSm] = useState(-1);
  const [m, setM] = useState(-1);
  const [ml, setMl] = useState(-1);
  const [l, setL] = useState(-1);
  const [lxl, setLxl] = useState(-1);
  const [xl, setXl] = useState(-1);

  const envoieFormulaire = async () => {
    let valeurFormulaire = {
      "nomProduit": nom,
      "descriptionProduit": description,
      "prix": prix,
      "idProduit": Date.now(),
      "xs": xs,
      "s": s,
      "sm": sm,
      "m": m,
      "ml": ml,
      "l": l,
      "lxl": lxl,
      "xl": xl,
      "image": image,
    }
    let test = creationProduit(valeurFormulaire)
    let resultat = (await test).status
    if (resultat === 200) {
      setNom('')
      setDescription('')
      setPrix('')
      setXs('')
      setS('')
      setSm('')
      setM('')
      setMl('')
      setL('')
      setLxl('')
      setXl('')
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
      <p>stock :</p>
      <div className={style.formulaire__stock}>
        <div>
          <label>xs :</label>
          <input type='number' value={xs} onChange={(e) => setXs(e.target.value)} />
        </div>
        <div>
          <label>s :</label>
          <input type='number' value={s} onChange={(e) => setS(e.target.value)} />
        </div>
        <div>
          <label>sm :</label>
          <input type='number' value={sm} onChange={(e) => setSm(e.target.value)} />
        </div>
        <div>
          <label>m :</label>
          <input type='number' value={m} onChange={(e) => setM(e.target.value)} />
        </div>
        <div>
          <label>m-l :</label>
          <input type='number' value={ml} onChange={(e) => setMl(e.target.value)} />
        </div>
        <div>
          <label>l :</label>
          <input type='number' value={l} onChange={(e) => setL(e.target.value)} />
        </div>
        <div>
          <label>l-xl :</label>
          <input type='number' value={lxl} onChange={(e) => setLxl(e.target.value)} />
        </div>
        <div>
          <label>xl :</label>
          <input type='number' value={xl} onChange={(e) => setXl(e.target.value)} />
        </div>
      </div>
      <input type='file' id='file' onChange={(e) => previewFile(e.target.files[0])} />
      {imageTelechargee ? <img src={`${imagePreview}`} id='imagePreview' alt='test' /> : <></>}
      <button type='button' onClick={envoieFormulaire} value='ajouter le produit'>ajouter le produit </button>
    </form >
  )
}

export default Formulaire;
