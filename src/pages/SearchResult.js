import React from 'react'
import { DISPLAY_MAX_PAGE } from '../contexts/MediaContexts'
import CardsList from '../components/CardsList'
import { useMedias } from '../contexts/MediaContexts'

export const SearchResult = () => {

    const { searchResults } = useMedias()

    return (
    <div className="searchResult">
        <CardsList display={DISPLAY_MAX_PAGE} searchList />
        { searchResults.length === 0 &&
            <div>Nothing</div>
        }
    </div>
    )
}
