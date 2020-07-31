import { combineReducers } from 'redux'

import userReducer from './user/duck'
import albumReducer from './album/duck'

const rootReducer = combineReducers({
    user: userReducer,
    album: albumReducer
})

export default rootReducer