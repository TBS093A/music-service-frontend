import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import commands from './commands/commands'
import Login from './commands/fetchCommands/Login'
import Logout from './commands/fetchCommands/Logout'

import AlbumGetAll from './commands/fetchCommands/Album/GetAll'
import AlbumGetOne from './commands/fetchCommands/Album/GetOne'
import AlbumCreate from './commands/fetchCommands/Album/Create'

import '../../../styles/general.scss'

import { deleteAuth } from '../../../stores/user/duck/operations'
import { createAlbum } from '../../../stores/album/duck/operations'

const IndexConsole = ({ 
    user,
    deleteAuth
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
                setLogout( !logout )
            } else if ( inputValue === 'get all album') {
                setConsoleHistory( consoleHistory + consoleUser )
                setAlbumGetAll( !albumGetAll )
            } else if ( inputValue === 'get one album' ) {
                setConsoleHistory( consoleHistory + consoleUser )
                setAlbumGetOne( !albumGetOne )
            } else if ( inputValue === 'create album' ) {
                setConsoleHistory( consoleHistory + consoleUser )
                setAlbumCreate( !albumCreate )
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
            </div>
            <form onSubmit={ detectCommand } style={ checkVisible( !(
                register || login || logout ||
                albumGetAll || albumGetOne || albumCreate || albumUpdate || albumDelete
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

const mapDispatchToProps = dispatch => ({
    deleteAuth: (token) => dispatch( deleteAuth(token) )
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexConsole)