import React, { useState } from 'react'
import { connect } from 'react-redux'

import { getAllTrack } from '../../../../../../stores/track/duck/operations'
import { ResetComponentWithoutInputs } from '../Abstract Utils/ResetComponent'
import { mapAllRowsToString } from '../Abstract Utils/MapRowsToString'

const TrackGetAll = ({
    getAllTrack,
    consoleHistory, setConsoleHistory,
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')

    const resetState = () => {
        setConsoleHistory(consoleHistory + message)
        setComponentVisible(false)
        setMessage('')
    }

    const mapTracksToString = (albums) => {
        let mapFields = [
            'title',
            'id',
            'album_id',
            'user_id',
            'url_code'
        ]
        return mapAllRowsToString( albums, 'albums', mapFields )
    }

    return (
        <div>
            <ResetComponentWithoutInputs
                resetState={ resetState }
                fetchAction={ getAllTrack }
                mapObjectToString={ mapTracksToString }
                message={ message }
                setMessage={ setMessage }
                componentVisible={ componentVisible }
                activateConsoleInput={ activateConsoleInput }
            />
        </div>
    )
}

const mapStateToProps = state => ({
    album: state.album
})

const mapDispatchToProps = dispatch => ({
    getAllTrack: () => dispatch(getAllTrack())

})

export default connect(mapStateToProps, mapDispatchToProps)(TrackGetAll)