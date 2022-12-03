import React from 'react'
import { useMedias } from '../contexts/MediaContexts'

export default function AddSerie() {

  const { addSeries } = useMedias()

  function handleSubmit(e) {
    e.preventDefault()
    addSeries({
      bookmark: false,
      image: '',
      tags: ['Disney', 'Prime', 'Netflix']
    })
  }

  return (
    <button style={{padding: '10px', margin: '3px'}} onClick={handleSubmit}>Add Serie</button>
  )
}