import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { deleteAuth } from '../../../../../stores/user/duck/operations'

const Logout = ({
    user,
    deleteAuth,
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {

    const [message, setMessage] = useState('')
    const [oneRequest, setOne] = useState(false)

    useEffect( 
        () => {
            if ( componentVisible && oneRequest === false ) {
                deleteAuth(user.token)
                    .then( () => {
                        setMessage( 'logout success' )
                    }).catch( () => {
                        setMessage( 'logout failed' )
                    })
                setOne( !oneRequest )
            } else {
                activateConsoleInput()
            }
            if ( message !== '' ) {
                setConsoleHistory( consoleHistory + message )
                setComponentVisible( false )
                setOne( false )
                setMessage('')
                activateConsoleInput()
            }
        }
    ) 

    return (
        <div></div>
    )

}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    deleteAuth: (token) => dispatch( deleteAuth( token ) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)