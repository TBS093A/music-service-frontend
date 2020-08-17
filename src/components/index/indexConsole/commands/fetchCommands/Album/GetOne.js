import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getOneAlbum } from '../../../../../../stores/album/duck/operations'
import { ResetComponent } from '../Abstract Utils/ResetComponent'
import { FormGenerator } from '../Abstract Utils/FormGenerator'
import { mapRowToString } from '../Abstract Utils/MapRowsToString'
import { AbstractGetOne } from '../Abstract Utils/AbstractGetOne'

const AlbumGetOne = ({ 
    album, 
    getOneAlbum, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    
    const getOneInput = React.createRef()

    let refList = [
        getOneInput
    ]

    let inputList = [
        {
            type: 'text',
            name: 'id',
            endpoint: 'Album',
            ref: getOneInput
        }
    ]

    const mapAlbumToString = ( album ) => {
        let mapFields = [
            'title',
            'id',
            'user_id',
            'url_code'
        ]
        return mapRowToString( album, mapFields )
    }

    const getOneAlbumFetch = (event) => {
        AbstractGetOne(
            refList,
            consoleHistory,
            setConsoleHistory, 
            setMessage, 
            getOneAlbum, 
            mapAlbumToString
        )
    }

    const resetState = () => {
        setConsoleHistory( consoleHistory + message )
        setComponentVisible( false )
        setMessage('')
    }

    return (
        <div>
            <FormGenerator 
                inputList={ inputList }
                refList={ refList }
                action={ getOneAlbumFetch }
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

{/* <form onSubmit={ getOne }>
                album id:
                <input 
                        id='getOneAlbumInput'
                        autoComplete='off'
                        ref={ getOneInput }
                    />
                <button type='submit' />
            </form> */}

const mapStateToProps = state => ({
    album: state.album
})

const mapDispatchToProps = dispatch => ({
    getOneAlbum: (id) => dispatch( getOneAlbum(id) )

})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumGetOne)