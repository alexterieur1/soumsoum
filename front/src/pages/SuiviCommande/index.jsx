import React, { useEffect, useState } from 'react'
import style from './SuiviCommande.module.scss'
import { suiviLaPoste } from '../../api'


const APILaPoste = async (numero) => {
    if (numero) {
        let resultatAPI = await suiviLaPoste(numero)
        return resultatAPI
    }
    return
}

function SuiviCommande() {
    const [numColis, setNumColis] = useState('')
    const [resultAPI, setResultAPI] = useState('')
    useEffect(() => {
        console.log(resultAPI)
    }, [resultAPI])
    return (
        <>
            <label htmlFor='numColis'>Veuillez insérer votre numéros de colis :</label>
            <input className={style.input__numcolis} onChange={(e) => setNumColis(e.target.value)} name='numColis' type='text' placeholder='ex : EP111111110FR' />
            <button onClick={async () => {
                let result = await APILaPoste(numColis)
                setResultAPI(result)
            }}>rechercher</button>

            <div>
                <p>Ou en est votre colis ?</p>
                {resultAPI && resultAPI.returnCode === 200 ?
                    resultAPI.event.map((element, index) => {
                        return <><p key={index}>{element.label}</p><br /></>
                    })
                    :
                    <>non</>}
            </div >
        </>
    )
}

export default SuiviCommande;
