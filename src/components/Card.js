import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ bookmark, image, tags, id, title }) {

    // const tags = []
    // const keywords = tagList.map( tag => tag.toLowerCase() )

    // keywords.map( keyword => {
    //     if ( isTag( keyword ) ) tags.push(keyword)
    // })

  return (
    <Link to="info" className="card__link">
        <div className="card">
            <img src={image} loading="lazy" alt={title} />
            <div className="card__bookmark">
                <i className="fa-regular fa-bookmark"></i>
            </div>
            <div className="card__tagslist">
                <div className="card__tagslist-tag flex-center prime">
                    Prime
                </div>
                <div className="card__tagslist-tag flex-center apple">
                    <i className="fa-brands fa-apple"></i>
                </div>
                <div className="card__tagslist-tag flex-center netflix">
                    Netflix
                </div>
            </div>
        </div>
    </Link>
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
//                     <i class="fa-brands fa-apple"></i>
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