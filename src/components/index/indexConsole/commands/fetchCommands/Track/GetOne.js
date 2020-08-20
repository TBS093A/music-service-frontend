import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getOneTrack } from '../../../../../../stores/track/duck/operations'
import { ResetComponent } from '../Abstract Utils/ResetComponent'
import { FormGenerator } from '../Abstract Utils/FormGenerator'
import { mapRowToString } from '../Abstract Utils/MapRowsToString'
import { AbstractGetOne } from '../Abstract Utils/AbstractGetOne'

const TrackGetOne = ({ 
    getOneTrack, 
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
            endpoint: 'Track'
        },
        {
            type: 'text',
            name: 'id',
            ref: getOneInput
        }
    ]

    const mapTrackToString = ( album ) => {
        let mapFields = [
            'title',
            'id',
            'album_id',
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
            getOneTrack, 
            mapTrackToString
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
    track: state.track
})

const mapDispatchToProps = dispatch => ({
    getOneTrack: (id) => dispatch( getOneTrack(id) )

})

export default connect(mapStateToProps, mapDispatchToProps)(TrackGetOne)