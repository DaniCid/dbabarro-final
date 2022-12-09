import React from 'react'
import { Link } from 'react-router-dom'
import { formatReleaseDate, round } from '../utils/utils'
import { useMedias, API_URL, API_KEY } from '../contexts/MediaContexts'

export default function Card({ bookmark, image, id, title, type, date, rating }) {

    const { setSelectedId, setSelectedType, setInfoUrl, handleInfoUrl } = useMedias()

    const onClickInfo = () => {
        handleInfoUrl(id, type)
    }
  
  return (
    <>
        <div className="card">
            <div className="card__header" onClick={onClickInfo}>
                <Link to="/info" className="card__link" >
                    <img src={image} loading="lazy" alt={title} className="card__image" />
                </Link>
                <div className="card__bookmark">
                    <i className="fa-regular fa-bookmark"></i>
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