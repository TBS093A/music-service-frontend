import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { createAlbum } from '../../../../../../stores/album/duck/operations'
import FormGenerator from '../Abstract Utils/FormGenerator'


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

    let inputList = [
        {
            type: 'text',
            name: 'titleAlbum',
            ref: titleInput
        },
        {
            type: 'text',
            name: 'descriptionAlbum',
            ref: descriptionInput
        },
        {
            type: 'file',
            name: 'imageAlbum',
            fileType: 'image',
            dropInfo: imageInfo,
            setDropInfo: setImageInfo,
            file: image,
            setFile: setImage
        }
    ]

    const create = async (event) => {
        event.preventDefault()
        let title = titleInput.current.value
        let description = descriptionInput.current.value
        if ( title !== '' && description !== '' ) {
            await createFetch(title, description)
        } if ( description === '') {
            document.getElementById('descriptionAlbumInput').focus()
        }
    }

    const createFetch = async (title, description) => {
        let album = {
            user_id: user.id,
            title: title,
            description: description,
            image: image,
            url_code: generateUrlCode(),
        }
        await createAlbum(
            album,
            user.token
        ).then( response => {
            setMessage( response['info'] + '\n' )
        })
    }

    const generateUrlCode = () => {
        let code = 'op?album='
        let hash = [
            '!', '@', '#', '$', '%', '^', '&', '*',
            'Q', 'W', 'X', 'S', 'q', 'w', 'x', 's'
        ]
        code +=  
             + hash[ randomInt(7, 14) ] 
             + hash[ randomInt(7, 14) ] 
             + hash[ randomInt(7, 14) ] 
             + hash[ randomInt(0, 7) ] 
             + hash[ randomInt(0, 7) ]
             + hash[ randomInt(0, 7) ]
             + randomInt(0, 9)
             + randomInt(0, 9) 
             + randomInt(0, 9)
        return code
    }

    const randomInt = (min, max) => {
        return min + Math.floor((max - min) * Math.random())
    }
    
    useEffect( 
        () => {
            if ( componentVisible ) {
                document.getElementById('titleAlbumInput').focus()
            } else {
                activateConsoleInput()         
            }
            if ( message !== '' ) {

                titleInput.current.value = ''
                descriptionInput.current.value = ''

                setConsoleHistory( consoleHistory + message )
                setComponentVisible( false )
                setImage('')
                setImageInfo('Drop/Click\nfor upload album image...')
                setMessage('')
            }
        }
    )

    return (
        <FormGenerator 
            inputList={ inputList }
            action={ create }
        />
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    createAlbum: (album, token) => createAlbum(album, token)
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCreate)