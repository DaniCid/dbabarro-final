import React, {useEffect} from 'react'
import { useMedias } from '../contexts/MediaContexts'
import axios from 'axios'
import { POSTER_INFO_URL, BACKDROP_MOVIE_URL, API_URL, API_KEY, API_URL_CREDITS, API_URL_PROVIDERS, API_URL_LANGUAGE } from '../contexts/MediaContexts'
import { formatReleaseDate, isEmpty, formatLanguage } from '../utils/utils'
import Cast from '../components/Cast'
import WatchProviders from '../components/WatchProviders'
import { useParams } from 'react-router-dom'

export default function Info() {

    const { language, setCastInfo, setCrewInfo, infoMedia, setInfoMedia, setProvidersInfo } = useMedias()

    const { id, type } = useParams()

    const URL = API_URL + '/' + type + '/' + id

    const info_url = URL + API_KEY + API_URL_LANGUAGE
    const cast_url = URL + API_URL_CREDITS + API_KEY + API_URL_LANGUAGE
    const providers_url = URL + API_URL_PROVIDERS + API_KEY + API_URL_LANGUAGE

    // INFO SERIES & MOVIES API
    useEffect( () => {
        if (info_url !== '') {
            axios.get(info_url + language)
                .then( res => {
                    setInfoMedia(res.data)
                    console.log(info_url)
                })
                .catch(error => {
                    console.log(error)
                })
        }     
    }, [language, info_url])

    // INFO CAST & CREW API
    useEffect( () => {
        if (cast_url !== '') {
            axios.get(cast_url + language)
                .then( res => {
                    setCastInfo(res.data.cast)
                    console.log(res.data.crew)
                    setCrewInfo(res.data.crew)
                })
                .catch(error => {
                    console.log(error)
                })
        }     
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
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }     
    }, [language, providers_url])

    return (
        <>

            {/* <select value={ 'menu' } onChange={  } className="">
                <option value="es-ES" className="language__option">ES</option>
                <option value="fr-FR" className="language__option">FR</option>
                <option value="en-US" className="language__option">US</option>
            </select> */}

            <div className='overview' style={{
                backgroundImage: `url(${BACKDROP_MOVIE_URL + infoMedia?.backdrop_path})`
            }}>
                <div className="overview__filter">
                    <div className="overview__wrapper">
                        <img 
                            src={ POSTER_INFO_URL + infoMedia?.poster_path } 
                            loading="lazy" 
                            alt={ infoMedia?.name ? infoMedia?.name : infoMedia?.title }
                            className='overview__poster'
                        />
                        <section className="overview__info">
                            <div className="overview__header">
                                <h2 className="overview__title">{ infoMedia?.name ? infoMedia?.name : infoMedia?.title }</h2>
                                <div className="overview__data">
                                    <span className="overview__date">
                                        { formatReleaseDate(infoMedia?.first_air_date ? infoMedia?.first_air_date : infoMedia?.release_date, 'year') }
                                    </span>
                                    <span className="overview__genres">
                                        { infoMedia?.genres.slice(0,3).map( genre => genre.name ).join(", ") }
                                    </span>
                                    { infoMedia?.episode_run_time?.length > 0 &&
                                        <span className="overview__time">{ `- ${infoMedia?.episode_run_time} min` }</span>
                                    }

                                    { infoMedia?.runtime &&
                                        <span className="overview__time">{ `- ${infoMedia?.runtime} min` }</span>
                                    }
                                </div>
                            </div>
                            <div className="overview__body">
                                <h2 className="overview__category">Overview</h2>
                                <div className="overview__overview">{ infoMedia?.overview }</div>
                            </div>
                            <div className="overview__footer">
                                <div className="watchProviders">
                                    <h2 className="overview__category">Watch Now</h2>
                                    <WatchProviders />
                                </div>                               
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className='info__cast'>
                <Cast />
            </div>
        </>
    )
} 

