import React from 'react'
import { useMedias } from '../contexts/MediaContexts'

export default function InfoMenu({ type, info, seasons, season }) {

    const { infoSelected, setInfoSelected, seasonNumber, setSeasonNumber } = useMedias()

    const handleInfoSelected = event => {
        setInfoSelected(event.target.value)
    }

    const handleSeasonNumber = event => {
        setSeasonNumber(event.target.value)
    }

    return (
        <>
            { info &&
                <div className='info-menu'>
                    <select value={ infoSelected } onChange={ handleInfoSelected } className="info-menu__selector">
                        <option value="overview" className="language__option">Overview</option>
                        { type === 'tv' && 
                            <option value="seasons" className="language__option">Seasons</option>
                        }
                        <option value="watch" className="language__option">Watch Now</option>
                        <option value="gallery" className="language__option">Gallery</option>
                    </select>
                </div>

            }

            { season &&
                <div className='seasons__menu'>
                    <select value={ seasonNumber } onChange={ handleSeasonNumber } className="info-menu__selector">
                    { seasons?.map( season => (
                        <option value={ season } key={ season }>{`Season ${season}`}</option>
                    ) )
                    }
                    </select>
                </div>
            }
        </>
    )
}
