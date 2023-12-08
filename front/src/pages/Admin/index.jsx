import React, { useState } from 'react';
import Formulaire from '../../components/Formulaire'
import style from './Admin.module.scss'
import Consultation from '../../components/Consultation'
import { useLoaderData } from 'react-router-dom'
import { adminInfoProduit } from '../../api'

export async function loadData() {
    const produit = await adminInfoProduit()
    return { produit }
}

function Admin() {
    const { produit } = useLoaderData()
    const [menu, updateMenu] = useState('')
    return (
        <>
            <div className={style.menu_titre}>
                <p onClick={() => { updateMenu('ajout') }} className={style.menu_contenue}>ajouter un produit</p>
                <p onClick={() => { updateMenu('consultation') }} className={style.menu_contenue}>consulter tous les articles</p>
            </div>
            <div className={style.menu_contenant}>
                {menu === 'ajout' ? <Formulaire /> : produit.map((element, index) => {
                    return <Consultation  key={index} produit={element} index={index} />
                })
                }
            </div>


        </>
    )
}

export default Admin;
