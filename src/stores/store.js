import { createStore, applyMiddleware } from 'redux'
import { saveState, loadState } from './loadStore'
import rootReducer from './reducers'
import loadash from 'lodash'
import thunk from 'redux-thunk'

const persistedState = loadState()

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))


store.subscribe( () => {
    saveState({
        user: store.getState().user
    })
})

store.subscribe( loadash.throttle( () => {
    saveState({
        user: store.getState().user
    })
}, 1000))

export default preloadedState => {
    return createStore(rootReducer, preloadedState)
}