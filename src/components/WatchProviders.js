import React from 'react'
import { useMedias, PROVIDERS_LOGO_URL } from '../contexts/MediaContexts'
import { v4 as uuid } from "uuid"

export default function WatchProviders() {

    const { providersInfo } = useMedias()

  return (
    <>
        {  
        providersInfo?.map( provider => (
            <img src={ PROVIDERS_LOGO_URL + provider.logo_path } alt={ provider.provider_name } key={ uuid() } className='provider__logo'/>
        )) 
        }
        { !providersInfo &&
          <span className='provider__empty'>Not available</span>
        }
      
    </>
  )
}
