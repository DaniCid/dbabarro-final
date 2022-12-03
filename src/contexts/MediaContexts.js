import React, { useContext, useState } from "react"
import { v4 as uuid } from "uuid"
import useLocalStorage from '../hooks/useLocalStorage'

const MediaContext = React.createContext();

export const API_KEY = '1fc81efcdf6761d684f7217b604b2343'

export function useMedias() {
    return useContext(MediaContext)
}

export const MediaProvider = ({ children }) => {
    const [series, setSeries] = useState([]) //usar LocalStorage solo para development y poder ver los objetos con inspect, cambiar a UseState luego
    const [movies, setMovies] = useLocalStorage('movies', []) //usar LocalStorage solo para development y poder ver los objetos con inspect, cambiar a UseState luego
    const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])

    const [searchedWord, setSearchedWord] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [language, setLanguage] = useState('en-US')

    function addSeries({ bookmark, image, tags }) {
        setSeries(serie => {
            return [ ...serie, { id: uuid(), bookmark, image, tags }]
        })
    }

    function addMovies({ bookmark, image, tags }) {
        setMovies(movie => {
            return [ ...movie, { id: uuid(), bookmark, image, tags }]
        })
    }

    function addSearchResults({ image, tags, title, id }) {
        setSearchResults(result => {
            return [ ...result, { key: uuid(), id, image, tags, bookmark: false, title }]
        })
    }

    function setLang( x ) {
        setLanguage( x )
    }

    function getSearchResult() {
        return searchResults
    }

    return (
        <MediaContext.Provider value={{
            series,
            movies,
            searchResults,
            language,
            searchedWord,
            addSeries,
            addMovies,
            setLang,
            getSearchResult,
            addSearchResults,
            setSearchResults,
            setSearchedWord
        }}>
            {children}
        </MediaContext.Provider>
    )
}
