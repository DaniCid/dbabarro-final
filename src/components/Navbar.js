import React from 'react'
import Searchbar from './Searchbar'
import { NavLink } from 'react-router-dom'
import { useMedias } from '../contexts/MediaContexts'

export default function Navbar() {

    const { language, setLang } = useMedias()

    const handleLanguage = event => {
        setLang(event.target.value)
    }

  return (
    <nav className="navbar">
        <ul className="flex-start navbar__menu">
            <li className="navbar__item">
                <NavLink to="/" className="navbar__link"><span className="material-symbols-outlined navbar__icon">slideshow</span></NavLink>
            </li>
            <li className="navbar__item">
                <NavLink to="/series" className="navbar__link">Series</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink to="/movies" className="navbar__link">Movies</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink to="/bookmark" className="navbar__link">My List</NavLink>
            </li>
            <li className="navbar__item">
                <form>
                    <select value={language} onChange={handleLanguage}>
                        <option value="es-ES">ES</option>
                        <option value="en-US">US</option>
                    </select>
                </form>
            </li>
            <li className="navbar__item">
                <Searchbar />
            </li>
        </ul>
    </nav>
  )
}

