import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getOneAlbum } from '../../../../../../stores/album/duck/operations'


const AlbumGetOne = ({ 
    album, 
    getOneAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    
    const getOneInput = React.createRef()

    const getOne = (event) => {
        event.preventDefault()
        let inputValue = getOneInput.current.value
        setConsoleHistory( consoleHistory + 'album id: ' + inputValue + '\n')
        if ( inputValue >= 0 ) {
            getOneAlbum( inputValue ).then( response => {
                if ( response['info'] !== 'Not found.' ){
                    setMessage(
                        response['response'].title + '\n'
                            + '├── id: ' + response['response'].id + '\n' 
                            + '├── user id: ' + response['response'].user_id + '\n'
                            + '└── url: ' + response['response'].url_code + '\n'
                            + response['info'] + '\n'
                    )
                } else{
                    setMessage( 
                        response['info'] + '\n'
                    )
                }
            })
        }
    }

    useEffect( 
        () => {
            if ( componentVisible ) {
                document.getElementById('getOneAlbumInput').focus()
            } else {
                activateConsoleInput()         
            }
            if ( message !== '' ) {

                getOneInput.current.value = ''

                setConsoleHistory( consoleHistory + message )
                setComponentVisible( false )
                setMessage('')
            }
        }
    )

    return (
        <div>
            <form onSubmit={ getOne }>
                album id:
                <input 
                        id='getOneAlbumInput'
                        autoComplete='off'
                        ref={ getOneInput }
                    />
                <button type='submit' />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    album: state.album
})

const mapDispatchToProps = dispatch => ({
    getOneAlbum: (id) => dispatch( getOneAlbum(id) )

})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGetOne)