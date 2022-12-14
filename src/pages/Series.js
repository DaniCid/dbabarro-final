import React from 'react'
import DataFromApi from '../components/DataFromApi'
import CardsList from '../components/CardsList'
import { DISPLAY_MAX_PAGE } from '../contexts/MediaContexts'

export default function Series() {

  return (
    <div className="series" data-testid="series">
      <CardsList display={DISPLAY_MAX_PAGE} seriesList />
      <DataFromApi />
    </div>
  )
}

// We import DataFromApi so that we don't lose the data when we refresh the page