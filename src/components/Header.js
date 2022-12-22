import React from 'react'

export default function Header() {
    return (
        <header className='header flex-center' data-testid='header'>
            <h1 className='header__title flex-center-col'>
                <span className='header__icon material-symbols-outlined'>slideshow</span><span className='header__tracker'>Tracker</span>
            </h1>
        </header>
    )
}
