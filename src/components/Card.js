import React from 'react'
import { Link } from 'react-router-dom'
import { formatReleaseDate, round } from '../utils/utils'
import { useMedias } from '../contexts/MediaContexts'

export default function Card({ bookmark, image, id, title, type, date, rating, slider }) {

    const empty = 'fa-regular'
    const filled = 'fa-solid'

    const { addBookmark, deleteBookmark, addMarker, deleteMarker, markers, setInfoSelected, setSeasonNumber } = useMedias()

    // Handle the marker-bookmark pairing system
    const onClickBookmark = () => {

        if ( markers?.find( marker => marker === id ) ) {
            deleteMarker(id)
            deleteBookmark(id)
        } else {
            addMarker(id)
            addBookmark(id)
        }
    }

    const handleBookmarkIcon = () => {

        if ( markers?.find( marker => marker === id)) {
            return filled
        } else {
            return empty
        }
    }

    // INITIALIZE OVERVIEW
    const handleLink = () => {

        setInfoSelected('overview')
        setSeasonNumber(1)
    }

    return ( 
        <>
            { !slider &&
                <div className="card">
                    <div className="card__header">
                        <Link to={"/info/" + type + "/" + id} className="card__link" onClick={ handleLink }>
                            <img src={ image } loading="lazy" alt={ title } className="card__image" />
                        </Link>
                        <div className="card__bookmark">
                            <i className={ handleBookmarkIcon() + " fa-bookmark" } onClick={ onClickBookmark }></i>
                        </div>
                    </div>
                    <h3 className="card__title">
                        <Link to={"/info/" + type + "/" + id} className="card__link" onClick={ handleLink }>
                            { title }
                        </Link>
                    </h3>
                    <div className="card__footer">
                        <div className="card__date">{ formatReleaseDate(date) }</div>
                        <div className="card__rating">
                            <i className="fa-solid fa-star"></i>{ round(rating, 1) }
                        </div>
                    </div>
                </div>
            }

            { slider &&
                <div className="card card--slider">
                    <div className="card__header card__header--slider">
                        <Link to={"/info/movie/" + id} className="card__link" onClick={ handleLink }>
                            <img src={ image } loading="lazy" alt={ title } className="card__image" />
                        </Link>
                        <div className="card__bookmark">
                            <i className={"fa-solid fa-film"}></i>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}