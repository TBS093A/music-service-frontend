import { createStore } from 'redux'
import { saveState, loadState } from './loadStore'
import rootReducer from './reducers'
import loadash from 'lodash'

const persistedState = loadState()

export const store = createStore(rootReducer, persistedState)

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