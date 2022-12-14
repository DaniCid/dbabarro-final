import React from 'react'
import { useMedias, CAST_INFO_URL } from '../contexts/MediaContexts'
import { handleNullImage } from '../utils/utils'


export default function Cast() {

    const { castInfo } = useMedias()

    return (
        <div className="wrapper">
            <h2 className='cast__title'>Cast</h2>
            <div className="cast">
                { castInfo &&
                    castInfo?.map( actor => (
                        <div className="cast__card">
                            <img src={ handleNullImage(actor.profile_path, CAST_INFO_URL, 'cast') } alt={actor.name} />
                            <div className="cast__name">{actor.name}</div>
                            <div className="cast__character">{actor.character}</div>
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}
