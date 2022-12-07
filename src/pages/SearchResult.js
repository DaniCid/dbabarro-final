import React from 'react'
import { DISPLAY_MAX_PAGE } from '../contexts/MediaContexts'
import CardsList from '../components/CardsList'
import DataFromApi from '../components/DataFromApi'

export const SearchResult = () => {
    return (
    <div className="searchResult">
        <CardsList display={DISPLAY_MAX_PAGE} searchList />
        {/* <DataFromApi /> */}
    </div>
    )
}
