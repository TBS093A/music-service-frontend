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

    const detectCommand = (event) => {
        event.preventDefault()
        setConsoleHistory( '# ' + consoleInput.current.value + '\n')
        if (consoleInput.current.value === 'help')
            setConsoleHistory( commands.help() )
            console.log(consoleHistory)
        activateInput()
    }

    return (
        <div id='consoleDiv' onClick={ activateInput }>
            <div>
                tbs093a@00x097 system, welcome <br />
                type 'help' to get commands
            </div>
            <pre id='consoleHistory'>
                    { consoleHistory }
            </pre>
            <form onSubmit={ detectCommand }>
                # 
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