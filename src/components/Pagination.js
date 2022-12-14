import React, {useEffect} from 'react'
import { useMedias } from '../contexts/MediaContexts'

export default function Pagination() {

    let { page, setPage } = useMedias()

    const next = () => {
        setPage( page + 1 )
    }

  return (
    <div>
        <button onClick={() => next()}>Next</button><br/>
        {'Page: ' + page}
    </div>
  )
}
