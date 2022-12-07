import React from 'react'
import { Link } from 'react-router-dom'
import { POSTER_MOVIE_URL } from '../contexts/MediaContexts'

export default function Card({ bookmark, image, tags, id, title, date, rating }) {

    // const tags = []
    // const keywords = tagList.map( tag => tag.toLowerCase() )

    // keywords.map( keyword => {
    //     if ( isTag( keyword ) ) tags.push(keyword)
    // })

    const handleNullImage = ( img ) => {
        return (img === POSTER_MOVIE_URL + 'null' || img === POSTER_MOVIE_URL + 'undefined')
        ? 'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg'
        : img
    }

    const handleNullTitle = ( title ) => {
        return title
        ? title
        : 'No Title'
    }

    const handleNullDate = ( date ) => {
        return date !== 'undefined NaN'
        ? date
        : 'Date Unavailable'
    }

    const handleNullRating = ( rating ) => {
        return rating
        ? rating
        : '-'
    }
  
  return (
    <>
        <div className="card">
            <div className="card__header">
                <Link to="info" className="card__link">
                    <img src={handleNullImage(POSTER_MOVIE_URL + image)} loading="lazy" alt={handleNullTitle(title)} className="card__image" />
                </Link>
                <div className="card__bookmark">
                    <i className="fa-regular fa-bookmark"></i>
                </div>
            </div>
            <h3 className="card__title">
                <Link to="info" className="card__link">
                    {handleNullTitle(title)}
                </Link>
            </h3>
            <div className="card__footer">
                <div className="card__date">
                    {handleNullDate(date)}
                </div>
                <div className="card__rating">
                    <i className="fa-solid fa-star"></i>{handleNullRating(rating)}
                </div>
            </div>
        </div>
    </>
  )
}

// const TAG = {
//     prime: 'prime',
//     disney: 'disney',
//     netflix: 'netflix',
//     apple: 'apple',
//     hbo: 'hbo',
//     all: 'all'
// }

// const isTag = keyword => {
//     return TAG[keyword]
//     ? true
//     : false
// }

// const getTagsElements = keywords => {
//     keywords.map( keyword => {
        
//         if ( keyword === 'apple' ) {
//             return (
//                 <div className="card__tagslist-tag flex-center apple">
//                     <i className="fa-brands fa-apple"></i>
//                 </div>
//             )
//         }

//         return (
//             <div className={"card__tagslist-tag flex-center" + keyword}>
//                 {keyword}
//             </div>
//         )
//     })
// }