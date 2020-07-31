import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllAlbum } from '../../../../../../stores/album/duck/operations'


const AlbumGetAll = ({
    album,
    getAllAlbum,
    consoleHistory, setConsoleHistory,
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    const [oneRequest, setOne ] = useState(false)

    const mapAlbumsToString = () => {
        let list = '.albums\n'
        for (let i = 0; i < album.albums.length; i++) {
            list += '├── ' + album.albums[i].title + '\n'
                 + '│   ├── id: ' + album.albums[i].id + '\n'
                 + '│   ├── user id: ' + album.albums[i].user_id + '\n'
                 + '│   └── url: ' + album.albums[i].url_code + '\n'
        }
        return list
    }

    useEffect(
        () => {
            if (componentVisible && oneRequest === false) {
                getAllAlbum()
                    .then( () => {
                        setMessage( 'get list success\n' )
                    }).catch( () => {
                        setMessage( 'get list failed\n' )
                    })
                setOne( !oneRequest )
            } else {
                activateConsoleInput()
            }
            if (componentVisible && album.albums.length > 0) {
                setConsoleHistory(consoleHistory + mapAlbumsToString() + message)
                setComponentVisible(false)
                setOne( !oneRequest )
                setMessage('')
            } 
        }
    )

    return (
        <div>

        </div>
    )
}

const mapStateToProps = state => ({
    album: state.album
})

const mapDispatchToProps = dispatch => ({
    getAllAlbum: () => dispatch(getAllAlbum())

})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGetAll)