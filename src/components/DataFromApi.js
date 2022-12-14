import React, { useEffect } from 'react'
import axios from 'axios'
import { useMedias, API_URL_TREND_TV, API_URL_TREND_MOVIE, API_URL_LANGUAGE, API_URL_PAGE } from '../contexts/MediaContexts'

export default function DataFromApi() {

  const { language, page, setTrendSeries, setTrendMovies } = useMedias()

    // TRENDING SERIES
    useEffect( () => {
        const url = API_URL_TREND_TV + API_URL_LANGUAGE + language
            axios.get(url)
                .then( res => {
                    const mySeries = res.data.results.map(data => ({...data, bookmark: false}))
                    setTrendSeries(mySeries)
                    console.log(mySeries)
                })
                .catch(error => {
                    console.log(error)
                })
    }, [language])

    // TRENDING MOVIES
    useEffect( () => {
        const url = API_URL_TREND_MOVIE + API_URL_LANGUAGE + language
            axios.get(url)
                .then( res => {
                    const myMovies = res.data.results.map(data => ({...data, bookmark: false}))
                    setTrendMovies(myMovies) 
                    console.log(myMovies)
                })
                .catch(error => {
                    console.log(error)
                })
    }, [language])


    const updateSeries = (a, b) => {
        
        return a.filter(object1 => {
            return b.some(object2 => {
                return object1.id === object2.id
            })
        })
    }


    //NOTES

    // Get data from Axios
    // Create new key 'bookmark' (false) in every object in the data array and asign it to mySeries array
    // Look if array bookmarks (localStorage) is empty
    // if not empty -> then compare mySeries array with bookmarks array
    // if there is common element, then change his bookmark key to true
    // Update everything





    // useEffect(() => {
    //     // search common elements on series and bookmark to update the bookmark field on series array objects

    //     let c = series.filter(value => bookmarks.includes(value))
    //     console.log(c)
    // }, [series, bookmarks])

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
