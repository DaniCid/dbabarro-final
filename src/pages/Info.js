import React, {useEffect} from 'react'
import DataFromApi from '../components/DataFromApi'
import { useMedias } from '../contexts/MediaContexts'
import axios from 'axios'
import { POSTER_INFO_URL, BACKDROP_MOVIE_URL, API_URL, API_KEY, API_URL_CREDITS, API_URL_PROVIDERS, API_URL_LANGUAGE } from '../contexts/MediaContexts'
import { formatReleaseDate, isEmpty } from '../utils/utils'
import Cast from '../components/Cast'
import WatchProviders from '../components/WatchProviders'
import Crew from '../components/Crew'
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
                    console.log(res.data)
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
                        setProvidersInfo(res.data.results[language].flatrate)
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
            <div className="fondo" style={{
                backgroundImage: `url(${BACKDROP_MOVIE_URL + infoMedia?.backdrop_path})`
            }}>
                <div className="filtro">
                    <div className="wrapperov">
                        <div className="poster">
                            <img src={POSTER_INFO_URL + infoMedia?.poster_path} alt="" />
                        </div>
                        <section className="info">
                            <div className="infotitle">
                                <h2 className="postertitle">{ infoMedia?.name ? infoMedia?.name : infoMedia?.title }</h2>
                                <div className="genreinfo">
                                    <span className="ovdate">
                                        { formatReleaseDate(infoMedia?.first_air_date ? infoMedia?.first_air_date : infoMedia?.release_date, 'year') }
                                    </span>
                                    <span className="genre">
                                        { infoMedia?.genres.slice(0,3).map( genre => genre.name ).join(", ") }
                                    </span>
                                    { infoMedia?.episode_run_time?.length > 0 &&
                                        <span className="hora">{'- ' + infoMedia?.episode_run_time + 'min'}</span>
                                    }

                                    { infoMedia?.runtime &&
                                        <span className="hora">{'- ' + infoMedia?.runtime + 'min'}</span>
                                    }
                                </div>
                            </div>
                            <div className="overview">
                                <h2 className="ovtitle">Overview</h2>
                                <div className="ovbody">{ infoMedia?.overview }</div>
                            </div>
                            <div className="more">
                                <div className="watchProviders">
                                    <h2 className="ovtitle">Watch Now</h2>
                                    <WatchProviders url={providers_url} />
                                </div>
                                <div className="credits">
                                    <div>
                                        {/* { infoMedia?.created_by &&
                                            infoMedia?.created_by?.map( creator => (
                                                <div className="credit__card">
                                                    <div>{creator?.name}</div>
                                                    <div>Creator</div>
                                                </div>
                                            ))
                                        } */}

                                        <Crew />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Cast />
        </>
    )
} 
