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
    
    const mapAlbumsToString = () => {
        setMessage( '.albums' )
        album.albums.map( singleAlbum => {
                setMessage( message  + '├── ' + singleAlbum.title + '\n'
                                     + '│   ├── id: ' + singleAlbum.id + '\n' 
                                     + '│   ├── user id: ' + singleAlbum.user_id + '\n'
                                     + '│   └── url: ' + singleAlbum.url_code + '\n'
                )
            }
        )
    }

    useEffect( 
        () => {
            if ( componentVisible ) {
                getAllAlbum()
            } else {
                activateConsoleInput()         
            }
            if ( componentVisible && album.albums.length > 0 ) {
                mapAlbumsToString()

                setConsoleHistory( consoleHistory + message )
                setComponentVisible( false )
                setMessage('')
            } else if ( componentVisible && album.albums.length <= 0 ) {
                setConsoleHistory( consoleHistory + 'empty' )
                setComponentVisible( false )
                setMessage('')
            }
        }
    )

    return (
        <div>
            
        </div>
    )
}

            // .albums 
            // { album.albums.map( singleAlbum => {
            //         return (
            //             <div>
            //                 │   ├── { singleAlbum.id } <br />
            //                 │   ├── { singleAlbum.user_id } <br />
            //                 │   ├── { singleAlbum.title } <br />
            //                 │   ├── { singleAlbum.url_code }
            //             </div>
            //         )
            //     }) 
            // }

const mapStateToProps = state => ({
    album: state.album
})

const mapDispatchToProps = dispatch => ({
    getAllAlbum: () => dispatch( getAllAlbum() )

})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGetAll)