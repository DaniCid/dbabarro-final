import React from 'react'
import { useMedias, POSTER_INFO_URL } from '../contexts/MediaContexts'

export default function Seasons() {

    const { infoMedia, seasonsInfo } = useMedias()

    return (
        <div className='seasons'>
        { seasonsInfo?.map( season => (

            <div className='seasons__card'>
                <img 
                    src={ POSTER_INFO_URL + season?.poster_path } 
                    loading="lazy" 
                    alt={ infoMedia?.name }
                    className='seasons__image'
                />
                <div className='seasons__info'>
                <h2 className='seasons__name'>{ season?.name }<span className='seasons__episodes'>{ season?.episodes.length } episodes</span></h2>
                <div className='seasons__overview'>
                    { season?.overview }
                </div>
                </div>
            </div>

        ) ) }
        </div>
    )
}
