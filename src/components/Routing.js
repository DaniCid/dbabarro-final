import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Series from '../pages/Series'
import Movies from '../pages/Movies'
import Bookmark from '../pages/Bookmark'
import Info from '../pages/Info'
import NotFound from '../pages/NotFound'
import { SearchResult } from '../pages/SearchResult'

export default function Routing() {

    return (
        <Routes>
            <Route path='/' element={ <App /> } />
            <Route path='/series' element={ <Series />} />
            <Route path='/movies' element={ <Movies />} />
            <Route path='/bookmark' element={ <Bookmark />} />
            <Route path='/info/:type/:id' element={ <Info />} />
            <Route path='/search/:query' element={ <SearchResult />} />
            <Route path='*' element={ <NotFound />} />
        </Routes>
    )
}
