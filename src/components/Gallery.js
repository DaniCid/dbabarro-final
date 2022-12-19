import React from 'react'
import { useMedias, POSTER_INFO_URL, BACKDROP_MOVIE_URL } from '../contexts/MediaContexts'

export default function Gallery() {

    const { gallery } = useMedias()

  return (
    <div class="flex-container">
        {
            gallery?.backdrops?.slice(0,15).map( img => (
                <a href={ BACKDROP_MOVIE_URL + img?.file_path } rel='noreferrer' target='_blank'><img src={ POSTER_INFO_URL + img?.file_path } loading="lazy" alt={ 'title' } className='gallery__image' /></a>
            ))
        }
    </div>
  )
}
