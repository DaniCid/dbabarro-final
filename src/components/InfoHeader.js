import React from 'react'
import { Link } from 'react-router-dom'
import { useMedias } from '../contexts/MediaContexts'
import { POSTER_INFO_URL } from '../contexts/MediaContexts'
import { formatReleaseDate, filterName, filterDate } from '../utils/utils'

export default function InfoHeader() {

    const { infoMedia, setInfoSelected } = useMedias()

    return (
        <div className='seasons__header'>
            <img 
                src={ POSTER_INFO_URL + infoMedia?.poster_path } 
                loading="lazy" 
                alt={ filterName(infoMedia) }
                className='seasons__poster'
            />
            <div className='seasons__data'>
                <h2 className='seasons__title'>{ filterName(infoMedia) } <span className='seasons__date'>{ '(' + formatReleaseDate(filterDate(infoMedia), 'year') + ')' }</span></h2>
                <Link className='seasons__link' onClick={() => setInfoSelected('overview')}><i class="fa-sharp fa-solid fa-arrow-left"></i> Back to main</Link>
            </div>
        </div>
    )
}
