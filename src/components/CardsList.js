import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Card from './Card'
import { useMedias } from '../contexts/MediaContexts'
import { POSTER_MOVIE_URL } from '../contexts/MediaContexts'
import { handleNullImage, handleNullTitle, handleNullDate, handleNullRating, filterName, filterDate } from '../utils/utils'
import Slider from './Slider'

export default function CardsList({ category, display, menu, seriesList, moviesList, searchList, bookmarkList, theaters }) {

	// CONTROL TRENDING MENU
	const [selectedType, setSelectedType] = useState('series')
	const [activeSeries, setActiveSeries] = useState('cardslist__link--active')
	const [activeMovies, setActiveMovies] = useState('')

	const { series, movies, trendSeries, trendMovies, searchResults, bookmarks } = useMedias()

	// CREATE CARDS
	const createCard = medias => {
		return (
			medias?.slice(0, display).map( media => (
				<Card 
					key={ uuid() }
					id={ media.id }
					title={ handleNullTitle( filterName(media) ) }
					type={ media.media_type }
					date={ handleNullDate( filterDate(media) ) }
					bookmark={ media.bookmark }
					image={ handleNullImage(media.poster_path, POSTER_MOVIE_URL) }                    
					rating={ handleNullRating(media.vote_average) }
				/>
			) )
		)
	}

	// Set active tab on Trending Menu for Series & Movies
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
        <div className='cardslist'>
            { menu &&
            <>
                <div className='cardslist__menu'>
                    <h3 className='cardslist__title'>{ category }</h3>
                    <div className='cardslist__types'>
                        <Link onClick={() => onClickSeries()} className={'cardslist__link ' + activeSeries}>Series</Link>
                        <Link onClick={() => onClickMovies()} className={'cardslist__link ' + activeMovies}>Movies</Link>
                    </div>
                </div>

                <div className='cardslist__cards'>
                    { selectedType === 'series' && createCard(trendSeries) }

                    { selectedType === 'movies' && createCard(trendMovies) }
                </div>
            </>
            }

            { theaters && <Slider category={category} /> }

            { seriesList &&
            <div className='cardslist__cards'>
                { createCard(series) }
            </div>
            }

            { moviesList &&
            <div className='cardslist__cards'>
                { createCard(movies) }
            </div>
            }

            { searchList &&
            <div className='cardslist__cards'>
                { createCard(searchResults) }
            </div>
            }

            { bookmarkList &&
            <div className='cardslist__cards'>
                { createCard(bookmarks) }
            </div>
            }
        </div>
	)
}
