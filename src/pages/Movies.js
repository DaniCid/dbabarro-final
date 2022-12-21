import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardsList from '../components/CardsList'
import { useMedias, DISPLAY_MAX_PAGE, API_URL_LANGUAGE, API_URL_TREND_MOVIE, API_URL_PAGE } from '../contexts/MediaContexts'

export default function Movies() {

    const [hasMoreMovies, setHasMoreMovies] = useState(true)
    
    const { movies, language, setMovies, moviesPage, setMoviesPage } = useMedias()

    // MOVIES
    useEffect( () => {
        const url = API_URL_TREND_MOVIE + API_URL_LANGUAGE + language + API_URL_PAGE + moviesPage
            axios.get(url)
                .then( res => {
                    const newMovies = [...movies, ...res.data.results]
                    setMovies(newMovies)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moviesPage])

    // When language is changed, reset movies and fetch them in the right language again
    useEffect( () => {
        const url = API_URL_TREND_MOVIE + API_URL_LANGUAGE + language + API_URL_PAGE + moviesPage
            axios.get(url)
                .then( res => {
                    setMovies(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    const moreMovies = () => {
        if (movies.length >= DISPLAY_MAX_PAGE) return setHasMoreMovies(false)
        setMoviesPage(moviesPage + 1)
    }

    return (
        <InfiniteScroll
            dataLength={movies.length}
            next={() => moreMovies()}
            hasMore={hasMoreMovies}
            initialScrollY={0}
        >
            <div className="movies">
                <CardsList display={DISPLAY_MAX_PAGE} moviesList />     
            </div>
        </InfiniteScroll>
    )
}