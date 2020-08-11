import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { deleteAlbum } from '../../../../../../stores/album/duck/operations'


const AlbumDelete = ({ 
    user, 
    deleteAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    
    const idInput = React.createRef()

    const deleteFetch = (event) => {
        event.preventDefault()
        let id = idInput.current.value
        setConsoleHistory( consoleHistory + 'album id: ' + id + '\n')
        if ( id >= 0 ) {
            deleteAlbum( 
                id,
                user.token
            ).then( response => {
                setMessage( response['info'] + '\n' )
            })
        }
    }

    useEffect( 
        () => {
            if ( componentVisible ) {
                document.getElementById('idAlbumDeleteInput').focus()
            } else {
                activateConsoleInput()         
            }
            if ( message !== '' ) {

                idInput.current.value = ''

                setConsoleHistory( consoleHistory + message )
                setComponentVisible( false )
                setMessage('')
            }
        }
    )

    return (
        <div>
            <form onSubmit={ deleteFetch }>
                album id:
                <input 
                        id='idAlbumDeleteInput'
                        autoComplete='off'
                        ref={ idInput }
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
    deleteAlbum: (id, token) => deleteAlbum(id, token)

})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDelete)