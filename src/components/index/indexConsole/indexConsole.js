import React, { useEffect, useState } from 'react'

import commands from './commands/commands'
import Login from './commands/fetchCommands/Login' 
// import Logout from './commands/fetchCommands/Logout'

import '../../../styles/general.scss'


const IndexConsole = ( user ) => {

    useEffect( () => resizeConsoleDiv(), [])

    const resizeConsoleDiv = () => {
        let consoleDiv = document.getElementById('consoleDiv')
        consoleDiv.style.height = window.innerHeight - 100 + 'px'
    }

    const activateInput = () => {
        let input = document.getElementById('consoleInput')
        input.focus()
    }

    const [consoleHistory, setConsoleHistory] = useState('')

    const [loginCommand, setVisibleLoginForm] = useState(false)
    const [logoutCommand, setVisibleLogoutForm] = useState(false)

    const consoleInput = React.createRef()

    let consoleUser = 'guest@00x097 * >  '

    const detectCommand = (event) => {
        event.preventDefault()
        let inputValue = consoleInput.current.value
        consoleUser += inputValue + '\n'
        if ( inputValue === 'help' )
            setConsoleHistory( consoleHistory + consoleUser + commands.help() )
        else if ( inputValue === 'login' ) {
            setConsoleHistory( consoleHistory + consoleUser )
            setVisibleLoginForm( !loginCommand )
        }
        else if ( inputValue === 'clean' )
            setConsoleHistory( '' )
        else
            setConsoleHistory( consoleHistory + consoleUser + commands.undefined(inputValue) )
        consoleInput.current.value = ''
        activateInput()
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
                <div style={ loginCommand === true ? {display: 'block'} : {display: 'none'} } >
                    <Login visible={ loginCommand } consoleHistory={ consoleHistory } />
                </div>
                <div style={ logoutCommand === true ? {display: 'block'} : {display: 'none'} } >
                    
                </div>
            </div>
            <form onSubmit={ detectCommand } style={ loginCommand || logoutCommand ? {display: 'none'} : {display: 'block'} }>
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

export default IndexConsole