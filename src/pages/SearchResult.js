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
                    const mySearch = res.data.results.map(data => ({...data, bookmark: false}))
                        const myNewSearch = [...searchResults, ...mySearch]
                        setSearchResults(myNewSearch)
                    console.log(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, language, searchPage])

    const moreData = () => {
        if (searchResults.length >= DISPLAY_MAX_PAGE) return sethasMoreResults(false)
        setSearchPage(searchPage + 1)
    }

    return (
        <InfiniteScroll
            dataLength={searchResults.length}
            next={() => moreData()}
            hasMore={hasMoreResults}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="searchResult">
                <CardsList display={DISPLAY_MAX_PAGE} searchList />
                { searchResults.length === 0 && <div>Nothing</div> }
            </div>
        </InfiniteScroll>
    )
}
