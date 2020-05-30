import React from 'react'

import SongPanel from './panels/songPanel'
import AlbumPanel from './panels/albumPanel'

import '../../../styles/general.scss'

const IndexPanel = () => {

    if ( 1 === 1 )
    return (
        <div id='panelDiv'>
            <SongPanel />
        </div>
    )
    else
    return (
        <div id='panelDiv'>
            <AlbumPanel />
        </div>
    )
}
export default IndexPanel