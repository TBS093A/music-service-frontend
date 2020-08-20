import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { updateAlbum } from '../../../../../../stores/album/duck/operations'
import { FormGenerator } from '../Abstract Utils/FormGenerator'
import { ResetComponent } from '../Abstract Utils/ResetComponent'
import { validate } from '../Abstract Utils/AbstractUpdate'


const AlbumUpdate = ({ 
    user,
    updateAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [imageInfo, setImageInfo] = useState('Drop/Click\nfor upload album image...')
    
    const idInput = React.createRef()
    const userInput = React.createRef()
    const titleInput = React.createRef()
    const descriptionInput = React.createRef()

    let refList = [
        idInput,
        userInput,
        titleInput,
        descriptionInput
    ]

    let inputList = [
        {
            type: 'info',
            action: 'Update',
            endpoint: 'Album'
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
            name: 'title',
            ref: titleInput
        },
        {
            type: 'text',
            name: 'description',
            ref: descriptionInput
        },
        {
            type: 'file',
            name: 'image',
            fileType: 'image',
            dropInfo: imageInfo,
            setDropInfo: setImageInfo,
            file: image,
            setFile: setImage
        }
    ]
    
    const resetState = () => {
        setConsoleHistory( consoleHistory + message )
        setComponentVisible( false )
        setImage('')
        setImageInfo('Drop/Click\nfor upload album image...')
        setMessage('')
    }

    const updateFetch = async ( refs ) => {
        let album = validate( inputList )
        await updateAlbum(
            album.id,
            album,
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
    updateAlbum: (id, album, token) => updateAlbum(id, album, token)
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumUpdate)