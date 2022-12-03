import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { API_KEY, useMedias } from '../contexts/MediaContexts'
import axios from 'axios'
import Card from '../components/Card'
import { v4 as uuid } from "uuid"
import CardsList from '../components/CardsList'

export const SearchResult = () => {

  // const { state } = useLocation()

  const { searchResults } = useMedias()

  return (
    <div>
      {console.log('SearchResultPage ResultS:')}
        {console.log(searchResults)}
        <h2>My Data from API</h2>
          {searchResults.results?.map( video => (
              <Card 
                key={uuid()}
                id={video.id}
                title={video.title}
                image={'https://image.tmdb.org/t/p/original'+video.poster_path}
              />
          ))}       
    </div>
  )
}
