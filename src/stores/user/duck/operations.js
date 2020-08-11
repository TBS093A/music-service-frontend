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
        serviceUser = {
            id: response['response'].user.id,
            username: response['response'].user.username,
            email: response['response'].user.email,
            ip: response['response'].user.ip,
            city: response['response'].user.city,
            country: response['response'].user.country,
            token: response['response'].Authorization
        }
        dispatch(actions.login(serviceUser))
        return response
    }) 
}

export const deleteAuth = (token) => async (dispatch) => {
    response = await AppService._delete(
        endpoint + 'auth',
        token
    ).then( () => {
        dispatch(actions.logout())
        return response
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
            id: response['response'].user.id,
            username: response['response'].user.username,
            email: response['response'].user.email,
            ip: response['response'].user.ip,
            city: response['response'].user.city,
            country: response['response'].user.country,
            token: response['response'].Authorization
        }
        dispatch(actions.login( serviceUser ))
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