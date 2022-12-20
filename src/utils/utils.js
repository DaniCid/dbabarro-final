import imageUnavailable from '../images/imageUnavailable.jpg'
import profileUnavailable from '../images/profileUnavailable.jpg'

// Format date to 'month + year' or only 'year'
export const formatReleaseDate = ( date, yearDate ) => {

    if ( date === 'Date Unavailable' ) return date

    const d = new Date(date)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    let month = months[d.getMonth()]
    let year = d.getFullYear()

    if ( yearDate ) return year

    return month + ' ' + year
}

// Return actual year for copyright footer
export const getCreditYear = () => {

    const y = new Date()
    document.getElementById('year').innerHTML = y.getFullYear()
}

// Round a number to the desired precision
export const round = (value, precision) => {

    if ( value === '-' ) return value

    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}

// Change Language to format ISO 3166-1
export const formatLanguage = language => {

    switch ( language ) {
        case 'en-US':
            return 'US'
        case 'es-ES':
            return 'ES'
        case 'fr-FR':
            return 'FR'
        default:
            return 'US'
    }
}

// FILTERS
export const filterName = array => {
    return array?.name ? array?.name : array?.title
}

export const filterDate = array => {
    return array?.first_air_date ? array?.first_air_date : array?.release_date
}

// DATA CONTROL
export const handleNullImage = (img, path, type) => {

    return (img === null || img === undefined)
    ? type ? profileUnavailable : imageUnavailable
    : path + img
}

export const handleNullTitle = title => {

    return title
    ? title
    : 'No Title'
}

export const handleNullDate = date => {

    return (date !== '' || date !== undefined)
    ? date
    : 'Date Unavailable'
}

export const handleNullRating = rating => {

    return rating
    ? rating
    : '-'
}

export const isEmpty = obj => {

    return Object.keys(obj).length === 0;
}