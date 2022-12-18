import React from 'react'
import { useMedias } from '../contexts/MediaContexts'

export default function InfoMenu({ type }) {

    const { infoSelected, setInfoSelected } = useMedias()

    const handleInfoSelected = event => {
        setInfoSelected(event.target.value)
    }

    return (
        <div className='info-menu'>
            <select value={ infoSelected } onChange={ handleInfoSelected } className="info-menu__selector">
                <option value="overview" className="language__option">Overview</option>
                { type === 'tv' && 
                    <option value="seasons" className="language__option">Seasons</option>
                }
                <option value="watch" className="language__option">Watch Now</option>
            </select>
        </div>
    )
}
