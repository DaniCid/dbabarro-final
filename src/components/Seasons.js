import React, { useEffect, useState} from 'react'
import { useMedias, POSTER_INFO_URL } from '../contexts/MediaContexts'
import InfoMenu from './InfoMenu'

export default function Seasons() {

    const [seasons, setSeasons] = useState([])

    const { infoMedia, seasonsInfo } = useMedias()

    useEffect(() => {
        setSeasonsMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setSeasonsMenu = () => {
        const numbersArray = Array.from({ length: infoMedia?.number_of_seasons }, (_, i) => i + 1);
        setSeasons(numbersArray);
    }

    
    return (
        <div className='seasons'>

           <InfoMenu seasons={seasons} season/>

            <div className='seasons__card'>
                <img 
                    src={ POSTER_INFO_URL + seasonsInfo?.poster_path } 
                    loading="lazy" 
                    alt={ infoMedia?.name }
                    className='seasons__image'
                />
                <div className='seasons__info'>
                    <h2 className='seasons__name'>{ seasonsInfo?.name }<span className='seasons__episodes'>{ seasonsInfo?.episodes?.length } episodes</span></h2>
                    <div className='seasons__overview'>{ seasonsInfo?.overview }</div>
                </div>
            </div>
        </div>
    )
}
