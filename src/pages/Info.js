import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useMedias, API_URL, API_KEY, API_URL_CREDITS, API_URL_PROVIDERS, API_URL_LANGUAGE, API_URL_SEASONS, API_URL_GALLERY } from '../contexts/MediaContexts'
import Cast from '../components/Cast'
import InfoMenu from '../components/InfoMenu'
import Overview from '../components/Overview'
import WatchNow from '../components/WatchNow'
import InfoHeader from '../components/InfoHeader'
import Seasons from '../components/Seasons'
import Gallery from '../components/Gallery'
import { isEmpty, formatLanguage } from '../utils/utils'

export default function Info() {

    const { language, setCastInfo, setInfoMedia, setProvidersInfo, infoSelected, setSeasonsInfo, seasonNumber, setBuyInfo, setRentInfo, setGallery, setEmptyInfo } = useMedias()

    const { id, type } = useParams()

    const URL = API_URL + '/' + type + '/' + id

    const info_url = URL + API_KEY + API_URL_LANGUAGE
    const cast_url = URL + API_URL_CREDITS + API_KEY + API_URL_LANGUAGE
    const providers_url = URL + API_URL_PROVIDERS + API_KEY + API_URL_LANGUAGE
    const gallery_url = URL + API_URL_GALLERY + API_KEY
    const seasons_url = URL + API_URL_SEASONS + seasonNumber + API_KEY + API_URL_LANGUAGE
    
    // INFO SERIES & MOVIES API
    useEffect( () => {
        axios.get(info_url + language)
            .then( res => {
                setInfoMedia(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, info_url])

    // IMAGES SERIES & MOVIES API
    useEffect( () => {
        axios.get(gallery_url)
            .then( res => {
                setGallery(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gallery_url])

    // INFO CAST API
    useEffect( () => {
        axios.get(cast_url + language)
            .then( res => {
                setCastInfo(res.data.cast)
            })
            .catch(error => {
                console.log(error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [language, cast_url])

    // PROVIDERS SERIES & MOVIES API
    useEffect( () => {
        setEmptyInfo(false)
        axios.get(providers_url + language)
            .then( res => {
                console.log(res.data.results)
                if (isEmpty(res.data.results)) {
                    setProvidersInfo([])
                    setBuyInfo([])
                    setRentInfo([])
                    setEmptyInfo(true)
                } else {
                    setProvidersInfo(res.data.results[formatLanguage(language)].flatrate)
                    setBuyInfo(res.data.results[formatLanguage(language)].buy)
                    setRentInfo(res.data.results[formatLanguage(language)].rent)
                    setEmptyInfo(false)
                }
            })
            .catch(error => {
                console.log(error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [language, providers_url])

    // INFO SEASONS SERIES API
    useEffect( () => {
        if ( type !== 'movie' ) {
            axios.get(seasons_url + language)
                .then( res => {
                    setSeasonsInfo(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [language, seasonNumber])

    return (
        <>
            <InfoMenu type={type} info/>

            { infoSelected === 'overview' && 
            <>
                <Overview />                
                <Cast />
            </>
            }

            { infoSelected !== 'overview' &&
            <>
                <InfoHeader />

                { infoSelected === 'seasons' && <Seasons /> }
                
                { infoSelected === 'watch' && <WatchNow /> }

                { infoSelected === 'gallery' && <Gallery />}
            </>
            }
        </>
    )
} 

