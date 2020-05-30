import React from 'react'

import AudioPlayer from './playerInterface/audioPlayer'
import IndexPanel from './indexPanel/indexPanel'

const IndexInterface = () => {
    return (
        <div>
            <AudioPlayer />
            <IndexPanel />
        </div>
    )
}
export default IndexInterface