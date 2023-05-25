import React from 'react';
import style from './Avis.module.scss'

const etoilesPleine = (nombre) => {
    let i = 0
    let arrayEtoiles = []
    while (i < Number(Math.floor(nombre))) {
        arrayEtoiles.push(i)
        i++
    }
    console.log(arrayEtoiles)
    return arrayEtoiles
}
function Avis({ etoilesscore }) {
    let arrayEtoilesPleine = etoilesPleine(etoilesscore)
    let restant = etoilesscore % Number(Math.floor(etoilesscore))
    let nombreEtoilesVirgules = String(etoilesscore).split('.')
    return (
        <div className={style.avis}>
            <div className={style.contenue}>
                <div className={style.etoiles}>
                    {
                        arrayEtoilesPleine.map((index) => (<svg key={index} width="175" height="168" viewBox="0 0 175 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M85.1468 34.7812C86.0449 32.0172 89.9551 32.0172 90.8532 34.7812L100.348 64.0041C100.75 65.2401 101.902 66.077 103.201 66.077L133.928 66.077C136.834 66.077 138.043 69.7959 135.692 71.5041L110.833 89.5648C109.782 90.3288 109.342 91.6829 109.743 92.9189L119.238 122.142C120.136 124.906 116.973 127.204 114.622 125.496L89.7634 107.435C88.7119 106.671 87.2881 106.671 86.2366 107.435L61.3781 125.496C59.027 127.204 55.8636 124.906 56.7616 122.142L66.2567 92.9189C66.6583 91.6828 66.2184 90.3287 65.1669 89.5648L40.3084 71.5041C37.9573 69.7959 39.1656 66.077 42.0718 66.077L72.7986 66.077C74.0982 66.077 75.2501 65.2401 75.6517 64.0041L85.1468 34.7812Z" fill="#D0B69F" stroke="#D0B69F" stroke-width="5"/>
                        </svg>))
                    }
                    <svg width="175" height="168" viewBox="0 0 175 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M85.1468 34.7812C86.0449 32.0172 89.9551 32.0172 90.8532 34.7812L100.348 64.0041C100.75 65.2401 101.902 66.077 103.201 66.077L133.928 66.077C136.834 66.077 138.043 69.7959 135.692 71.5041L110.833 89.5648C109.782 90.3288 109.342 91.6829 109.743 92.9189L119.238 122.142C120.136 124.906 116.973 127.204 114.622 125.496L89.7634 107.435C88.7119 106.671 87.2881 106.671 86.2366 107.435L61.3781 125.496C59.027 127.204 55.8636 124.906 56.7616 122.142L66.2567 92.9189C66.6583 91.6828 66.2184 90.3287 65.1669 89.5648L40.3084 71.5041C37.9573 69.7959 39.1656 66.077 42.0718 66.077L72.7986 66.077C74.0982 66.077 75.2501 65.2401 75.6517 64.0041L85.1468 34.7812Z" fill="url(#paint0_linear_16_3)" stroke="#D0B69F"stroke-width="5"/>
                        <defs>
                            <linearGradient id="paint0_linear_16_3" x1="19.5" y1="84" x2="146" y2="84" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#D0B69F" />
                                <stop offset={`${restant}`} stop-color="#D0B69F" />
                                <stop offset={`${restant}`} stop-color="#D0B69F" stop-opacity="0" />
                                <stop offset="1" stop-color="#D0B69F" stop-opacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <p>{`${nombreEtoilesVirgules[0]},${nombreEtoilesVirgules[1]}`} /5</p>
            </div>
        </div>
    )
}

export default Avis;
