export const formatReleaseDate = date => {

    if ( date === 'Date Unavailable' ) return date

    const d = new Date(date)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return month + ' ' + year
}

export const round = (value, precision) => {

    if ( value === '-' ) return value

    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}