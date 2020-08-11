import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { createAlbum } from '../../../../../../stores/album/duck/operations'
import { progressStream } from '../../../../../../stores/AppService'

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

    const toBase64 = ( file ) => new Promise( (resolve, reject) => {
        let fileReader = new FileReader()
        fileReader.readAsDataURL( file )
        fileReader.onload = () => resolve( fileReader.result )
        fileReader.onerror = error => reject( error )
    })

    const onLoadFile = async ( event ) => {
        event.preventDefault()
        let data = event.target.files[0]
        setImage( await toBase64( data ) )
        setImageInfos(data.name, data.size)
    }

    const onLoadFileDrop = async ( event ) => {
        event.preventDefault()
        event.persist()
        let data = event.dataTransfer.files[0]
        setImage( await toBase64( data ) )
        setImageInfos(data.name, data.size)
    }

    const setImageInfos = (name, size) => {
        setImageInfo( 
            'name: "' 
            + name 
            + '"\nsize: ' 
            + (Math.round(size / 100 + 'e-2') / 100 ) 
            + ' MB' 
        )
    }

    return (
        <div
            onDrop={ event => onLoadFileDrop(event) }
            >
            <form 
                onSubmit={ event => create(event) }>
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
                <pre style={ {marginTop: '25px', marginLeft: '40px'} }>
                    { imageInfo }
                </pre>
                <input  style={ {marginTop: '-55px'} }
                        id='imageAlbumInput'
                        className='uploadInput'
                        type='file'
                        autoComplete='off'
                        onChange={ event => onLoadFile(event) }
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