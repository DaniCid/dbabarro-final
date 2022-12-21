import React from 'react'
import WatchProviders from './WatchProviders'

export default function WatchNow() {
    return (
        <div className='watchNow flex-space-around'>
            <div className='watchNow__info'>
                <h2 className='watchNow__category'>Streaming</h2>
                <WatchProviders streaming/>
            </div>
            <div className='watchNow__info'>
                <h2 className='watchNow__category'>Buy Now</h2>
                <WatchProviders buy/>
            </div> 
            <div className='watchNow__info'>
                <h2 className='watchNow__category'>Rent Now</h2>
                <WatchProviders rent/>
            </div>    
        </div>
    )
}
