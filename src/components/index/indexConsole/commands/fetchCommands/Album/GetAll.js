import React, { useState } from 'react'
import { connect } from 'react-redux'

import { getAllAlbum } from '../../../../../../stores/album/duck/operations'
import { ResetComponentWithoutInputs } from '../Abstract Utils/ResetComponent'
import { mapAllRowsToString } from '../Abstract Utils/MapRowsToString'

const AlbumGetAll = ({
    getAllAlbum,
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

    const mapAlbumsToString = (albums) => {
        let mapFields = [
            'title',
            'id',
            'user_id',
            'url_code'
        ]
        return mapAllRowsToString( albums, 'albums', mapFields )
    }

    return (
        <div>
            <ResetComponentWithoutInputs
                resetState={ resetState }
                fetchAction={ getAllAlbum }
                mapObjectToString={ mapAlbumsToString }
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
    getAllAlbum: () => dispatch(getAllAlbum())

})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGetAll)