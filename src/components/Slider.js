import React, { useEffect } from 'react'
import { useMedias, SLIDER_GAIN, POSTER_MOVIE_URL } from '../contexts/MediaContexts'
import { handleNullDate, handleNullTitle, filterDate, filterName, handleNullImage, handleNullRating } from '../utils/utils'
import Card from './Card'
import { v4 as uuid } from "uuid"

export default function Slider({ category }) {

    // CONTROL PAGINATION SLIDER
    const sliderPage = [1, 2, 3, 4, 5]

	const { nowPlayingMovies, sliderStart, sliderEnd, setSliderStart, setSliderEnd } = useMedias()

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
        updateSliderPage(sliderEnd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliderStart, sliderEnd])

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

    const updateSliderPage = () => {

        const slide1 = document.getElementById("sliderPage1")
        const slide2 = document.getElementById("sliderPage2")
        const slide3 = document.getElementById("sliderPage3")
        const slide4 = document.getElementById("sliderPage4")
        const slide5 = document.getElementById("sliderPage5")

        const slider = [slide1, slide2, slide3, slide4, slide5]

        slider?.map( slide => {
           return slide?.classList.remove("slider__page--active")
        })

        switch(sliderEnd){
            case SLIDER_GAIN:
               return slide1?.classList.add("slider__page--active")

            case SLIDER_GAIN * 2:
                return slide2?.classList.add("slider__page--active")

            case SLIDER_GAIN * 3:
                return slide3?.classList.add("slider__page--active")

            case SLIDER_GAIN * 4:
                return slide4?.classList.add("slider__page--active")
                
            case SLIDER_GAIN * 5:
                return slide5?.classList.add("slider__page--active")
            default:
                return sliderEnd
        }
    }

    return (
        <>
            <h3 className="cardslist__title">{ category }</h3>
            <div className='slider__wrapper'>

                <div className='slider__button' onClick={ () => onClickSliderLeft(nowPlayingMovies) }>
                    <span class="material-symbols-outlined slider__arrow">chevron_left</span>
                </div>

                <div className='cardslist__cards'>       
                    { createSlider(nowPlayingMovies, true, sliderStart, sliderEnd) }
                </div>

                <div className='slider__button' onClick={ () => onClickSliderRight(nowPlayingMovies) }>
                    <span class="material-symbols-outlined slider__arrow">chevron_right</span>
                </div>

            </div>
            <div className='slider__pagination'>
                {
                    sliderPage?.map( page => (
                        <span id={ 'sliderPage' + page } key={ page } className='slider__page'></span>
                    ) )
                }
            </div>
        </>
    )
}
