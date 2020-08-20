import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getOneAlbum } from '../../../../../../stores/album/duck/operations'
import { ResetComponent } from '../Abstract Utils/ResetComponent'
import { FormGenerator } from '../Abstract Utils/FormGenerator'
import { mapRowToString } from '../Abstract Utils/MapRowsToString'
import { AbstractGetOne } from '../Abstract Utils/AbstractGetOne'

const AlbumGetOne = ({ 
    album, 
    getOneAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    
    const getOneInput = React.createRef()

    let refList = [
        getOneInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'GetOne',
            endpoint: 'Album'
        },
        {
            type: 'text',
            name: 'id',
            ref: getOneInput
        }
    ]

    const mapAlbumToString = ( album ) => {
        let mapFields = [
            'title',
            'id',
            'user_id',
            'url_code'
        ]
        return mapRowToString( album, mapFields )
    }

    const getOneFetch = () => {
        AbstractGetOne(
            refList,
            consoleHistory,
            setConsoleHistory, 
            setMessage, 
            getOneAlbum, 
            mapAlbumToString
        )
    }

    const resetState = () => {
        setConsoleHistory( consoleHistory + message )
        setComponentVisible( false )
        setMessage('')
    }

    return (
        <div>
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ getOneFetch }
            />
            <ResetComponent
                resetState={ resetState }
                refList={ refList }
                message={ message }
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
    getOneAlbum: (id) => dispatch( getOneAlbum(id) )

})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGetOne)