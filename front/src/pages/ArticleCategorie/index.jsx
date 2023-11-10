import React, { useEffect, useState } from 'react'
import style from './ArticleCategorie.module.scss'
import { useLoaderData } from 'react-router-dom'
import Article from '../../components/Article'
//import imgFiltre from '../../assets/filtre.svg'
import { getAllProduitStock, getCategorieProduit } from '../../api'

export async function loadData(props) {
    const produit = await getCategorieProduit(props.params.categorie)
  console.log(props.params.categorie)
  let categorieProduit = props.params.categorie
  const stock = await getAllProduitStock()
  return { produit, categorieProduit, stock }
}
function ArticleCategorie() {
  const [listeFiltre, updateListeFiltre] = useState(false);
  const { produit, categorieProduit, stock } = useLoaderData();
  const [isChecked, setIsChecked] = useState(new Array(produit?.[0]?.length ?? 0).fill(false))
  let listeSousCategorie = []
  let listeArticleFiltre = []
  const filtre = () => {

    //tableau liste sous-categorie

    produit[0].map((element) =>
      listeSousCategorie.push(Object.values(element)[0])
    )

    //tableau filtré
    listeArticleFiltre = []
    produit[1].map((elementArticle) => {
      let i = 0
      while (i <= produit[0].length - 1) {
        if (isChecked[i] && produit[0][i].sousCategorie === elementArticle.sousCategorie) {
          listeArticleFiltre.push(elementArticle)
        }
        i++
      }
      return listeArticleFiltre
    }
    )

  }
  filtre()
  const handleOnChange = (position) => {
    const updateIsChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updateIsChecked);
  }
  useEffect(() => {

  })
  const verificationStock = () => {
    const arrayStock = stock.map((element) => {
      if (
        Number(element.xs) > 1 ||
        Number(element.s) > 1 ||
        Number(element.sm) > 1 ||
        Number(element.m) > 1 ||
        Number(element.ml) > 1 ||
        Number(element.l) > 1 ||
        Number(element.lxl) > 1 ||
        Number(element.xl) > 1
      ) {
        return false;
      } else {
        return true;
      }
    });
  
    return arrayStock;
  };
  let stockproduit = verificationStock()
  return (
    <>
      <h1 className={style.titre}>Les {categorieProduit}</h1>
      <div className={style.filtre}>
        <p onClick={() => updateListeFiltre(filtre => !filtre)} className={style.filtre_texte}>Filtre</p>
{/*         <img className={style.filtre_img} src={imgFiltre} alt='filtre' />
 */}      </div>
      <div className={listeFiltre ? style.filtre_liste : style.none}>
        <ul className={style.sousCategorie}>
          {listeSousCategorie.map((element, index) => (
            <li key={index} className={style.sousCategorie_element}>
              <label className={style.sousCategorie_label}>
                <input type="checkbox" checked={isChecked[index]} onChange={() => handleOnChange(index)} />
                {element}
              </label>
            </li>
          )
          )}
        </ul>

      </div>
      <div className={style.article}>
        {produit ? (
          (listeArticleFiltre.length === 0 ? produit[1]: listeArticleFiltre).map((produit, index) => (
            <Article key={index} id={produit.idProduit} image={produit.photoPrincipal} categorie={produit.categorie} description={produit.nomProduit} prix={produit.prix} promotion={produit.promotion} epuise={stockproduit[index]} />
          ))
        ) : <>chargement ...</>}
      </div>
    </>
  )
}

export default ArticleCategorie;
