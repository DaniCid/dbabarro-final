import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const MediaContext = React.createContext();

// API
export const API_KEY = '?api_key=1fc81efcdf6761d684f7217b604b2343'
export const API_URL = 'https://api.themoviedb.org/3'

export const API_URL_TREND_MOVIE = API_URL + '/trending/movie/week' + API_KEY
export const API_URL_TREND_TV = API_URL + '/trending/tv/week' + API_KEY
export const API_URL_THEATRES = API_URL + '/movie/now_playing' + API_KEY
export const API_URL_SEARCH = API_URL + '/search/multi'

export const API_URL_CREDITS = '/credits'
export const API_URL_PROVIDERS = '/watch/providers'
export const API_URL_SEASONS = '/season/'
export const API_URL_GALLERY = '/images'

export const API_URL_LANGUAGE = '&language='
export const API_URL_PAGE = '&page='
export const API_URL_QUERY = '&query='
export const API_URL_REGION = '&region='

// PAGINATION
export const DISPLAY_MAX_PAGE = 240         // Limit control for how much results Pages can show
export const DISPLAY_MAX_TRENDING = 6       // Limit control for how much results Trending menu can show

// SLIDER
export const SLIDER_GAIN = 4                // Limit control for how much results Slider can show in every state

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
    const [bookmarks, setBookmarks] = useLocalStorage('Bookmarks', [])
    const [markers, setMarkers] = useLocalStorage('Markers', [])

    // SERIES & MOVIES
    const [series, setSeries] = useState([])
    const [movies, setMovies] = useState([])

    // TRENDING SERIES & TRENDING MOVIES
    const [trendSeries, setTrendSeries] = useState([]) 
    const [trendMovies, setTrendMovies] = useState([])

    // MOVIES IN THEATRES
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])

    // SEARCH
    const [searchResults, setSearchResults] = useState([])

    // LANGUAGE
    const [language, setLanguage] = useState('en-US')

    // PAGES
    let [seriesPage, setSeriesPage] = useState(1)
    let [moviesPage, setMoviesPage] = useState(1)
    let [searchPage, setSearchPage] = useState(1)

    // SLIDER
    let [sliderStart, setSliderStart] = useState(0)
    let [sliderEnd, setSliderEnd] = useState(SLIDER_GAIN)

    // INFO
    const [infoUrl, setInfoUrl] = useState('')
    const [infoMedia, setInfoMedia] = useState()
    const [infoSelected, setInfoSelected] = useState('overview')

    // INFO CAST
    const [castInfo, setCastInfo] = useState([])

    // INFO WATCH PROVIDERS
    const [providersInfo, setProvidersInfo] = useState([])
    const [buyInfo, setBuyInfo] = useState([])
    const [rentInfo, setRentInfo] = useState([])
    const [emptyInfo, setEmptyInfo] = useState(false)

    // INFO SEASONS
    const [seasonsInfo, setSeasonsInfo] = useState([])
    const [seasonNumber, setSeasonNumber] = useState(1)

    // INFO GALLERY
    const [gallery, setGallery] = useState()

    const getMedia = id => {

        let result
        const arrays = [series, movies, trendMovies, trendSeries, searchResults]

        arrays.forEach( array => {
            if (!result) {
                result = array.find(obj => obj.id === id)
            }
        })

        if (result) return result
    }

    const addBookmark = id => {
        const media = getMedia(id)
        setBookmarks( prevBookmarks => {
            if ( prevBookmarks.find(bookmark => bookmark.id === id) ) {
                return prevBookmarks
            }
            return [ ...prevBookmarks, media]
        } )
    }

    const addMarker = id => {
        setMarkers( prevMarker => {
            if ( prevMarker.find(marker => marker === id) ) {
                return prevMarker
            }
            return [ ...prevMarker, id]
        } )
    }

    const deleteBookmark = id => {
        setBookmarks(prevBookmarks => {
            return prevBookmarks.filter(bookmark => bookmark.id !== id)
        } )
    }

    const deleteMarker = id => {
        setMarkers(prevMarkers => {
            return prevMarkers.filter(marker => marker !== id)
        } )
    }

    return (
        <MediaContext.Provider value={{
            series,
            movies,
            trendSeries,
            trendMovies,
            bookmarks,
            markers,
            searchResults,
            language,
            infoMedia,
            infoUrl,
            castInfo,
            providersInfo,
            seriesPage,
            moviesPage,
            searchPage,
            infoSelected,
            seasonsInfo,
            seasonNumber,
            buyInfo,
            rentInfo,
            nowPlayingMovies,
            sliderStart,
            sliderEnd,
            gallery,
            emptyInfo,
            setSeries,
            setMovies,
            setTrendSeries,
            setTrendMovies,
            addMarker,
            deleteMarker,
            setSearchResults,
            setLanguage,
            setInfoMedia,
            setInfoUrl,
            addBookmark,
            deleteBookmark,
            getMedia,
            setCastInfo,
            setProvidersInfo,
            setSeriesPage,
            setMoviesPage,
            setSearchPage,
            setInfoSelected,
            setSeasonsInfo,
            setSeasonNumber,
            setBuyInfo,
            setRentInfo,
            setNowPlayingMovies,
            setSliderStart,
            setSliderEnd,
            setGallery,
            setEmptyInfo
        }}>
            {children}
        </MediaContext.Provider>
    )
}
