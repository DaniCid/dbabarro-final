import React from 'react'
import Card from './Card'

export default function CardsList( { title, series, movies, display } ) {

  return (
    <div className="cardslist">
      <div className="cardslist__title">
        { title }
      </div>
      <div className='cardslist__cards'>
        {
          series?.slice(0, display).map( serie => (
            <Card 
              key={ serie.id }
              bookmark={ false }
              image={'../images/bigbang.jpg'}
              tags={ [] }
            />
          )
        ) }
          
          {         
          movies?.slice(0, display).map( movie => (
            <Card 
              key={ movie.id }
              bookmark={ false }
              image={'../images/bigbang.jpg'}
              tags={ [] }
            />
          )
        ) }
      </div>     
    </div>
  )
}
