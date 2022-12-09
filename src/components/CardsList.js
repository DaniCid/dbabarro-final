import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuid } from "uuid"
import Card from './Card'
import { useMedias } from '../contexts/MediaContexts'
import { POSTER_MOVIE_URL } from '../contexts/MediaContexts'
import imageUnavailable from '../images/imageUnavailable.jpg'

export default function CardsList({ category, display, menu, seriesList, moviesList, searchList }) {

    const [selectedType, setSelectedType] = useState('series')
    const { series, movies, searchResults } = useMedias()

    // CONTROL DATA
    const handleNullImage = ( img ) => {
        return (img === POSTER_MOVIE_URL + 'null' || img === POSTER_MOVIE_URL + 'undefined')
        ? imageUnavailable
        : img
    }

    const handleNullTitle = ( title ) => {
        return title
        ? title
        : 'No Title'
    }

    const handleNullDate = ( date ) => {
        return date !== ''
        ? date
        : 'Date Unavailable'
    }

    const handleNullRating = ( rating ) => {
        return rating
        ? rating
        : '-'
    }

    // CREATE CARDS
    const serieCard = () => {
        return (
            series?.slice(0, display).map( serie => (
                <Card 
                    key={ serie.id }
                    id={ serie.id }
                    title={ handleNullTitle(serie.name) }
                    type={ serie.media_type }
                    date={ handleNullDate(serie.first_air_date) }
                    bookmark={ false }
                    image={ handleNullImage(POSTER_MOVIE_URL + serie.poster_path) }
                    rating={ handleNullRating(serie.vote_average) }
                />
            ) )
        )
    }

    const movieCard = () => {
        return (
            movies?.slice(0, display).map( movie => (
                <Card 
                    key={ movie.id }
                    id={ movie.id }
                    title={ handleNullTitle(movie.title) }
                    type={ movie.media_type }
                    date={ handleNullDate(movie.release_date) }
                    bookmark={ false }
                    image={ handleNullImage(POSTER_MOVIE_URL + movie.poster_path) }
                    rating={ handleNullRating(movie.vote_average) }
                />
            ) )
        )
    }

    const searchCard = () => {
        return (
            searchResults?.slice(0, display).map( searchResult => (
                <Card 
                    key={ uuid() }
                    id={ searchResult.id }
                    title={ handleNullTitle(searchResult.title) }
                    type={ searchResult.media_type }
                    date={ handleNullDate(
                        searchResult.media_type === 'tv'
                        ? searchResult.first_air_date
                        : searchResult.release_date
                        ) }
                    bookmark={ false }
                    image={ handleNullImage(POSTER_MOVIE_URL + searchResult.poster_path) }                    
                    rating={ handleNullRating(searchResult.vote_average) }
                />
            ) )
        )
    }

    return (
    <div className="cardslist">
        { menu &&
        <>
            <div className="cardslist__menu">
                <div className="cardslist__title">{ category }</div>
                <div className="cardslist__types">
                    <NavLink onClick={() => setSelectedType('series')} className="cardslist__link">Series</NavLink>
                    <NavLink onClick={() => setSelectedType('movies')} className="cardslist__link">Movies</NavLink>
                </div>
            </div>

            <div className='cardslist__cards'>
                { selectedType === 'series' && serieCard() }

                { selectedType === 'movies' && movieCard() }
            </div>
        </>
        }

        { seriesList &&
        <div className='cardslist__cards'>
            { serieCard() }
        </div>
        }

        { moviesList &&
        <div className='cardslist__cards'>
            { movieCard() }
        </div>
        }

        { searchList &&
        <div className='cardslist__cards'>
            { searchCard() }
        </div>
        }
    </div>
    )
}
