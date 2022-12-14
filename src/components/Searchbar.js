import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_KEY, API_URL_LANGUAGE, API_URL_PAGE, API_URL_SEARCH, API_URL_QUERY, SEARCH_MIN_CHARS, useMedias } from '../contexts/MediaContexts'
import axios from 'axios'

export default function Searchbar() {

    const searchRef = useRef()

    const navigate = useNavigate()

    const { language, setLanguage } = useMedias()

    const handleSearch = () => {

        if (searchRef.current.value.length > SEARCH_MIN_CHARS) {
            const query = encodeURI(searchRef.current.value)
            navigate("/search/" + query, { replace: true })
        }

        if (searchRef.current.value.length === 0) {
            alert('Empty Searchbar')
        }

        if (searchRef.current.value.length <= SEARCH_MIN_CHARS) {
            alert('Search too short. Please use two or more letters in your search.')
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

            <input ref={ searchRef } type="text" placeholder="Search..." className="searchbar__input" />

            <button onClick={ handleSearch } className="searchbar__button">
                <div className="material-symbols-outlined searchbar__icon">
                    search
                </div>
            </button>     
        </div>
    )
}
