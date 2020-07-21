import types from './types'
import User from './class'

const INITIAL_STATE: User = {
    id: -1,
    username: '',
    email: '',
    ip: '',
    city: '',
    country: '',
    token: ''
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case types.LOGIN_USER:
            return {
                ...state,
                id: action.item.id,
                username: action.item.username,
                email: action.item.email,
                ip: action.item.ip,
                city: action.item.city,
                country: action.item.country,
                token: action.item.token
            }
        case types.LOGOUT_USER:
            return {
                ...state,
                id: -1,
                username: '',
                email: '',
                ip: '',
                city: '',
                country: '',
                token: ''
            }
        default:
            return state
    }
}

export default userReducer