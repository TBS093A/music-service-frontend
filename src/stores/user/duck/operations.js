import AppService from '../../AppService'

import actions from './actions'


let serviceUser = {}
let response

const endpoint = 'user/'

// Authorization

export const postAuth = (username, password) => async (dispatch) => {
    let body = {
        username: username,
        password: password
    }
    return await AppService._post(
        endpoint + 'auth',
        body,
        AppService.defaultToken
    ).then( response => {
        try {
            serviceUser = {
                id: response.user.id,
                username: response.user.username,
                email: response.user.email,
                ip: response.user.ip,
                city: response.user.city,
                country: response.user.country,
                token: response.Authorization
            }
            dispatch(actions.login(serviceUser))
            return { error: 'login success' }
        } catch {
            return { error: 'login failed' }
        }
    }) 
}

export const deleteAuth = (token) => async (dispatch) => {
    response = await AppService._delete(
        endpoint + 'auth',
        token
    ).then( () => {
        try {
            dispatch(actions.logout())
            return { error: 'logout success'}
        } catch {
            return { error: 'logout failed' }
        }
    })
}

// User CRUD

export const registerUser = async (user) => {
    return await AppService._post(
        endpoint,
        user,
        AppService.defaultToken
    ).then( response => {
        return response
    })
}

export const updateUser = (user, id, token) => async (dispatch) => {
    return await AppService._patch(
        endpoint + id,
        user,
        token
    ).then( response => {
        serviceUser = {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            ip: response.user.ip,
            city: response.user.city,
            country: response.user.country,
            token: token
        }
        dispatch(actions.login(serviceUser))
        return response
    })
}

export const deleteUser = async (id, token) => {
    return await AppService._delete(
        endpoint + id,
        token
    ).then( response => {
        deleteAuth(token)
        return response
    })
}