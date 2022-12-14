import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
        <div className="snsList">
            <i className="snsList__icon fa-brands fa-twitter"></i>
            <i className="snsList__icon fa-brands fa-facebook-f"></i>
            <i className="snsList__icon fa-brands fa-tiktok"></i>
        </div>
        <div className="footer__copyright">&copy;2022 Dani with <a href="https://www.themoviedb.org/">TMDB</a> & <a href="https://www.justwatch.com/">JustWatch</a> collaboration</div>
    </footer>
  )
}
