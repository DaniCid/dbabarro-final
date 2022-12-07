import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_KEY, API_URL, useMedias } from '../contexts/MediaContexts'
import axios from 'axios'

export default function Searchbar() {

  const searchRef = useRef()
  
  const navigate = useNavigate()

  const [searchResult, setSearchResult] = useState([])
  const { language, setLanguage, searchResults, setSearchResults, searchedWord, setSearchedWord } = useMedias()

  useEffect( () => {
  const search = encodeURI(searchedWord)
  const url = API_URL + '/search/multi' + API_KEY + '&language=' + language + '&page=1&include_adult=false&query='
    if(search){
        axios.get(url + search)
          .then( res => {
            setSearchResults(res.data.results)
            console.log('Effect Language:')
            console.log(language)
            console.log('Effect Value:')
            console.log(searchedWord)
            console.log(res.data.results.prueba)
            console.log(searchResults)
          })
          .catch(error => {
            console.log(error)
          })
      }  
  }, [searchedWord, language])

  const handleSearch = () => {
    console.log('Pulsado')

    if (searchRef.current.value) {
      setSearchedWord(searchRef.current.value)

      navigate("/search", { replace: true })
    } else {
      console.log("empty searchbar")
    }
  }

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
