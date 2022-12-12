import React from 'react'
import { Link } from 'react-router-dom'
import { formatReleaseDate, round } from '../utils/utils'
import { useMedias, API_URL, API_KEY } from '../contexts/MediaContexts'
import { useState } from 'react'

export default function Card({ bookmark, image, id, title, type, date, rating }) {

    const empty = 'fa-regular'
    const filled = 'fa-solid'

    const [bookmarkIcon, setBookmarkIcon] = useState(empty)

    const { setSelectedId, setSelectedType, setInfoUrl, handleInfoUrl, addBookmark, deleteBookmark, getMedia } = useMedias()

    const onClickInfo = () => {
        handleInfoUrl(id, type)
    }

    const onClickBookmark = () => {
        console.log(bookmark)
        if ( bookmarkIcon === empty ) {
            addBookmark(id, type)
            //change bookmark to true -> search in series/movies in Context -> change object.bookmark to trrue
            setBookmarkIcon(filled)
        }

        if ( bookmarkIcon === filled ) {
            deleteBookmark(id)
            //change bookmark to false -> search in series/movies in Context -> change object.bookmark to false
            setBookmarkIcon(empty)
        }  
    }

    const handleBookmarkIcon = () => {
        if ( bookmark === false) {
            return empty
        } else {
            return filled
        }
    }


  
  return (
    <>
        <div className="card">
            <div className="card__header" onClick={onClickInfo}>
                <Link to="/info" className="card__link" >
                    <img src={image} loading="lazy" alt={title} className="card__image" />
                </Link>
                <div className="card__bookmark">
                    <i className={bookmarkIcon + " fa-bookmark"} onClick={onClickBookmark}></i>
                </div>
            </div>
            <h3 className="card__title">
                <Link to="/info" className="card__link" onClick={onClickInfo}>
                    {title}
                </Link>
            </h3>
            <div className="card__footer">
                <div className="card__date">
                    {formatReleaseDate(date)}
                </div>
                <div className="card__rating">
                    <i className="fa-solid fa-star"></i>{round(rating, 1)}
                </div>
            </div>
        </div>
    </>
  )
}