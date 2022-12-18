import React, { useEffect } from 'react'
import axios from 'axios'
import { useMedias, API_URL_TREND_TV, API_URL_TREND_MOVIE, API_URL_LANGUAGE, API_URL_THEATRES } from '../contexts/MediaContexts'
import { formatLanguage } from '../utils/utils'

export default function DataFromApi() {

  const { language, setTrendSeries, setTrendMovies, setNowPlayingMovies } = useMedias()

    // TRENDING SERIES
    useEffect( () => {
        const url = API_URL_TREND_TV + API_URL_LANGUAGE + language
            axios.get(url)
                .then( res => {
                    const mySeries = res.data.results.map(data => ({...data, bookmark: false}))
                    setTrendSeries(mySeries)
                    console.log(mySeries)
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
                    const myMovies = res.data.results.map(data => ({...data, bookmark: false}))
                    setTrendMovies(myMovies) 
                    console.log(myMovies)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    // MOVIES IN THEATRES
    useEffect( () => {
        const url = API_URL_THEATRES + API_URL_LANGUAGE + language + '&region=' + formatLanguage(language)
            axios.get(url)
                .then( res => {
                    const movies = res.data.results.map(data => ({...data, bookmark: false}))
                    setNowPlayingMovies(movies) 
                    console.log(movies)
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
