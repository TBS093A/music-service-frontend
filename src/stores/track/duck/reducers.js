import types from './types'

const INITIAL_STATE = {
    id: -1,
    album_id: -1,
    user_id: -1,
    title: '',
    description: '',
    text: '',
    image: '',
    audio: '',
    url_code: '',
    track_rows: []
}

const trackReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case types.GET_ONE:
            return {
                id: action.item.id,
                album_id: action.item.album_id,
                user_id: action.item.user_id,
                title: action.item.title,
                description: action.item.description,
                text: action.item.text,
                image: action.item.image,
                audio: action.item.audio,
                url_code: action.item.url_code,
                track_rows: action.item.track_rows
            }
        case types.UPDATE:
            return {
                ...state,
                id: action.item.id,
                album_id: action.item.album_id,
                user_id: action.item.user_id,
                title: action.item.title,
                description: action.item.description,
                text: action.item.text,
                image: action.item.image,
                audio: action.item.audio,
                url_code: action.item.url_code, 
            }
        case types.ADD_ROW:
            return {
                ...state,
                track_rows: [ ...state.track_rows, action.item ]
            }
        default:
            return state
    }
}

export default trackReducer