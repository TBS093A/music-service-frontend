import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createAlbum } from '../../../../../../stores/album/duck/operations'
import { generateUrlCode } from '../../../../../generateUrlCode'
import FormGenerator from '../Abstract Utils/FormGenerator'
import { ResetComponent } from '../Abstract Utils/ResetComponent'


const AlbumCreate = ({ 
    user,
    createAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [imageInfo, setImageInfo] = useState('Drop/Click\nfor upload album image...')

    const titleInput = React.createRef()
    const descriptionInput = React.createRef()

    let refList = [
        titleInput,
        descriptionInput
    ]

    let inputList = [
        {
            type: 'text',
            name: 'title',
            endpoint: 'Album',
            ref: titleInput
        },
        {
            type: 'text',
            name: 'description',
            endpoint: 'Album',
            ref: descriptionInput
        },
        {
            type: 'file',
            name: 'image',
            endpoint: 'Album',
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

    const createFetch = async ( refs ) => {
        let album = {
            user_id: user.id,
            title: refs[0].current.value,
            description: refs[1].current.value,
            image: image,
            url_code: generateUrlCode( 'album' ),
        }
        await createAlbum(
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
    createAlbum: (album, token) => createAlbum(album, token)
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCreate)