import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEARCH_MIN_CHARS, useMedias } from '../contexts/MediaContexts'

export default function Searchbar() {

    const searchRef = useRef()

    const navigate = useNavigate()

    const { language, setLanguage, setSearchResults, setSearchPage } = useMedias()

    const handleSearch = () => {

        setSearchResults([])
        setSearchPage(1)

        if (searchRef.current.value.length > SEARCH_MIN_CHARS) {
            const query = encodeURI(searchRef.current.value)
            navigate("/search/" + query, { replace: true })
        }

        if (searchRef.current.value.length === 0) {
            return alert('Empty Searchbar')
        }

        if (searchRef.current.value.length <= SEARCH_MIN_CHARS) {
            return alert('Search too short. Please use two or more letters in your search.')
        }
    }

    // Set language
    const handleLanguage = event => {
        
        setLanguage(event.target.value)
    }

    return (
        <div className="searchbar">

            <select value={ language } onChange={ handleLanguage } className="language">
                <option value="es-ES" className="language__option">ES</option>
                <option value="fr-FR" className="language__option">FR</option>
                <option value="en-US" className="language__option">US</option>
            </select>

            <input 
                ref={ searchRef } 
                type="text" 
                placeholder="Search..." 
                className="searchbar__input" 
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        handleSearch()
                    }
                }}
            />

            <button onClick={ handleSearch } className="searchbar__button">
                <div className="material-symbols-outlined searchbar__icon">
                    search
                </div>
            </button>     
        </div>
    )
}
