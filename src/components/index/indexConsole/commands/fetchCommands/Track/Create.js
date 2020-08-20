import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createTrack } from '../../../../../../stores/track/duck/operations'
import { generateUrlCode } from '../../../../../generateUrlCode'
import { FormGenerator } from '../Abstract Utils/FormGenerator'
import { ResetComponent } from '../Abstract Utils/ResetComponent'


const TrackCreate = ({ 
    user,
    createTrack, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')

    const [image, setImage] = useState('')
    const [imageInfo, setImageInfo] = useState('Drop/Click\nfor upload track image...')
    const [audio, setAudio] = useState('')
    const [audioInfo, setAudioInfo] = useState('Drop/Click\nfor upload track audio...')

    const albumIdInput = React.createRef()
    const titleInput = React.createRef()
    const descriptionInput = React.createRef()
    const textInput = React.createRef()

    let refList = [
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

    const createFetch = async ( refs ) => {
        let track = {
            user_id: user.id,
            album_id: refs[0].current.value,
            title: refs[1].current.value,
            description: refs[2].current.value,
            text: refs[3].current.value,
            image: image,
            audio: audio,
            url_code: generateUrlCode( 'track' ),
        }
        await createTrack(
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
                action={ createFetch }
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
    createTrack: (track, token) => createTrack(track, token)
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackCreate)