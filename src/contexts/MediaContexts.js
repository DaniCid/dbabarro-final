import React, { useContext, useState } from "react"
import useLocalStorage from '../hooks/useLocalStorage'

const MediaContext = React.createContext();

// API
export const API_KEY = '?api_key=1fc81efcdf6761d684f7217b604b2343'
export const API_URL = 'https://api.themoviedb.org/3'
export const API_URL_TREND_MOVIE = '/trending/movie/week'
export const API_URL_TREND_TV = '/trending/tv/week'
export const API_URL_SEARCH = '/search/multi'
export const API_URL_PROVIDERS = '/watch/providers'

// PAGINATION
export const DISPLAY_MAX_PAGE = 18
export const DISPLAY_MAX_TRENDING = 6

// IMAGES FORMAT
export const POSTER_MOVIE_URL = 'https://image.tmdb.org/t/p/w342'

export function useMedias() {
    return useContext(MediaContext)
}

export const MediaProvider = ({ children }) => {

    // BOOKMARKS
    const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])

    // SERIES & MOVIES
    const [series, setSeries] = useState([]) 
    const [movies, setMovies] = useState([])

    // SEARCH
    const [searchedWord, setSearchedWord] = useState('')
    const [searchResults, setSearchResults] = useState([])

    // LANGUAGE
    const [language, setLanguage] = useState('en-US')

    // INFO
    const [infoUrl, setInfoUrl] = useState('')
    const [infoMedia, setInfoMedia] = useState()

    const handleInfoUrl = ( id, type ) => {
        setInfoUrl(API_URL + '/' + type + '/' + id + API_KEY + '&language=') 
    }

    return (
        <MediaContext.Provider value={{
            series,
            movies,
            searchResults,
            language,
            searchedWord,
            infoMedia,
            infoUrl,
            setSeries,
            setMovies,
            setSearchResults,
            setLanguage,
            setSearchedWord,
            setInfoMedia,
            setInfoUrl,
            handleInfoUrl
        }}>
            {children}
        </MediaContext.Provider>
    )
}
