import React, { useRef, useState } from 'react';
import style from './Formulaire.module.scss'
import { creationProduit } from '../../api'


function Formulaire() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSouscategorie] = useState('');
  const [imagePreview1, setImagePreview1] = useState('');
  const [imagePreview2, setImagePreview2] = useState('');
  const [imagePreview3, setImagePreview3] = useState('');
  const [imageTelechargee1, setimageTelechargee1] = useState(false);
  const [imageTelechargee2, setimageTelechargee2] = useState(false);
  const [imageTelechargee3, setimageTelechargee3] = useState(false);
  const [imagePoster, setImagePoster] = useState()
  const [imagePreviewPoster, setImagePreviewPoster] = useState()
  const [imageTelechargeeposter, setimageTelechargeePoster] = useState(false)
  const [imageTelechargee4, setimageTelechargee4] = useState(false);
  const [xs, setXs] = useState(-1);
  const [s, setS] = useState(-1);
  const [sm, setSm] = useState(-1);
  const [m, setM] = useState(-1);
  const [ml, setMl] = useState(-1);
  const [l, setL] = useState(-1);
  const [lxl, setLxl] = useState(-1);
  const [xl, setXl] = useState(-1);

  const envoieFormulaire = async () => {
    console.log(image1)
    console.log(image4)
    console.log(imagePoster)
    let valeurFormulaire = {
      "nomProduit": nom,
      "descriptionProduit": description,
      "prix": prix,
      "xs": xs,
      "s": s,
      "sm": sm,
      "m": m,
      "ml": ml,
      "l": l,
      "lxl": lxl,
      "xl": xl,
      "image1": image1,
      "image2": image2,
      "image3": image3,
      "image4": image4,
      "imagePoster": imagePoster,
      "categorie": categorie,
      "sousCategorie": sousCategorie
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
      document.getElementById('file1').value = ''
      document.getElementById('file2').value = ''
      document.getElementById('file3').value = ''
      document.getElementById('file4').value = ''
      setImage1('')
      setImage2('')
      setImage3('')
      setImage4('')
      setimageTelechargee1(false)
      setimageTelechargee2(false)
      setimageTelechargee3(false)
      //setimageTelechargee4(false)
    }
    //.then((e) => console.log(e))
    //.then((e)=> alert(e))
    //.then(alert('test1'))
  }
  function previewFile1(files) {
    setImage1(files)
    const file = files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setImagePreview1(reader.result)
        setimageTelechargee1(true)
        console.log(files)
        console.log(reader)

      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  function previewFile2(files) {
    setImage2(files)
    const file = files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setImagePreview2(reader.result)
        setimageTelechargee2(true)
        console.log(files)
        console.log(reader)

      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  function previewFile3(files) {
    setImage3(files)
    const file = files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setImagePreview3(reader.result)
        setimageTelechargee3(true)
        console.log(files)
        console.log(reader)

      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  function previewFile4(files) {
    handleFileInputChange(files)
    const file = files;
    const reader = new FileReader();
    console.log(reader)
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        //setImagePreview4(reader.result)
        setImage4(files)
        console.log(files)
        console.log(reader)

      },
      false
    );

    if (file) {
      console.log(file)
      reader.readAsDataURL(file);
    }
  }
  
  function previewFilePoster(files) {
    setImagePoster(files)
    const file = files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setImagePreviewPoster(reader.result)
        setimageTelechargeePoster(true)
        console.log(files)
        console.log(reader)

      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    // Assurez-vous que la vidéo est chargée et que le canvas est disponible
    if (videoLoaded && video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Obtenez l'image sous forme de base64 à partir du canvas
      const imageBase64 = canvas.toDataURL('image/jpeg');

      // Vérifiez si imageBase64 est non vide
      if (imageBase64) {
        // Assurez-vous que imagePoster est également une chaîne base64
        //setImageposter(imageBase64);

        // Le reste de votre code...
        const readerPoster = new FileReader();
        readerPoster.addEventListener(
          "load",
          () => {
          },
          false
        );

        if (imageBase64) {
          // Vérifiez si imageBase64 est non vide
          setimageTelechargee4(imageBase64);

          // Vérifiez le type MIME de l'image (peut nécessiter des ajustements)
          const imageType = 'image/jpeg'; // ou le type MIME correct de votre image
          if (imageBase64.startsWith(`data:${imageType};base64,`)) {
            const base64String = imageBase64.split(',')[1];

            // Décodez la chaîne base64 en tableau de bytes
            const binaryString = atob(base64String);

            // Créez un tableau de bytes
            const byteArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              byteArray[i] = binaryString.charCodeAt(i);
            }

            // Créez un objet Blob
            const blob = new Blob([byteArray], { type: imageType });
            readerPoster.readAsDataURL(blob);

            // Continuez avec l'utilisation du blob
            // ...
          } else {
            console.error('Type MIME incorrect dans imageBase64');
          }
        } else {
          console.error('imageBase64 est vide');
        }

        // Créez un lien de téléchargement
        const downloadLink = document.createElement('a');
        downloadLink.href = imageBase64;
        downloadLink.download = 'captured_image.jpg';
        downloadLink.click();
      }
    }
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event
    if (selectedFile) {
      const video = videoRef.current;
      video.src = URL.createObjectURL(selectedFile);
    }
  };
  return (
    <form className={style.formulaire}>
      <label>nom :</label>
      <input value={nom} onChange={(e) => setNom(e.target.value)} />
      <label>description :</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>prix :</label>
      <input value={prix} onChange={(e) => setPrix(e.target.value)} />
      <label>catégorie :</label>
      <select id='list' onChange={(e) => setCategorie(e.target.value)}>
        <option value=''>--selectioner une categorie</option>
        <option value='Hauts'>Hauts</option>
        <option value='Bas'>Bas</option>
        <option value='Ensembles'>Ensembles</option>
        <option value='Accessoires'>Accessoires</option>
        <option value='Baskets'>Baskets</option>
        <option value='Sandales'>Sandales</option>
      </select>
      <p>{categorie}</p>
      <label>sous catégorie :</label>
      <select id='list' onChange={(e) => setSouscategorie(e.target.value)}>
        <option value=''>--selectioner une categorie</option>
        <option value='t-shirt'>t-shirt</option>
        <option value='maillot'>maillot</option>
        <option value='pantalon'>pantalon</option>
        <option value='jeans'>jeans</option>
        <option value='robe'>robe</option>
        <option value='Baskets'>Baskets</option>
        <option value='Sandales'>Sandales</option>
      </select>
      <p>{sousCategorie}</p>
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
      <input type='file' id='file1' onChange={(e) => previewFile1(e.target.files[0])} />
      <p>le seul format accepter est le format webp</p>
      {imageTelechargee1 ? <img src={`${imagePreview1}`} id='imagePreview1' alt='test' /> : <></>}
      <input type='file' id='file2' onChange={(e) => previewFile2(e.target.files[0])} />
      <p>le seul format accepter est le format webp</p>
      {imageTelechargee2 ? <img src={`${imagePreview2}`} id='imagePreview2' alt='test' /> : <></>}
      <input type='file' id='file3' onChange={(e) => previewFile3(e.target.files[0])} />
      <p>le seul format accepter est le format webp</p>
      {imageTelechargee3 ? <img src={`${imagePreview3}`} id='imagePreview3' alt='test' /> : <></>}

      <input type="file" id='file4' accept="video/*" onChange={(e) => previewFile4(e.target.files[0])} ref={fileInputRef} />
      <video ref={videoRef} width='500vw' className={style.video} controls onLoadedData={handleVideoLoaded}>
        {/* La source de la vidéo sera définie dynamiquement */}
      </video>
      <button type='button' onClick={handleCapture}>Capturer l'image</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <img className={style.canvasTest} src={imageTelechargee4} alt='test' />
      <input type="file" id='filePoster' onChange={(e) => previewFilePoster(e.target.files[0])} />
      {imageTelechargeeposter ? <img src={`${imagePreviewPoster}`} id='imagePreviewPoster' alt='test' /> : <></>}
      <button type='button' onClick={envoieFormulaire} value='ajouter le produit'>ajouter le produit </button>
    </form >
  )
}

export default Formulaire;
