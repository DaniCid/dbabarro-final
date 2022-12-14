import React from 'react'
import { useMedias, CAST_INFO_URL } from '../contexts/MediaContexts'
import { handleNullImage } from '../utils/utils'
import { v4 as uuid } from "uuid"


export default function Cast() {

    const { castInfo } = useMedias()

    return (
        <>
            <h2 className='cast__title'>Cast</h2>
            <div className="cast">
                { castInfo &&
                    castInfo?.map( actor => (
                        <div className="cast__card" key={ uuid() }>
                            <img src={ handleNullImage(actor.profile_path, CAST_INFO_URL, 'cast') } loading="lazy" alt={actor.name} />
                            <div className="cast__name">{actor.name}</div>
                            <div className="cast__character">{actor.character}</div>
                        </div>
                    ) )
                }
            </div>
        </>
    )
}
