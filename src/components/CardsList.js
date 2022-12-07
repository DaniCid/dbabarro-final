import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuid } from "uuid"
import Card from './Card'
import { formatReleaseDate, round } from '../utils/utils'
import { useMedias } from '../contexts/MediaContexts'

export default function CardsList({ category, display, menu, seriesList, moviesList, searchList }) {

    const [selectedType, setSelectedType] = useState('series')
    const { series, movies, searchResults } = useMedias()

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
                { selectedType === 'series' &&
                series?.slice(0, display).map( serie => (
                    <Card 
                        key={ serie.id }
                        title={serie.name}
                        date={formatReleaseDate(serie.first_air_date)}
                        bookmark={ false }
                        image={serie.poster_path}
                        rating={round(serie.vote_average, 1)}
                    />
                ) )
                }

                { selectedType === 'movies' &&
                movies?.slice(0, display).map( movie => (
                    <Card 
                        key={ movie.id }
                        title={movie.title}
                        date={formatReleaseDate(movie.release_date)}
                        bookmark={ false }
                        image={movie.poster_path}
                        rating={round(movie.vote_average, 1)}
                    />
                ) )
                }
            </div>
        </>
        }

        { seriesList &&
        <div className='cardslist__cards'>
            {
            series?.slice(0, display).map( serie => (
                <Card 
                    key={ serie.id }
                    title={serie.name}
                    date={formatReleaseDate(serie.first_air_date)}
                    bookmark={ false }
                    image={serie.poster_path}
                    rating={round(serie.vote_average, 1)}
                />
            ) )
            }
        </div>
        }

        { moviesList &&
        <div className='cardslist__cards'>
            {
            movies?.slice(0, display).map( movie => (
                <Card 
                    key={ movie.id }
                    title={movie.title}
                    date={formatReleaseDate(movie.release_date)}
                    bookmark={ false }
                    image={movie.poster_path}
                    rating={round(movie.vote_average, 1)}
                />
            ) )
            }
        </div>
        }

        {  searchList &&
        <div className='cardslist__cards'>
            {
            searchResults?.slice(0, display).map( searchResult => (
                <Card 
                    key={uuid()}
                    id={searchResult.id}
                    title={searchResult.title}
                    date={formatReleaseDate(
                        searchResult.media_type === 'tv'
                        ? searchResult.first_air_date
                        : searchResult.release_date
                        )}
                    bookmark={ false }
                    image={searchResult.poster_path}
                    rating={round(searchResult.vote_average, 1)}
                />
            ) ) 
            }
        </div>
        }
    </div>
    )
}
