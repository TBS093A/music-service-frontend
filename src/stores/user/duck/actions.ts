import types from './types'

const login = item => ({
    type: types.LOGOUT_USER, item
})

const logout = () => ({
    type: types.LOGOUT_USER
})

export default {
    login,
    logout
}