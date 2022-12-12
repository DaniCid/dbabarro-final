import React from 'react'
import { useMedias, CAST_INFO_URL } from '../contexts/MediaContexts'

export default function Cast() {

    const { castInfo } = useMedias()

  return (
    <div className="wrapper">
        <div className="cast">
            { castInfo &&
                castInfo?.map( actor => (
                    <div className="cast__card">
                        <img src={CAST_INFO_URL + actor.profile_path} alt={actor.name} />
                        <div className="cast__title">{actor.name}</div>
                        <div className="cast__character">{actor.character}</div>
                    </div>
                ) )
            }
        </div>
    </div>
  )
}
