import React from 'react'

const help = () => {
    return    "register                                            - register user by form \n"
            + "login                                               - login user by form \n"
            + "logout                                              - logout user \n"
            + "start                                               - start command \n"
            + "    -a      --app                                   - app flag - start music service app \n"
            + "clean                                               - clean screen \n"
}

const register = () => {
    return (
        <div>
        
        </div>
    )
}

const login = () => {
    return (
        <div>
        
        </div>
    )
}

const logout = () => {
    return (
        <div>
        
        </div>
    )
}

const startApp = () => {
    return (
        <div>
        
        </div>
    )
}

const undefined = (command) => {
    return 'command "'+ command + '" is undefined\n'
         + '        type "help" for more commands\n'
}

export default {
    help,
    register,
    login,
    logout,
    startApp,
    undefined
}