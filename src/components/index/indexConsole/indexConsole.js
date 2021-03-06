import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import commands from './commands/commands'
import Login from './commands/fetchCommands/Login'
import Logout from './commands/fetchCommands/Logout'

import AlbumGetAll from './commands/fetchCommands/Album/GetAll'
import AlbumGetOne from './commands/fetchCommands/Album/GetOne'
import AlbumCreate from './commands/fetchCommands/Album/Create'
import AlbumUpdate from './commands/fetchCommands/Album/Update'
import AlbumDelete from './commands/fetchCommands/Album/Delete'

import '../../../styles/general.scss'

const IndexConsole = ({ 
    user
}) => {

    const [consoleHistory, setConsoleHistory] = useState('')

    const [login, setLogin] = useState(false)
    const [logout, setLogout] = useState(false)
    const [register, setRegister] = useState(false)

    const [albumGetAll, setAlbumGetAll] = useState(false)
    const [albumGetOne, setAlbumGetOne] = useState(false)
    const [albumCreate, setAlbumCreate] = useState(false)
    const [albumUpdate, setAlbumUpdate] = useState(false)
    const [albumDelete, setAlbumDelete] = useState(false)

    const [trackGetAll, setTrackGetAll] = useState(false)
    const [trackGetOne, setTrackGetOne] = useState(false)
    const [trackCreate, setTrackCreate] = useState(false)
    const [trackUpdate, setTrackUpdate] = useState(false)
    const [trackDelete, setTrackDelete] = useState(false)

    const [trackRowGetAll, setTrackRowGetAll] = useState(false)
    const [trackRowGetOne, setTrackRowGetOne] = useState(false)
    const [trackRowCreate, setTrackRowCreate] = useState(false)
    const [trackRowUpdate, setTrackRowUpdate] = useState(false)
    const [trackRowDelete, setTrackRowDelete] = useState(false)

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

        let splitCommand = inputValue.split(' ')
        let choiceCRUD = splitCommand[ splitCommand.length - 1 ]
        let useCRUD = choiceCRUD === 'album' 
                   || choiceCRUD === 'track' 
                   || choiceCRUD === 'track-row'
                   || choiceCRUD === 'user'

        if ( user.username !== '' ) {
            if ( inputValue === 'help' ){
                setConsoleHistory( consoleHistory + consoleUser + commands.helpUser() )
            } else if ( inputValue === 'logout' ) {
                setConsoleHistory( consoleHistory + consoleUser )
                setLogout( !logout )
            } else if ( useCRUD ) {
                runCRUD( inputValue, choiceCRUD )
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
                setLogin( !login )
            } else if ( inputValue === 'register' ) {

            } else if ( inputValue === 'clean' ){
                setConsoleHistory( '' )
            } else {
                setConsoleHistory( consoleHistory + consoleUser + commands.undefined(inputValue) )
            } 
        }
        consoleInput.current.value = ''
        activateInput()
    }

    const runCRUD = ( inputValue, object ) => {
        if ( inputValue === 'get all ' + object ) {
            setConsoleHistory( consoleHistory + consoleUser )
            getAll( object )
        } else if ( inputValue === 'get one ' + object ) {
            setConsoleHistory( consoleHistory + consoleUser )
            getOneForm( object )
        } else if ( inputValue === 'create ' + object ) {
            setConsoleHistory( consoleHistory + consoleUser )
            createForm( object )
        } else if ( inputValue === 'update ' + object ) { 
            setConsoleHistory( consoleHistory + consoleUser )
            updateForm( object )
        } else if ( inputValue === 'delete ' + object ) { 
            setConsoleHistory( consoleHistory + consoleUser )
            deleteForm( object )
        }
    }

    const getAll = ( object ) => {
        if (object === 'album') setAlbumGetAll( !albumGetAll )
        if (object === 'track') setTrackGetAll( !trackGetAll )
        if (object === 'track-row') setTrackRowGetAll( !trackRowGetAll )
    }

    const getOneForm = ( object ) => {
        if (object === 'album') setAlbumGetOne( !albumGetOne ) 
        if (object === 'track') setTrackGetOne( !trackGetOne )
        if (object === 'track-row') setTrackRowGetOne( !trackRowGetOne )
    }

    const createForm = ( object ) => {
        if (object === 'album') setAlbumCreate( !albumCreate )
        if (object === 'track') setTrackCreate( !trackCreate )
        if (object === 'track-row') setTrackRowCreate( !trackRowCreate )
    }

    const updateForm = ( object ) => {
        if (object === 'album') setAlbumUpdate( !albumUpdate ) 
        if (object === 'track') setTrackUpdate( !trackUpdate )
        if (object === 'track-row') setTrackRowUpdate( !trackRowUpdate )
    }

    const deleteForm = ( object ) => {
        if (object === 'album') setAlbumDelete( !albumDelete )
        if (object === 'track') setTrackDelete( !trackDelete )
        if (object === 'track-row') setTrackRowDelete( !trackRowDelete )
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
                <div style={ checkVisible( login ) } >
                    <Login 
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ login }
                        setComponentVisible={ setLogin }
                        activateConsoleInput={ activateInput }
                    />
                </div>
                <div style={ checkVisible( logout ) }> 
                    <Logout
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ logout }
                        setComponentVisible={ setLogout }
                        activateConsoleInput={ activateInput }
                    />
                </div>
                <div style={ checkVisible( register ) } >

                </div>


                <div style={ checkVisible( albumGetAll ) }>
                    <AlbumGetAll
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ albumGetAll }
                        setComponentVisible={ setAlbumGetAll }
                        activateConsoleInput={ activateInput }
                    />
                </div>
                <div style={ checkVisible( albumGetOne ) }>
                    <AlbumGetOne
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ albumGetOne }
                        setComponentVisible={ setAlbumGetOne }
                        activateConsoleInput={ activateInput }
                    />    
                </div>
                <div style={ checkVisible( albumCreate ) }>
                    <AlbumCreate 
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ albumCreate }
                        setComponentVisible={ setAlbumCreate }
                        activateConsoleInput={ activateInput }
                    />    
                </div>
                <div style={ checkVisible( albumUpdate ) }>
                    <AlbumUpdate 
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ albumUpdate }
                        setComponentVisible={ setAlbumUpdate }
                        activateConsoleInput={ activateInput }
                    />
                </div>
                <div style={ checkVisible( albumDelete ) }>
                    <AlbumDelete 
                        consoleHistory={ consoleHistory }
                        setConsoleHistory={ setConsoleHistory }
                        componentVisible={ albumDelete }
                        setComponentVisible={ setAlbumDelete }
                        activateConsoleInput={ activateInput }
                    />
                </div>


                <div style={ checkVisible( trackGetAll ) }>

                </div>
                <div style={ checkVisible( trackGetOne ) }>

                </div>
                <div style={ checkVisible( trackCreate ) }>

                </div>
                <div style={ checkVisible( trackUpdate ) }>

                </div>
                <div style={ checkVisible( trackDelete ) }>

                </div>


                <div style={ checkVisible( trackRowGetAll ) }>

                </div>
                <div style={ checkVisible( trackRowGetOne ) }>

                </div>
                <div style={ checkVisible( trackRowCreate ) }>

                </div>
                <div style={ checkVisible( trackRowUpdate ) }>

                </div>
                <div style={ checkVisible( trackRowDelete ) }>

                </div>
            </div>
            <form onSubmit={ detectCommand } style={ checkVisible( !(
                register || login || logout ||
                albumGetAll || albumGetOne || albumCreate || albumUpdate || albumDelete ||
                trackGetAll || trackGetOne || trackCreate || trackUpdate || trackDelete ||
                trackRowGetAll || trackRowGetOne || trackRowCreate || trackRowUpdate || trackRowDelete
            ) ) }>
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