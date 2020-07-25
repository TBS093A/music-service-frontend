import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import commands from './commands/commands'
import Login from './commands/fetchCommands/Login' 
import Logout from './commands/fetchCommands/Logout'

import '../../../styles/general.scss'


const IndexConsole = ({ user }) => {

    const [consoleHistory, setConsoleHistory] = useState('')

    const [loginCommand, setVisibleLoginForm] = useState(false)
    const [logoutCommand, setVisibleLogoutForm] = useState(false)

    const consoleInput = React.createRef()

    let consoleUser = user.username !== '' 
                    ? user.username + '@00x097 # >  ' 
                    : 'guest@00x097 * >  '

    useEffect(
        () => {
            if ( user.username !== '' ) {
                consoleUser = user.username + '@00x097 # >  '
            } else {
                consoleUser = 'guest@00x097 * >  '
            }
        }
    )

    useEffect( () => resizeConsoleDiv(), [])

    const resizeConsoleDiv = () => {
        let consoleDiv = document.getElementById('consoleDiv')
        consoleDiv.style.height = window.innerHeight - 100 + 'px'
    }

    const detectCommand = (event) => {
        event.preventDefault()
        let inputValue = consoleInput.current.value
        consoleUser += inputValue + '\n'

        if ( user.username !== '' ) {
            if ( inputValue === 'help' ){
                setConsoleHistory( consoleHistory + consoleUser + commands.helpUser() )
            } else if ( inputValue === 'logout' ) {
                setConsoleHistory( consoleHistory + consoleUser )
                setVisibleLogoutForm( !logoutCommand )
            } else if ( inputValue === 'clean' ){
                setConsoleHistory( '' )
            } else {
                setConsoleHistory( consoleHistory + consoleUser + commands.undefined(inputValue) )
            } 
        } else {
            if ( inputValue === 'help' ){
                setConsoleHistory( consoleHistory + consoleUser + commands.help() )
            } else if ( inputValue === 'login' ) {
                setConsoleHistory( consoleHistory + consoleUser )
                setVisibleLoginForm( !loginCommand )
            } else if ( inputValue === 'clean' ){
                setConsoleHistory( '' )
            } else {
                setConsoleHistory( consoleHistory + consoleUser + commands.undefined(inputValue) )
            } 
        }
        consoleInput.current.value = ''
        activateInput()
    }

    const activateInput = () => {
        document.getElementById('consoleInput').focus()
    }

    const checkVisible = ( bool ) => {
        return bool 
            ? { display: 'block' } 
            : { display: 'none' }
    }

    return (
        <div id='consoleDiv' onClick={ activateInput }>
            <div id='consoleInfo'>
                00x097 system (Version 0.1.9) <br />
                type 'help' for more commands <br />
                type 'start -a' for start app 
                <br /><br />
            </div>
            <pre id='consoleHistory'>
                    { consoleHistory }
            </pre>
            <div id='inputForms'>
                <div style={ checkVisible( loginCommand ) } >
                    <Login 
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ loginCommand }
                        setComponentVisible={ setVisibleLoginForm }
                        activateConsoleInput={ activateInput }
                    />
                </div>
                <div style={ checkVisible( logoutCommand ) } >
                    <Logout 
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory } 
                        componentVisible={ logoutCommand }
                        setComponentVisible={ setVisibleLogoutForm }
                        activateConsoleInput={ activateInput }
                    />
                </div>
            </div>
            <form onSubmit={ detectCommand } style={ checkVisible( !(loginCommand || logoutCommand) ) }>
                { consoleUser }
                <input 
                    id='consoleInput'
                    ref={consoleInput}
                    autoComplete='off'
                    autoFocus
                />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, )(IndexConsole)