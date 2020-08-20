import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { deleteTrack } from '../../../../../../stores/track/duck/operations'
import { AbstractDelete } from '../Abstract Utils/AbstractDelete'
import { FormGenerator } from '../Abstract Utils/FormGenerator'
import { ResetComponent } from '../Abstract Utils/ResetComponent'

const TrackDelete = ({ 
    user, 
    deleteTrack, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    
    const idInput = React.createRef()

    let refList = [
        idInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Delete',
            endpoint: 'Track'
        },
        {
            type: 'text',
            name: 'id',
            ref: idInput
        }
    ]

    const deleteFetch = (event) => {
        AbstractDelete(
            refList,
            consoleHistory,
            setConsoleHistory,
            setMessage,
            deleteTrack,
            user.token
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
                action={ deleteFetch }
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
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    deleteTrack: (id, token) => deleteTrack(id, token)

})

export default connect(mapStateToProps, mapDispatchToProps)(TrackDelete)