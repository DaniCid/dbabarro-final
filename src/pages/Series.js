import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardsList from '../components/CardsList'
import { useMedias, DISPLAY_MAX_PAGE, API_URL_LANGUAGE, API_URL_TREND_TV, API_URL_PAGE } from '../contexts/MediaContexts'

export default function Series() {

    const [hasMoreSeries, setHasMoreSeries] = useState(true)
    
    const { series, language, setSeries, seriesPage, setSeriesPage } = useMedias()

    // SERIES
    useEffect( () => {
        const url = API_URL_TREND_TV + API_URL_LANGUAGE + language + API_URL_PAGE + seriesPage
            axios.get(url)
                .then( res => {
                    const newSeries = [...series, ...res.data.results]
                    setSeries(newSeries)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seriesPage])

    // When language is changed, reset series and fetch them in the right language again
    useEffect( () => {
        const url = API_URL_TREND_TV + API_URL_LANGUAGE + language + API_URL_PAGE + seriesPage
            axios.get(url)
                .then( res => {
                    setSeries(res.data.results)
                })
                .catch(error => {
                    console.log(error)
                })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    const moreSeries = () => {
        if (series.length >= DISPLAY_MAX_PAGE) return setHasMoreSeries(false)
        setSeriesPage(seriesPage + 1)
    }

    return (
        <InfiniteScroll
            dataLength={series.length}
            next={() => moreSeries()}
            hasMore={hasMoreSeries}
            initialScrollY={0}
        >
            <div className="series" data-testid="series">
                <CardsList display={DISPLAY_MAX_PAGE} seriesList />
            </div>
        </InfiniteScroll>
    )
}
