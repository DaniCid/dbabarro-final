import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notFound">
      <h2 className="notFound__title">Oops!</h2>
      <div className="notFound__error">Error 404</div>
      <div className="notFound__desc">The page you are looking for was not found.</div>
      <div className="notFound__desc">Better grab some Pop Corn and <Link to="/" className="notFound__link">watch something!</Link></div>
    </div>
  )
}
