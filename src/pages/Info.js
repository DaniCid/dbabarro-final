import React, {useEffect} from 'react'
import axios from 'axios'
import { useMedias, API_URL, API_KEY, API_URL_CREDITS, API_URL_PROVIDERS, API_URL_LANGUAGE, API_URL_SEASONS, API_URL_GALLERY } from '../contexts/MediaContexts'
import { isEmpty, formatLanguage } from '../utils/utils'
import Cast from '../components/Cast'
import { useParams } from 'react-router-dom'
import InfoMenu from '../components/InfoMenu'
import Overview from '../components/Overview'
import WatchNow from '../components/WatchNow'
import InfoHeader from '../components/InfoHeader'
import Seasons from '../components/Seasons'
import Gallery from '../components/Gallery'

export default function Info() {

    const { language, setCastInfo, infoMedia, setInfoMedia, setProvidersInfo, infoSelected, seasonsInfo, setSeasonsInfo, seasonNumber, setSeasonNumber, setBuyInfo, setRentInfo, setGallery } = useMedias()

    const { id, type } = useParams()

    const URL = API_URL + '/' + type + '/' + id

    const info_url = URL + API_KEY + API_URL_LANGUAGE
    const cast_url = URL + API_URL_CREDITS + API_KEY + API_URL_LANGUAGE
    const providers_url = URL + API_URL_PROVIDERS + API_KEY + API_URL_LANGUAGE
    const gallery_url = URL + API_URL_GALLERY + API_KEY

    let seasons_url = URL + API_URL_SEASONS + seasonNumber + API_KEY + API_URL_LANGUAGE
    
    // INFO SERIES & MOVIES API
    useEffect( () => {
        if (info_url !== '') {
            axios.get(info_url + language)
                .then( res => {
                    setInfoMedia(res.data)
                    console.log(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, info_url])

    // IMAGES SERIES & MOVIES API
    useEffect( () => {
        if (gallery_url !== '') {
            axios.get(gallery_url)
                .then( res => {
                    setGallery(res.data)
                    console.log('gallery')
                    console.log(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gallery_url])

    // INFO CAST API
    useEffect( () => {
        if (cast_url !== '') {
            axios.get(cast_url + language)
                .then( res => {
                    setCastInfo(res.data.cast)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [language, cast_url])

    // PROVIDERS SERIES & MOVIES API
    useEffect( () => {
        if (providers_url !== '') {
            axios.get(providers_url + language)
                .then( res => {
                    if (isEmpty(res.data.results)) {
                        setProvidersInfo([])
                    } else {
                        setProvidersInfo(res.data.results[formatLanguage(language)].flatrate)
                        console.log('providers')
                        console.log(res.data.results)
                        setBuyInfo(res.data.results[formatLanguage(language)].buy)
                        setRentInfo(res.data.results[formatLanguage(language)].rent)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [language, providers_url])

    // INFO SEASONS SERIES API
    useEffect( () => {
        console.log("entro aqui")
        // if (seasons_url !== '' && seasonNumber < infoMedia?.number_of_seasons + 1 ) {
            console.log(infoMedia?.number_of_seasons)
            if ( seasonNumber > infoMedia?.number_of_seasons ) { setSeasonNumber(1)}
            console.log("y aqui tambien")
            axios.get(seasons_url + language)
                .then( res => {
                    res.data.season_id = id
                    const totalSeasons = [...seasonsInfo, res.data]
                    const mySeasons = resetSeason(totalSeasons, id)
                    setSeasonsInfo(mySeasons)
                    console.log('seasons')
                    console.log(res.data)

                })
                .then(() => {
                    if ( seasonNumber < infoMedia?.number_of_seasons ) { setSeasonNumber( seasonNumber + 1) }      
                })
                .catch(error => {
                    console.log(error)
                })
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [language, seasonNumber])




    // useEffect(() => {

    //     const limit = infoMedia?.number_of_seasons

    //     for (let i = 1; i < limit+1; i++) {
    //         let seasons_url = URL + API_URL_SEASONS + i + API_KEY + API_URL_LANGUAGE
    //         axios.get(seasons_url + language)
    //             .then( res => {
    //                 // res.data.season_id = id
    //                 const totalSeasons = [...seasonsInfo, res.data]
    //                 // const mySeasons = resetSeason(totalSeasons, id)
    //                 setSeasonsInfo(totalSeasons)
    //                 console.log('seasons')
    //                 console.log(seasonsInfo)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //     }
    // }, [language]);





    const resetSeason = (array, tvId) => {
        // setSeasonNumber(initialState)
        const newArray = array?.filter( season => season.season_id === tvId)
        const finalArray = newArray?.filter( season => season.id)
        return finalArray
    }

    return (
        <>
            <InfoMenu type={type} />

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

