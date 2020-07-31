import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { updateAlbum } from '../../../../../../stores/album/duck/operations'


const AlbumUpdate = ({ 
    user,
    updateAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    
    const idInput = React.createRef()
    const userInput = React.createRef()
    const titleInput = React.createRef()
    const descriptionInput = React.createRef()
    const imageInput = React.createRef()

    const update = (event) => {
        event.preventDefault()

        let id = idInput.current.value
        let userID = userInput.current.value
        let title = titleInput.current.value
        let description = descriptionInput.current.value
        let image = imageInput.current.value
        
        if ( id !== '' ) {
            updateFetch(id, userID, title, description, image)
        } else {
            document.getElementById('idUpdateAlbumInput').focus()
        }
    }

    const updateFetch = async (id, userID, title, description, image) => {
        let album = {}
        if ( userID !== '' )
            album['user_id'] = userID
        if ( title !== '' )    
            album['title'] = title
        if ( description !== '' )
            album['description'] = description
        if ( image !== '' )
            album['image'] = image
        await updateAlbum(
            id,
            album,
            user.token
        ).then( () => {
            setMessage('album update success')
        }).catch( () => {
            setMessage('album update failed')
        })
    }
    
    useEffect( 
        () => {
            if ( componentVisible ) {
                document.getElementById('idUpdateAlbumInput').focus()
            } else {
                activateConsoleInput()         
            }
            if ( message !== '' ) {

                userInput.current.value = ''
                titleInput.current.value = ''
                descriptionInput.current.value = ''
                imageInput.current.value = ''

                setConsoleHistory( consoleHistory + message + '\n' )
                setComponentVisible( false )
                setMessage('')
            }
        }
    )

    return (
        <div>
            <form onSubmit={ update }>
                id:
                <input 
                        id='idUpdateAlbumInput'
                        autoComplete='off'
                        ref={ idInput }
                    /> <br />
                user_id:
                <input 
                        id='userUpdateAlbumInput'
                        autoComplete='off'
                        ref={ userInput }
                    /> <br />
                title:
                <input 
                        id='titleUpdateAlbumInput'
                        autoComplete='off'
                        ref={ titleInput }
                    /> <br />
                description:
                <input 
                        id='descriptionUpdateAlbumInput'
                        autoComplete='off'
                        ref={ descriptionInput }
                    /> <br />
                image:
                <input 
                        id='imageUpdateAlbumInput'
                        autoComplete='off'
                        ref={ imageInput }
                    />
                <button type='submit' />
            </form>
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