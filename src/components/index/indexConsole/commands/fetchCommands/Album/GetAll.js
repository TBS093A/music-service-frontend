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
    const [oneRequest, setOne] = useState(false)

    useEffect(
        () => {
            if (componentVisible && oneRequest === false) {
                getAllAlbum().then(response => {
                    setMessage(
                        mapAlbumsToString(
                            response['response']
                        ) + response['info'] + '\n'
                    )
                })
                setOne(!oneRequest)
            } else {
                activateConsoleInput()
            }
            if (message !== '') {
                setConsoleHistory(consoleHistory + message)
                setComponentVisible(false)
                setOne(!oneRequest)
                setMessage('')
            }
        }
    )

    const mapAlbumsToString = (albums) => {
        let list = '.albums\n'
        for (let i = 0; i < albums.length; i++) {
            if (i !== albums.length - 1)
                list += '├── ' + albums[i].title + '\n'
                    + '│       ├── id: ' + albums[i].id + '\n'
                    + '│       ├── user id: ' + albums[i].user_id + '\n'
                    + '│       └── url: ' + albums[i].url_code + '\n'
            else
                list += '└── ' + albums[i].title + '\n'
                    + '          ├── id: ' + albums[i].id + '\n'
                    + '          ├── user id: ' + albums[i].user_id + '\n'
                    + '          └── url: ' + albums[i].url_code + '\n'
        }
        return list
    }

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