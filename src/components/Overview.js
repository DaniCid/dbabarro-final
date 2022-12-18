import React from 'react'
import { useMedias, BACKDROP_MOVIE_URL, POSTER_INFO_URL } from '../contexts/MediaContexts'
import { formatReleaseDate } from '../utils/utils'
import WatchProviders from './WatchProviders'

export default function Overview() {

    const { infoMedia } = useMedias()

    return (
        <>
            <div className='overview' style={{
                    backgroundImage: `url(${BACKDROP_MOVIE_URL + infoMedia?.backdrop_path})`
                }}>
                    <div className="overview__filter">
                        <div className="overview__wrapper">
                            <img 
                                src={ POSTER_INFO_URL + infoMedia?.poster_path } 
                                loading="lazy" 
                                alt={ infoMedia?.name ? infoMedia?.name : infoMedia?.title }
                                className='overview__poster'
                            />
                            <section className="overview__info">
                                <div className="overview__header">
                                    <h2 className="overview__title">{ infoMedia?.name ? infoMedia?.name : infoMedia?.title }</h2>
                                    <div className="overview__data">
                                        <span className="overview__date">
                                            { formatReleaseDate(infoMedia?.first_air_date ? infoMedia?.first_air_date : infoMedia?.release_date, 'year') }
                                        </span>
                                        <span className="overview__genres">
                                            { infoMedia?.genres.slice(0,3).map( genre => genre.name ).join(", ") }
                                        </span>
                                        { infoMedia?.episode_run_time?.length > 0 &&
                                            <span className="overview__time">{ `- ${infoMedia?.episode_run_time} min` }</span>
                                        }

                                        { infoMedia?.runtime &&
                                            <span className="overview__time">{ `- ${infoMedia?.runtime} min` }</span>
                                        }
                                    </div>
                                </div>
                                <div className="overview__body">
                                    <h2 className="overview__category">Overview</h2>
                                    <div className="overview__overview">{ infoMedia?.overview }</div>
                                </div>
                                <div className="overview__footer">
                                    <div className="watchProviders">
                                        <h2 className="overview__category">Watch Now</h2>
                                        <WatchProviders streaming/>
                                    </div>                               
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
        </>
    )
}
