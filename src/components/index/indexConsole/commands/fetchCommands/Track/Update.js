import React, { useState } from 'react'
import { connect } from 'react-redux'

import { updateTrack } from '../../../../../../stores/track/duck/operations'
import { FormGenerator } from '../Abstract Utils/FormGenerator'
import { ResetComponent } from '../Abstract Utils/ResetComponent'
import { validate } from '../Abstract Utils/AbstractUpdate'


const TrackUpdate = ({ 
    user,
    updateTrack, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')

    const [image, setImage] = useState('')
    const [imageInfo, setImageInfo] = useState('Drop/Click\nfor upload track image...')
    const [audio, setAudio] = useState('')
    const [audioInfo, setAudioInfo] = useState('Drop/Click\nfor upload track audio...')

    const idInput = React.createRef()
    const userInput = React.createRef()
    const albumIdInput = React.createRef()
    const titleInput = React.createRef()
    const descriptionInput = React.createRef()
    const textInput = React.createRef()

    let refList = [
        idInput,
        userInput,
        albumIdInput,
        titleInput,
        descriptionInput,
        textInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Create',
            endpoint: 'Track'
        },
        {
            type: 'text',
            name: 'id',
            ref: idInput
        },
        {
            type: 'text',
            name: 'user',
            ref: userInput
        },
        {
            type: 'text',
            name: 'albumID',
            ref: albumIdInput
        },
        {
            type: 'text',
            name: 'title',
            ref: titleInput
        },
        {
            type: 'text',
            name: 'description',
            ref: descriptionInput
        },
        {
            type: 'text',
            name: 'text',
            ref: textInput
        },
        {
            type: 'file',
            name: 'image',
            fileType: 'image',
            dropInfo: imageInfo,
            setDropInfo: setImageInfo,
            file: image,
            setFile: setImage
        },
        {
            type: 'file',
            name: 'audio',
            fileType: 'audio',
            dropInfo: audioInfo,
            setDropInfo: setAudioInfo,
            file: audio,
            setFile: setAudio
        }
    ]

    const resetState = () => {
        setConsoleHistory( consoleHistory + message )
        setComponentVisible( false )
        setImage('')
        setImageInfo('Drop/Click\nfor upload track image...')
        setAudio('')
        setAudioInfo('Drop/Click\nfor upload track audio...')
        setMessage('')
    }

    const updateFetch = async ( refs ) => {
        let track = validate( inputList )
        await updateTrack(
            track.id,
            track,
            user.token
        ).then( response => {
            setMessage( response['info'] + '\n' )
        })
    }

    return (
        <div>
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ updateFetch }
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
    updateTrack: (track, token) => updateTrack(track, token)
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackUpdate)