import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_KEY, useMedias } from '../contexts/MediaContexts'
import axios from 'axios'

export default function Searchbar() {

  const searchRef = useRef()
  
  const navigate = useNavigate()

  const [searchResult, setSearchResult] = useState([])
  const { language, setSearchResults, searchResults, searchedWord, setSearchedWord } = useMedias()

  useEffect( () => {
  const search = encodeURI(searchedWord)
  const url = 'https://api.themoviedb.org/3/search/multi?api_key=' + API_KEY + '&language=' + language + '&page=1&include_adult=false&query='
    if(search){
        axios.get(url + search)
          .then( res => {
            setSearchResults(res.data)
            console.log('Effect Language:')
            console.log(language)
            console.log('Effect Value:')
            console.log(searchedWord)
          })
          .catch(error => {
            console.log(error)
          })
      }  
  }, [searchedWord])

  console.log('ResultS General:')
  console.log(searchResults)
  console.log('Result General:')
  console.log(searchResult)
  console.log('Value General:')
  console.log(searchedWord)

  const handleSearch = () => {
    console.log('Pulsado')
    // setSearchResults(searchResult)
    if (searchRef.current.value) {
      setSearchedWord(searchRef.current.value)
      // searchResult.results.map(result => {
      //   addSearchResults({
      //     id: result.id,
      //     title: result.title,
      //     image: result.poster_path,
      //     tags: []
      //   })
      // })
      navigate("/search", { replace: true })
      // setSearchResult('')
    } else {
      console.log("empty searchbar")
    }
  }

  return (
    <div className="searchbar">
      <input 
        ref={ searchRef } 
        type="text" 
        placeholder="Search..." 
        className="searchbar__input"
      />
      <button onClick={ handleSearch } className="searchbar__button">
        <div className="material-symbols-outlined searchbar__icon">
            search
        </div>
      </button>     
    </div>
  )
}
