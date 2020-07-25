import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { postAuth } from '../../../../../stores/user/duck/operations'


const Login = ({ 
    user, 
    postAuth, 
    consoleHistory, setConsoleHistory, 
    componentVisible, setComponentVisible,
    activateConsoleInput
}) => {
    
    const loginInput = React.createRef()
    const passwInput = React.createRef()

    const [message, setMessage] = useState('')

    const login = async (event) => {
        event.preventDefault()
        
        let login = loginInput.current.value 
        let password = passwInput.current.value

        if ( login !== '' && password !== '') {
            
            postAuth(login, password)
                .then( response => {
                    setMessage( response['error'] )
                })

        } else if ( passwInput.current.value === '' ) {
            document.getElementById('passwInput').focus()
        }
    }
    
    useEffect( 
        () => {
            if ( componentVisible ) {
                document.getElementById('loginInput').focus()
            } else {
                activateConsoleInput()
            }
            if (message !== '') {
                let save = 'login:  ' + loginInput.current.value  + '\n'
                         + 'password:  ' + hidePassword( passwInput.current.value ) + '\n'
                         + message + '\n'

                loginInput.current.value = ''
                passwInput.current.value = ''

                setConsoleHistory( consoleHistory + save )
                setComponentVisible( false )
                setMessage('')
            }
        }
    )

    const hidePassword = (password) => {
        let hide = ''
        for (let i = 0; i < password.length; i++)
            hide += '*'
        return hide
    }

    return (
        <div>
            <form onSubmit={ login }>
                login:
                <input 
                    id='loginInput'
                    autoComplete='off'
                    ref={ loginInput }
                />
                <br />
                password:
                <input 
                    id='passwInput'
                    autoComplete='off'
                    type='password'
                    ref={ passwInput }
                />
                <br />
                <button type='submit' />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    postAuth: (username, password) => dispatch( postAuth(username, password) )

})

export default connect(mapStateToProps, mapDispatchToProps)(Login)