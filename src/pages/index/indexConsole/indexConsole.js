import React, { useEffect, useState } from 'react'

import commands from './commands'

import '../../../styles/general.scss'

const IndexConsole = () => {

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

    const consoleInput = React.createRef()

    let consoleUser = 'guest@00x097 * >  '

    const detectCommand = (event) => {
        event.preventDefault()
        let inputValue = consoleInput.current.value
        consoleUser += inputValue + '\n'
        if ( inputValue === 'help' )
            setConsoleHistory( consoleHistory + consoleUser + commands.help() )
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
            <form onSubmit={ detectCommand }>
                guest@00x097 * >
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