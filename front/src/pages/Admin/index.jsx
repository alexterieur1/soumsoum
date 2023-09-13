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
            <div className={style.menu_contenant}>
                <p onClick={() => { updateMenu('ajout') }} className={style.menu_contenue}>ajouter un produit</p>
                <p onClick={() => { updateMenu('consultation') }} className={style.menu_contenue}>consulter tous les articles</p>
            </div>
            {menu === 'ajout' ? <Formulaire /> : produit.map((element, index) => {
                return <Consultation produit={element} index={index}/>
            })
            }

        </>
    )
}

export default Admin;
