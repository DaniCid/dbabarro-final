export const formatReleaseDate = date => {
    const d = new Date(date)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return month + ' ' + year
}

export const round = (value, precision) => {
    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}