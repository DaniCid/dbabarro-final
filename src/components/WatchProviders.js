import React, { useEffect } from 'react'
import axios from 'axios'
import { useMedias, PROVIDERS_LOGO_URL } from '../contexts/MediaContexts'

export default function WatchProviders({ url }) {

    const { language, providersUrl, setProvidersInfo, providersInfo } = useMedias()

    // // PROVIDERS SERIES & MOVIES API
    // useEffect( () => {
    //     if (url !== '') {
    //         axios.get(url + language)
    //             .then( res => {
    //                 setProvidersInfo(res.data.results[language].flatrate)
    //                 console.log(res.data.results[language])
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     }     
    // }, [language, url])

  return (
    <>
        {  
        providersInfo?.map( provider => (
            <img src={PROVIDERS_LOGO_URL + provider.logo_path} alt={provider.provider_name} className='providersImg'/>
        )) 
        }
        <div className='credit__copyright'>data by JustWatch</div>
    </>
  )
}

// Streaming Endpoint
// res.data.results[language].flatrate -> []