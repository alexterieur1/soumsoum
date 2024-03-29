import React, { useCallback, useEffect, useState } from 'react';
import style from './Consultation.module.scss'
import { Link } from 'react-router-dom';
import { modificationQuantite, adminInfoProduit, apiVisible } from '../../api';

let resultatApiVisible = false
function Consultation({ produit, index }) {
  console.log(produit)
  const [isChecked, setIschecked] = useState(produit.visible)
  console.log(isChecked)
  const [modeModification, setmodemodification] = useState(false)
  const [xs, setXs] = useState(produit.xs);
  const [s, setS] = useState(produit.s);
  const [sm, setSm] = useState(produit.sm);
  const [m, setM] = useState(produit.m);
  const [ml, setMl] = useState(produit.ml);
  const [l, setL] = useState(produit.l);
  const [lxl, setLxl] = useState(produit.lxl);
  const [xl, setXl] = useState(produit.xl);

  const envoieFormulaire = async () => {
    let valeurFormulaire = {
      "id": produit.idProduit,
      "xs": xs,
      "s": s,
      "sm": sm,
      "m": m,
      "ml": ml,
      "l": l,
      "lxl": lxl,
      "xl": xl,
    }
    let resultatvaleurFormulaire = await modificationQuantite(valeurFormulaire)
    console.log(resultatvaleurFormulaire)
    if (resultatvaleurFormulaire === 200) {
      setmodemodification(false)
      let MAJ = await adminInfoProduit()
      console.log(MAJ[index])
      setXs(MAJ[index].xs)
      setS(MAJ[index].xs)
      setSm(MAJ[index].sm)
      setM(MAJ[index].m)
      setMl(MAJ[index].ml)
      setL(MAJ[index].l)
      setLxl(MAJ[index].lxl)
      setXl(MAJ[index].xl)
    }
  }

  const envoieVisible = useCallback(async () => {
    let valeurFormulaire = {
      "idProduit": produit.idProduit,
      "visible": isChecked,
    }
    resultatApiVisible = await apiVisible(valeurFormulaire)
    console.log(resultatApiVisible)
    return resultatApiVisible
  }, [isChecked, produit])

  useEffect(() => {
    envoieVisible()
  }, [isChecked, envoieVisible])
  console.log(resultatApiVisible)
  return (
    <div className={style.containers}>
      {produit ?
        <div>
          <div className={style.article}>
            <span>
              <div>{produit.nomProduit}</div>
              <div>{produit.NbrVues} vues</div>
            </span>
            <Link key={index} to={`/article/${produit.categorie}/${produit.idProduit}`}>
              <img className={style.article_image} src={produit.photoPrincipal} alt='article' />
            </Link>
            <div className={style.visible}>
              <span className={style.visible_element}>
                <label htmlFor='visible'>visible</label>
                <input type="checkbox" checked={isChecked} onChange={() => setIschecked(isChecked => !isChecked)} />
              </span>
              {resultatApiVisible ? <div className={` ${resultatApiVisible === 200 ? style.visible_valide : style.visible_erreur}`}>{resultatApiVisible === 200 ? 'modification réussi !' : 'un problème est apparue'}</div> : <></>}
            </div>
          </div>
          <ul className={style.article_liste}>
            {modeModification ?
              <>
                <li className={style.article_liste_element}>
                  <label htmlFor='xs'>xs :</label>
                  <input className={style.article_liste_modification} name='xs' value={xs} onChange={(e) => setXs(e.target.value)} />
                </li>
                <li className={style.article_liste_element}>
                  <label htmlFor='s'>s :</label>
                  <input className={style.article_liste_modification} name='s' value={s} onChange={(e) => setS(e.target.value)} />
                </li>
                <li className={style.article_liste_element}>
                  <label htmlFor='sm'>s-m :</label>
                  <input className={style.article_liste_modification} name='sm' value={sm} onChange={(e) => setSm(e.target.value)} />
                </li>
                <li className={style.article_liste_element}>
                  <label htmlFor='m'>m :</label>
                  <input className={style.article_liste_modification} name='m' value={m} onChange={(e) => setM(e.target.value)} />
                </li>
                <li className={style.article_liste_element}>
                  <label htmlFor='ml'>m-l :</label>
                  <input className={style.article_liste_modification} name='ml' value={ml} onChange={(e) => setMl(e.target.value)} />
                </li>
                <li className={style.article_liste_element}>
                  <label htmlFor='l'>l :</label>
                  <input className={style.article_liste_modification} name='l' value={l} onChange={(e) => setL(e.target.value)} />
                </li>
                <li className={style.article_liste_element}>
                  <label htmlFor='lxl'>l-xl :</label>
                  <input className={style.article_liste_modification} name='lxl' value={lxl} onChange={(e) => setLxl(e.target.value)} />
                </li>
                <li className={style.article_liste_element}>
                  <label htmlFor='xl'>xl :</label>
                  <input className={style.article_liste_modification} name='xl' value={xl} onChange={(e) => setXl(e.target.value)} />
                </li>
              </>
              :
              <>
                <li>xs : {xs}</li>
                <li>s : {s}</li>
                <li>s-m : {sm}</li>
                <li>m : {m}</li>
                <li>m-l : {ml}</li>
                <li>l : {l}</li>
                <li>l-xl : {lxl}</li>
                <li>xl : {xl}</li>
              </>
            }
          </ul>
          {modeModification ?
            <button onClick={() => { envoieFormulaire() }}>enregistrer</button>
            :
            <button onClick={() => { setmodemodification(true) }}>modifier valeur</button>
          }
        </div>
        : <></>
      }
    </div >
  )
}

export default Consultation;
