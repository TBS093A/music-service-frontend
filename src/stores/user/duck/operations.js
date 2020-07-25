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
    try {
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
    } catch {
        return { error: 'connection failed' }
    } 
}

export const deleteAuth = (token)  => async (dispatch) => {
    response = await AppService._delete(
        endpoint + 'auth',
        token
    )
    dispatch(actions.logout())
}

// User CRUD

export const registerUser = async (user) => {
    response = await AppService._post(
        this.endpoint,
        user,
        AppService.defaultToken
    )
}

export const updateUser = (user, id, token) => async (dispatch) => {
    response = await AppService._patch(
        endpoint + id,
        user,
        token
    )
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
}

export const deleteUser = async (id, token) => {
    response = await AppService._delete(
        endpoint + id,
        token
    )
    deleteAuth(token)
}