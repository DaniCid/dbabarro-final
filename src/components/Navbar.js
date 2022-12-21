import React from 'react'
import Searchbar from './Searchbar'
import { NavLink } from 'react-router-dom'
import { useMedias } from '../contexts/MediaContexts'

export default function Navbar() {

    const { setMovies, setSeries, setMoviesPage, setSeriesPage } = useMedias()

    // RESET 
    const resetMovies = () => {
        setMovies([])
        setMoviesPage(1)
        window.scroll(0, 0)
    }

    // RESET
    const resetSeries = () => {
        setSeries([])
        setSeriesPage(1)
        window.scroll(0, 0)
    }

    return (
    <>
        <nav className='navbar'>
            <ul className='navbar__menu'>
                <li className='navbar__item'>
                    <NavLink to='/' className='navbar__link'><span className='material-symbols-outlined navbar__icon'>slideshow</span></NavLink>
                </li>
                <li className='navbar__item'>
                    <NavLink to='/series' className='navbar__link' onClick={ resetSeries }>Series</NavLink>
                </li>
                <li className='navbar__item'>
                    <NavLink to='/movies' className='navbar__link' onClick={ resetMovies }>Movies</NavLink>
                </li>
                <li className='navbar__item'>
                    <NavLink to='/bookmark' className='navbar__link'>My List</NavLink>
                </li>
                <li className='navbar__item'>
                    <Searchbar />
                </li>
            </ul>
        </nav>
        
    </>
  )
}

