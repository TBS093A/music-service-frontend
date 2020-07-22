import React from 'react'
import { connect } from 'react-redux'

import UserService from '../../../../../stores/user/duck/operations'

const loginInput: any = React.createRef()
const passwInput: any = React.createRef()

const Login = ( user) => {
    

    const login = (event) => {
        event.preventDefault()
        UserService.postAuth(
            loginInput.current.value,
            passwInput.current.value
        )
    }
    
    return (
        <div>
            <form onSubmit={ login }>
                login:
                <input 
                    ref={ loginInput }
                    autoFocus
                />
                <br />
                password:
                <input 
                    ref={ passwInput }
                    autoFocus
                />
                <button type='submit' />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

// const mapDispatchToProps = dispatch => ({
//     postAuth: user => dispatch( UserService.postAuth(user.name, user.pass) )
// })

export default connect(mapStateToProps) (Login)