import React, { useContext, useState } from "react"
import { useEffect } from "react";
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
export const IMAGE_DB_URL = 'https://image.tmdb.org/t/p/'
export const POSTER_MOVIE_URL = IMAGE_DB_URL + 'w342'
export const BACKDROP_MOVIE_URL = IMAGE_DB_URL + 'original'
export const POSTER_INFO_URL = IMAGE_DB_URL + 'w500'
export const CAST_INFO_URL = IMAGE_DB_URL + 'w138_and_h175_face'

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

    // INFO CAST
    const [castUrl, setCastUrl] = useState('')
    const [castInfo, setCastInfo] = useState([])

    const handleInfoUrl = ( id, type ) => {
        setInfoUrl(API_URL + '/' + type + '/' + id + API_KEY + '&language=')
        setCastUrl(API_URL + '/' + type + '/' + id + '/credits' + API_KEY + '&language=')
    }

    const getMedia = ( id, type ) => {
        return type === 'tv'
        ? series.find(serie => serie.id === id)
        : movies.find(movie => movie.id === id)
    }

    const addBookmark = ( id, type ) => {
        const media = getMedia(id, type)
        setBookmarks( prevBookmarks => {
            if ( prevBookmarks.find(bookmark => bookmark.id === id) ) {
                return prevBookmarks
            }
            return [ ...prevBookmarks, media]
        })
    }

    const deleteBookmark = ( id ) => {
        setBookmarks(prevBookmarks => {
            return prevBookmarks.filter(bookmark => bookmark.id !== id)
        })
    }

    return (
        <MediaContext.Provider value={{
            series,
            movies,
            bookmarks,
            searchResults,
            language,
            searchedWord,
            infoMedia,
            infoUrl,
            castUrl,
            castInfo,
            setSeries,
            setMovies,
            setSearchResults,
            setLanguage,
            setSearchedWord,
            setInfoMedia,
            setInfoUrl,
            handleInfoUrl,
            addBookmark,
            deleteBookmark,
            getMedia,
            setCastInfo
        }}>
            {children}
        </MediaContext.Provider>
    )
}
