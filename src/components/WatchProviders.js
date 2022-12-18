import React from 'react'
import { useMedias, PROVIDERS_LOGO_URL } from '../contexts/MediaContexts'
import { v4 as uuid } from "uuid"

export default function WatchProviders({ streaming, buy, rent}) {

    const { providersInfo, buyInfo, rentInfo } = useMedias()

    const createProviders = array => {
        return array
        ? providersInfo?.map( provider => (
            <img src={ PROVIDERS_LOGO_URL + provider.logo_path } alt={ provider.provider_name } key={ uuid() } className='provider__logo'/>
        ) )
        : 'NA'
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
