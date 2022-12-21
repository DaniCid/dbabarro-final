import React from 'react'
import { Link } from 'react-router-dom'
import { useMedias } from '../contexts/MediaContexts'
import { POSTER_INFO_URL } from '../contexts/MediaContexts'
import { formatReleaseDate, filterName, filterDate } from '../utils/utils'

export default function InfoHeader() {

    const { infoMedia, setInfoSelected } = useMedias()

    return (
        <div className='info__header flex-start'>
            <img 
                src={ POSTER_INFO_URL + infoMedia?.poster_path } 
                loading='lazy' 
                alt={ filterName(infoMedia) }
                className='info__poster'
            />
            <div className='info__data'>
                <h2 className='info__title'>{ filterName(infoMedia) } <span className='info__date'>{ '(' + formatReleaseDate(filterDate(infoMedia), 'year') + ')' }</span></h2>
                <Link className='info__link' onClick={() => setInfoSelected('overview')}><i className='fa-sharp fa-solid fa-arrow-left'></i> Back to main</Link>
            </div>
        </div>
    )
}
 