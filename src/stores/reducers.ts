import { combineReducers } from 'redux'

import userReducer from './user/duck'

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer