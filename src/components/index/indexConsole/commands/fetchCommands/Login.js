import React, { useState } from 'react'
import { connect } from 'react-redux'

import { postAuth } from '../../../../../stores/user/duck/operations'


const Login = ({ user, postAuth }) => {
    
    const loginInput = React.createRef()
    const passwInput = React.createRef()

    const [message, setMessage] = useState('')

    const login = (event) => {
        event.preventDefault()
        if ( loginInput.current.value !== '' &&
        passwInput.current.value !== '') {
            postAuth(
                loginInput.current.value, 
                passwInput.current.value
            ).then( response => {
                setMessage(response['error'])
            })
            document.getElementById('passwInput').disbled = true
            document.getElementById('passwInput').disabled = true
        } else if ( passwInput.current.value === '' ) {
            document.getElementById('passwInput').focus()
        }
    }
    
    return (
        <div>
            <form onSubmit={ login }>
                login:
                <input 
                    id='loginInput'
                    ref={ loginInput }
                />
                <br />
                password:
                <input 
                    id='passwInput'
                    type='password'
                    ref={ passwInput }
                />
                <br />
                { message }
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