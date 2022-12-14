import React, { useContext, useState } from "react"
import useLocalStorage from '../hooks/useLocalStorage'

const MediaContext = React.createContext();

// API
export const API_KEY = '?api_key=1fc81efcdf6761d684f7217b604b2343'
export const API_URL = 'https://api.themoviedb.org/3'

export const API_URL_TREND_MOVIE = API_URL + '/trending/movie/week' + API_KEY
export const API_URL_TREND_TV = API_URL + '/trending/tv/week' + API_KEY
export const API_URL_SEARCH = API_URL + '/search/multi'

export const API_URL_CREDITS = '/credits'
export const API_URL_PROVIDERS = '/watch/providers'
export const API_URL_LANGUAGE = '&language='
export const API_URL_PAGE = '&page='
export const API_URL_QUERY = '&query='

// PAGINATION
export const DISPLAY_MAX_PAGE = 240         // Limit control for how much results Pages can show
export const DISPLAY_MAX_TRENDING = 6       // Limit control for how much results Trending menu can show

// SEARCH
export const SEARCH_MIN_CHARS = 1           // Limit control for minimum characters needed for a search

// IMAGES FORMAT
export const IMAGE_DB_URL = 'https://image.tmdb.org/t/p/'
export const POSTER_MOVIE_URL = IMAGE_DB_URL + 'w342'
export const BACKDROP_MOVIE_URL = IMAGE_DB_URL + 'w1920_and_h800_multi_faces'
export const POSTER_INFO_URL = IMAGE_DB_URL + 'w500'
export const CAST_INFO_URL = IMAGE_DB_URL + 'w138_and_h175_face'
export const PROVIDERS_LOGO_URL = IMAGE_DB_URL + 'original'

export function useMedias() {
    return useContext(MediaContext)
}

export const MediaProvider = ({ children }) => {

    // BOOKMARKS
    const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])

    // SERIES & MOVIES
    const [series, setSeries] = useState([]) 
    const [movies, setMovies] = useState([])

    // TRENDING SERIES & TRENDING MOVIES
    const [trendSeries, setTrendSeries] = useState([]) 
    const [trendMovies, setTrendMovies] = useState([])

    // SEARCH
    const [searchResults, setSearchResults] = useState([])

    // LANGUAGE
    const [language, setLanguage] = useState('en-US')

    // PAGES
    let [seriesPage, setSeriesPage] = useState(1)
    let [moviesPage, setMoviesPage] = useState(1)
    let [searchPage, setSearchPage] = useState(1)

    // INFO
    const [infoUrl, setInfoUrl] = useState('')
    const [infoMedia, setInfoMedia] = useState()

    // INFO CAST & CREW
    const [castUrl, setCastUrl] = useState('')
    const [castInfo, setCastInfo] = useState([])
    const [crewInfo, setCrewInfo] = useState([])

    // INFO WATCH PROVIDERS
    const [providersInfo, setProvidersInfo] = useState([])

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
            trendSeries,
            trendMovies,
            bookmarks,
            searchResults,
            language,
            infoMedia,
            infoUrl,
            castUrl,
            castInfo,
            crewInfo,
            providersInfo,
            seriesPage,
            moviesPage,
            searchPage,
            setSeries,
            setMovies,
            setTrendSeries,
            setTrendMovies,
            setSearchResults,
            setLanguage,
            setInfoMedia,
            setInfoUrl,
            addBookmark,
            deleteBookmark,
            getMedia,
            setCastInfo,
            setCrewInfo,
            setProvidersInfo,
            setSeriesPage,
            setMoviesPage,
            setSearchPage
        }}>
            {children}
        </MediaContext.Provider>
    )
}
