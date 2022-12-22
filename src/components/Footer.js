import React, { useEffect } from 'react'
import { getCreditYear } from '../utils/utils'

export default function Footer() {

    // FOOTER COPYRIGHT YEAR
    useEffect( () => {
        getCreditYear()
    } )

    return (
        <footer className='footer' data-testid='footer'>
            <div className='sns'>
                <a href='https://twitter.com/' className='sns__link'><i className='sns__icon fa-brands fa-twitter'></i></a>
                <a href='https://es-es.facebook.com/' className='sns__link'><i className='sns__icon fa-brands fa-facebook-f'></i></a>
                <a href='https://www.tiktok.com/' className='sns__link'><i className='sns__icon fa-brands fa-tiktok'></i></a>
            </div>
            <div className='footer__copyright'>&copy;<span id='year'></span> Dani with <a href='https://www.themoviedb.org/'>TMDB</a> & <a href='https://www.justwatch.com/'>JustWatch</a> collaboration</div>
        </footer>
    )
}
