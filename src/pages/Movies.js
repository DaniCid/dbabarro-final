import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardsList from '../components/CardsList'
import { useMedias, DISPLAY_MAX_PAGE, API_URL_LANGUAGE, API_URL_TREND_MOVIE, API_URL_PAGE } from '../contexts/MediaContexts'

export default function Movies() {

    const [hasMoreMovies, sethasMoreMovies] = useState(true)
    
    const { movies, language, setMovies, moviesPage, setMoviesPage, initialState } = useMedias()

    // MOVIES
    useEffect( () => {
        const url = API_URL_TREND_MOVIE + API_URL_LANGUAGE + language + API_URL_PAGE + moviesPage
            axios.get(url)
                .then( res => {
                    const myMovies = res.data.results.map(data => ({...data, bookmark: false}))
                    const myNewMovies = [...movies, ...myMovies]
                    const uniqueMovies = [...new Set(myNewMovies)]
                    setMovies(uniqueMovies)
                    console.log(movies)
                    console.log(moviesPage)
                })
                .catch(error => {
                    console.log(error)
                })
    }, [language, moviesPage])

    console.log(movies)

    const moreMovies = () => {
        if (movies.length >= DISPLAY_MAX_PAGE) return sethasMoreMovies(false)
        setMoviesPage(moviesPage + 1)
    }

    return (
        <InfiniteScroll
            dataLength={movies.length}
            next={() => moreMovies()}
            hasMore={hasMoreMovies}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="movies">
                <CardsList display={DISPLAY_MAX_PAGE} moviesList />     
            </div>
        </InfiniteScroll>
    )
}

// We import DataFromApi so that we don't lose the data when we refresh the page