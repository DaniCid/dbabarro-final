import React from 'react'
import Card from '../components/Card'
import { useMedias } from '../contexts/MediaContexts'

export default function Series() {

  const { series } = useMedias()

  return (
    <div className="series">
        <h1>Series</h1>
        <div className='cardslist__cards'>
        {
          series?.slice(0, 10).map( serie => (
            <Card 
              key={ serie.id }
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
