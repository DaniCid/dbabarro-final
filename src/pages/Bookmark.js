import React from 'react'
import CardsList from '../components/CardsList'
import { DISPLAY_MAX_PAGE } from '../contexts/MediaContexts'

export default function Bookmark() {
  return (
    <div className="movies">
      <CardsList display={DISPLAY_MAX_PAGE} bookmarkList />
    </div>
  )
}
