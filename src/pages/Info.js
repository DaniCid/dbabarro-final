import React, {useEffect} from 'react'
import DataFromApi from '../components/DataFromApi'
import { useMedias } from '../contexts/MediaContexts'
import axios from 'axios'
import { POSTER_INFO_URL, BACKDROP_MOVIE_URL } from '../contexts/MediaContexts'
import { formatReleaseDate } from '../utils/utils'
import Cast from '../components/Cast'

export default function Info() {

    const { language, infoUrl, infoMedia, setInfoMedia, castUrl, setCastInfo, castInfo } = useMedias()

    // INFO SERIES & MOVIES API
    useEffect( () => {
        if (infoUrl !== '') {
            axios.get(infoUrl + language)
                .then( res => {
                    setInfoMedia(res.data)
                    console.log(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }     
    }, [language, infoUrl])

    // INFO CAST API
    useEffect( () => {
        if (castUrl !== '') {
            axios.get(castUrl + language)
                .then( res => {
                    setCastInfo(res.data.cast)
                    console.log(res.data.cast)
                })
                .catch(error => {
                    console.log(error)
                })
        }     
    }, [language, castUrl])

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
                    <div className="postertitle">{ infoMedia?.name ? infoMedia?.name : infoMedia?.title }</div>
                    <div className="genreinfo">
                        <span className="ovdate">{ formatReleaseDate(infoMedia?.first_air_date ? infoMedia?.first_air_date : infoMedia?.release_date, 'year') }</span>
                        <span className="genre">{ infoMedia?.genres.slice(0,3).map( genre => genre.name ).join(", ") }</span>
                        { infoMedia?.episode_run_time?.length > 0 &&
                            <span className="hora">{'- ' + infoMedia?.episode_run_time + 'min'}</span>
                        }
                        { infoMedia?.runtime &&
                            <span className="hora">{'- ' + infoMedia?.runtime + 'min'}</span>
                        }
                    </div>
                </div>
                <div className="overview">
                    <div className="ovtitle"><h2>Overview</h2></div>
                    <div className="ovbody"> { infoMedia?.overview } </div>
                </div>
                <div className="nota"></div>
            </section>
            </div>
        </div>
    </div>
    <Cast />
    </>
    )
} 
