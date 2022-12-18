import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from "uuid"
import Card from './Card'
import { useMedias } from '../contexts/MediaContexts'
import { POSTER_MOVIE_URL, SLIDER_GAIN } from '../contexts/MediaContexts'
import { handleNullImage, handleNullTitle, handleNullDate, handleNullRating, filterName, filterDate } from '../utils/utils'
import { useEffect } from 'react'

export default function CardsList({ category, display, menu, seriesList, moviesList, searchList, bookmarkList, nowPlaying }) {

	// CONTROL TRENDING MENU
	const [selectedType, setSelectedType] = useState('series')
	const [activeSeries, setActiveSeries] = useState('cardslist__link--active')
	const [activeMovies, setActiveMovies] = useState('')

	const { series, movies, trendSeries, trendMovies, searchResults, bookmarks, nowPlayingMovies, sliderStart, sliderEnd, setSliderStart, setSliderEnd } = useMedias()

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

    // CREATE SLIDER
    const createSlider = ( medias, slider, start, end) => {
		return (
			medias?.slice(start, end).map( media => (
				<Card 
					key={ uuid() }
					id={ media.id }
					title={ handleNullTitle( filterName(media) ) }
					type={ media.media_type }
					date={ handleNullDate( filterDate(media) ) }
					bookmark={ media.bookmark }
					image={ handleNullImage(media.poster_path, POSTER_MOVIE_URL) }                    
					rating={ handleNullRating(media.vote_average) }
                    slider={slider}
				/>
			) )
		)
	}

    // Call function everytime slider-arrow is clicked
    useEffect( () => {
        createSlider( nowPlayingMovies, true, sliderStart, sliderEnd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliderStart, sliderEnd])

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

    // SLIDER LEFT [-]
    const onClickSliderLeft = array => {
        if (sliderStart === 0) {
            setSliderStart(array.length - SLIDER_GAIN)
            setSliderEnd(array.length)
            return
        }

        setSliderStart(sliderStart - SLIDER_GAIN)
        setSliderEnd(sliderEnd - SLIDER_GAIN)
    }

    // SLIDER RIGHT [+]
    const onClickSliderRight = array => {
        if (sliderEnd === array.length) {
            setSliderStart(0)
            setSliderEnd(SLIDER_GAIN)
            return
        }

        setSliderStart(sliderStart + SLIDER_GAIN)
        setSliderEnd(sliderEnd + SLIDER_GAIN)
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
                    { selectedType === 'series' && createCard(trendSeries) }

                    { selectedType === 'movies' && createCard(trendMovies) }
                </div>
            </>
            }

            { nowPlaying &&
            <>
                <h3 className="cardslist__title">{ category }</h3>
                <div className='cardslist__cards'>
                    <div className='slider__arrow' onClick={ () => onClickSliderLeft(nowPlayingMovies)}><i class="fa-solid fa-caret-left" ></i></div>
                    { createSlider(nowPlayingMovies, true, sliderStart, sliderEnd) }
                    <div className='slider__arrow' onClick={ () => onClickSliderRight(nowPlayingMovies)}><i class="fa-solid fa-caret-right" ></i></div>
                </div>
            </>
            }

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
