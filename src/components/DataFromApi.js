import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useMedias, API_KEY, API_URL } from '../contexts/MediaContexts'

export default function DataFromApi() {

  const { language, setSeries, setMovies, setSearchResults, searchedWord } = useMedias()

  const [page, setPage] = useState('1')

  // SERIES
  useEffect( () => {
    const url = API_URL + '/trending/tv/week' + API_KEY + '&language=' + language + '&page=' + page
          axios.get(url)
            .then( res => {
              setSeries(res.data.results) 
              console.log(res.data.results)
            })
            .catch(error => {
              console.log(error)
            })
  }, [language])

  // MOVIES
  useEffect( () => {
    const url = API_URL + '/trending/movie/week' + API_KEY + '&language=' + language + '&page=' + page
          axios.get(url)
            .then( res => {
              setMovies(res.data.results)
              console.log(res.data.results)
            })
            .catch(error => {
              console.log(error)
            })
  }, [language])

  // SEARCH
  // useEffect( () => {
  //   const search = '&query=' + encodeURI(searchedWord)
  //   const url = API_URL + '/search/multi' + API_KEY + '&language=' + language + '&page=1'
  //     if(search){
  //         axios.get(url + search)
  //           .then( res => {
  //             setSearchResults(res.data)
  //             console.log('Effect Value:')
  //             console.log(searchedWord)
  //           })
  //           .catch(error => {
  //             console.log(error)
  //           })
  //       }  
  //   }, [searchedWord, language])


  return (
    <></>
  )
}
