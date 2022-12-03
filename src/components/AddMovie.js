import React from 'react'
import { useMedias } from '../contexts/MediaContexts'

export default function AddMovie() {

  const { addMovies } = useMedias()

  function handleSubmit(e) {
    e.preventDefault()
    addMovies({
      bookmark: false,
      image: '',
      tags: ['Disney', 'Prime', 'Netflix']
    })
  }

  return (
    <button style={{padding: '10px', margin: '3px'}} onClick={handleSubmit}>Add Movie</button>
  )
}
