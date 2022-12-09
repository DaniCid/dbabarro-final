import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useMedias, API_KEY, API_URL, API_URL_TREND_MOVIE, API_URL_TREND_TV, API_URL_MOVIE, API_URL_TV } from '../contexts/MediaContexts'

export default function DataFromApi() {

  const { language, setSeries, setMovies, setSearchResults, searchedWord, selectedId, selectedType, setInfoSerie, setInfoMovie } = useMedias()

  const [page, setPage] = useState('1')

    // TRENDING SERIES
    useEffect( () => {
        const url = API_URL + API_URL_TREND_TV + API_KEY + '&language=' + language + '&page=' + page
            axios.get(url)
                .then( res => {
                    setSeries(res.data.results) 
                    console.log(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
    }, [language])

    // TRENDING MOVIES
    useEffect( () => {
        const url = API_URL + API_URL_TREND_MOVIE + API_KEY + '&language=' + language + '&page=' + page
            axios.get(url)
                .then( res => {
                    setMovies(res.data.results)
                    console.log(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
    }, [language])

    // // DETAIL SERIES & MOVIES
    // useEffect( () => {
    //     const url = API_URL + '/' + selectedType + '/' + selectedId + API_KEY + '&language=' + language

    //     if (selectedId !== '') {
    //         axios.get(url)
    //             .then( res => {
    //                 setInfoSerie(res.data)
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     }
    // }, [language, selectedId, selectedType])

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
