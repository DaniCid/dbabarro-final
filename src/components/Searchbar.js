import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_KEY, API_URL, API_URL_SEARCH, useMedias } from '../contexts/MediaContexts'
import axios from 'axios'

export default function Searchbar() {

  const searchRef = useRef()
  
  const navigate = useNavigate()

  const [searchResult, setSearchResult] = useState([])
  const { language, setLanguage, searchResults, setSearchResults, searchedWord, setSearchedWord } = useMedias()

    useEffect( () => {
        const search = encodeURI(searchedWord)
        const url = API_URL + API_URL_SEARCH + API_KEY + '&language=' + language + '&page=1&include_adult=false&query='
        if ( search.length > 1 ) {
            axios.get(url + search)
                .then( res => {
                    setSearchResults(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [searchedWord, language])

    const handleSearch = () => {

        if (searchRef.current.value.length > 1) {
            setSearchedWord(searchRef.current.value)
            navigate("/search", { replace: true })
        }

        if (searchRef.current.value.length === 1) return console.log('Need atleast two letter for the search')

        if (searchRef.current.value.length < 1) return console.log('Empty Searchbar')
    }

    console.log(searchResults)
    // Set the language
    const handleLanguage = event => {
        
        setLanguage(event.target.value)
    }

    return (
        <div className="searchbar">

            <select value={ language } onChange={ handleLanguage } className="language">
                <option value="es-ES" className="language__option">ES</option>
                <option value="en-US" className="language__option">US</option>
            </select>

            <input ref={ searchRef } type="text" placeholder="Search..." className="searchbar__input" />

            <button onClick={ handleSearch } className="searchbar__button">
                <div className="material-symbols-outlined searchbar__icon">
                    search
                </div>
            </button>     
        </div>
    )
}
