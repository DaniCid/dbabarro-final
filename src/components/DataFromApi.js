import React, { useEffect } from 'react'
import axios from 'axios'
import { useMedias, API_URL_TREND_TV, API_URL_TREND_MOVIE, API_URL_LANGUAGE, API_URL_THEATRES, API_URL_REGION } from '../contexts/MediaContexts'
import { formatLanguage } from '../utils/utils'

export default function DataFromApi() {

  const { language, setTrendSeries, setTrendMovies, setNowPlayingMovies } = useMedias()

    // TRENDING SERIES
    useEffect( () => {
        const url = API_URL_TREND_TV + API_URL_LANGUAGE + language
            axios.get(url)
                .then( res => {
                    setTrendSeries(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    // TRENDING MOVIES
    useEffect( () => {
        const url = API_URL_TREND_MOVIE + API_URL_LANGUAGE + language
            axios.get(url)
                .then( res => {
                    setTrendMovies(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    // MOVIES IN THEATRES
    useEffect( () => {
        const url = API_URL_THEATRES + API_URL_LANGUAGE + language + API_URL_REGION + formatLanguage(language)
            axios.get(url)
                .then( res => {
                    setNowPlayingMovies(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    return (
    <></>
    )
}
