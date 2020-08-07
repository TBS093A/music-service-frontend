import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { createAlbum } from '../../../../../../stores/album/duck/operations'


const AlbumCreate = ({ 
    user,
    createAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    
    const titleInput = React.createRef()
    const descriptionInput = React.createRef()
    const imageInput = React.createRef()

    const create = (event) => {
        event.preventDefault()
        let title = titleInput.current.value
        let description = descriptionInput.current.value
        let image = imageInput.current.value
        if ( title !== '' && description !== '' && image !== '' ) {
            createFetch(title, description, image)
        } if ( description !== '' && image !== '' ) {
            document.getElementById('descriptionAlbumInput').focus()
        } if ( image !== '' ) {
            document.getElementById('imageAlbumInput').focus()
        }
    }

    const createFetch = async (title, description, image) => {
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
        ).then(
            setMessage('album create success')
        ).catch(
            setMessage('album create failed')
        )
    }

    const generateUrlCode = () => {
        let code = 'op?album='
        let hash = [
            '!', '@', '#', '$', '%', '^', '&', '*',
            'Q', 'W', 'X', 'S', 'q', 'w', 'x', 's'
        ]
        code +=  
             + hash[ randomInt(7, 15) ] 
             + hash[ randomInt(7, 15) ] 
             + hash[ randomInt(7, 15) ] 
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
                imageInput.current.value = ''

                setConsoleHistory( consoleHistory + message + '\n' )
                setComponentVisible( false )
                setMessage('')
            }
        }
    )

    return (
        <div>
            <form onSubmit={ create }>
                title:
                <input 
                        id='titleAlbumInput'
                        autoComplete='off'
                        ref={ titleInput }
                    /> <br />
                description:
                <input 
                        id='descriptionAlbumInput'
                        autoComplete='off'
                        ref={ descriptionInput }
                    /> <br />
                image:
                <input 
                        id='imageAlbumInput'
                        autoComplete='off'
                        ref={ imageInput }
                    /> <br />
                <button type='submit' />
            </form>
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