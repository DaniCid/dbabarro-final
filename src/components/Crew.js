import React from 'react'
import { useMedias } from '../contexts/MediaContexts'

export default function Crew() {

    const { crewInfo } = useMedias()

    return (
        <>
            {
            crewInfo?.map( crew => (
                <>
                    { crew?.job === 'Director' &&
                    <div className='credit__card'>
                        <div className='credit__name'>{ crew?.name }</div>
                        <div className='credit__job'>Director</div>
                    </div>
                    }
                </>
            ))                                            
            }
        </>
    )
}
