import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardsList from '../components/CardsList'
import { API_KEY, API_URL_LANGUAGE, API_URL_PAGE, API_URL_SEARCH, API_URL_QUERY, DISPLAY_MAX_PAGE, SEARCH_MIN_CHARS, useMedias } from '../contexts/MediaContexts'
import { useParams } from 'react-router-dom'

export const SearchResult = () => {

    const [hasMoreResults, sethasMoreResults] = useState(true)

    const { query } = useParams()

    const { searchResults, setSearchResults, language, searchPage, setSearchPage } = useMedias()

    // SEARCH API
    useEffect( () => {
        const search = encodeURI(query)
        const url = API_URL_SEARCH + API_KEY + API_URL_LANGUAGE + language + API_URL_PAGE + searchPage + API_URL_QUERY
        if ( search.length > SEARCH_MIN_CHARS ) {
            axios.get(url + search)
                .then( res => {
                    const newSearch = [...searchResults, ...res.data.results]
                    setSearchResults(newSearch)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, language, searchPage])

    // When language is changed, reset searchResults and fetch them in the right language again
    useEffect( () => {
        const search = encodeURI(query)
        const url = API_URL_SEARCH + API_KEY + API_URL_LANGUAGE + language + API_URL_PAGE + searchPage + API_URL_QUERY
        if ( search.length > SEARCH_MIN_CHARS ) {
            axios.get(url + search)
                .then( res => {
                    setSearchResults(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, language])

    const moreData = () => {
        if (searchResults.length >= DISPLAY_MAX_PAGE) return sethasMoreResults(false)
        setSearchPage(searchPage + 1)
    }

    return (
        <InfiniteScroll
            dataLength={searchResults.length}
            next={() => moreData()}
            hasMore={hasMoreResults}
        >
            <div className='search__result'>
                <CardsList display={DISPLAY_MAX_PAGE} searchList />
                { searchResults.length === 0 && <div>Nothing</div> }
            </div>
        </InfiniteScroll>
    )
}
