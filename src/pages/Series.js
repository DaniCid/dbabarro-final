import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardsList from '../components/CardsList'
import { useMedias, DISPLAY_MAX_PAGE, API_URL_LANGUAGE, API_URL_TREND_TV, API_URL_PAGE } from '../contexts/MediaContexts'

export default function Series() {

    const [hasMoreSeries, sethasMoreSeries] = useState(true)
    
    const { series, language, setSeries, seriesPage, setSeriesPage } = useMedias()

    // SERIES
    useEffect( () => {
        const url = API_URL_TREND_TV + API_URL_LANGUAGE + language + API_URL_PAGE + seriesPage
            axios.get(url)
                .then( res => {
                    const mySeries = res.data.results.map(data => ({...data, bookmark: false}))
                    const myNewSeries = [...series, ...mySeries]
                    setSeries(myNewSeries)
                    console.log(series)
                })
                .catch(error => {
                    console.log(error)
                })
    }, [language, seriesPage])

    const moreSeries = () => {
        if (series.length >= DISPLAY_MAX_PAGE) return sethasMoreSeries(false)
        setSeriesPage(seriesPage + 1)
    }

    return (
        <InfiniteScroll
            dataLength={series.length}
            next={() => moreSeries()}
            hasMore={hasMoreSeries}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="series" data-testid="series">
                <CardsList display={DISPLAY_MAX_PAGE} seriesList />
            </div>
        </InfiniteScroll>
    )
}
