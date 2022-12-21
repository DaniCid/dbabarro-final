import React from 'react'
import { v4 as uuid } from 'uuid'
import { useMedias, PROVIDERS_LOGO_URL } from '../contexts/MediaContexts'

export default function WatchProviders({ streaming, buy, rent }) {

    const { providersInfo, buyInfo, rentInfo, emptyInfo} = useMedias()

    const createProviders = array => {

        if (emptyInfo) return <span className='provider__logo--empty'>Not Available</span>

        return array
        ? array?.map( provider => (
            <img src={ PROVIDERS_LOGO_URL + provider.logo_path } alt={ provider.provider_name } key={ uuid() } className='provider__logo'/>
        ) )
        : <span className='provider__logo--empty'>Not Available</span>
    }

    return (
    <>
        {  streaming &&
            createProviders(providersInfo)
        }

        { buy &&
            createProviders(buyInfo)
        }

        { rent &&
            createProviders(rentInfo)
        }
    </>
    )
}
