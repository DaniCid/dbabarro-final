import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from "uuid"
import Card from './Card'
import { useMedias } from '../contexts/MediaContexts'
import { POSTER_MOVIE_URL } from '../contexts/MediaContexts'
import { handleNullImage, handleNullTitle, handleNullDate, handleNullRating } from '../utils/utils'

export default function CardsList({ category, display, menu, seriesList, moviesList, searchList, bookmarkList }) {

    // CONTROL TRENDING MENU
    const [selectedType, setSelectedType] = useState('series')
    const [activeSeries, setActiveSeries] = useState('cardslist__link--active')
    const [activeMovies, setActiveMovies] = useState('')

    const { series, movies, searchResults, bookmarks } = useMedias()

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
                    bookmark={ serie.bookmark }
                    image={ handleNullImage(serie.poster_path, POSTER_MOVIE_URL) }
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
                    bookmark={ movie.bookmark }
                    image={ handleNullImage(movie.poster_path, POSTER_MOVIE_URL) }
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
                    title={ handleNullTitle(
                        searchResult.name
                        ? searchResult.name
                        : searchResult.title
                        ) }
                    type={ searchResult.media_type }
                    date={ handleNullDate(
                        searchResult.first_air_date
                        ? searchResult.first_air_date
                        : searchResult.release_date
                        ) }
                    bookmark={ searchResult.bookmark }
                    image={ handleNullImage(searchResult.poster_path, POSTER_MOVIE_URL) }                    
                    rating={ handleNullRating(searchResult.vote_average) }
                />
            ) )
        )
    }

    const bookmarkCard = () => {
        return (
            bookmarks?.slice(0, display).map( bookmark => (
                <Card 
                    key={ uuid() }
                    id={ bookmark.id }
                    title={ handleNullTitle(
                        bookmark.name
                        ? bookmark.name
                        : bookmark.title
                        ) }
                    type={ bookmark.media_type }
                    date={ handleNullDate(
                        bookmark.first_air_date
                        ? bookmark.first_air_date
                        : bookmark.release_date
                        ) }
                    bookmark={ bookmark.bookmark }
                    image={ handleNullImage(bookmark.poster_path, POSTER_MOVIE_URL) }                    
                    rating={ handleNullRating(bookmark.vote_average) }
                />
            ) )
        )
    }

    // Set active tab on Trending Menu
    const onClickSeries = () => {
        setSelectedType('series')
        setActiveSeries('cardslist__link--active')
        setActiveMovies('')
    }

    const onClickMovies = () => {
        setSelectedType('movies')
        setActiveMovies('cardslist__link--active')
        setActiveSeries('')
    }

    return (
    <div className="cardslist">
        { menu &&
        <>
            <div className="cardslist__menu">
                <h3 className="cardslist__title">{ category }</h3>
                <div className="cardslist__types">
                    <Link onClick={() => onClickSeries()} className={"cardslist__link " + activeSeries}>Series</Link>
                    <Link onClick={() => onClickMovies()} className={"cardslist__link " + activeMovies}>Movies</Link>
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

        { bookmarkList &&
        <div className='cardslist__cards'>
            { bookmarkCard() }
        </div>
        }
    </div>
    )
}
