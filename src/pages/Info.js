import React, {useEffect} from 'react'
import DataFromApi from '../components/DataFromApi'
import { useMedias } from '../contexts/MediaContexts'
import axios from 'axios'

export default function Info() {

    const { language, infoUrl, infoMedia, setInfoMedia } = useMedias()

    // DETAIL SERIES & MOVIES
    useEffect( () => {
        if (infoUrl !== '') {
            axios.get(infoUrl + language)
                .then( res => {
                    setInfoMedia(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }     
    }, [language, infoUrl])

    return (
        <>
            <div>
                { infoMedia?.name ? infoMedia?.name : infoMedia?.title }
                <br></br>
                { infoMedia?.overview }
            </div>
        </>
    )
} 
