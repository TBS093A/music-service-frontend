import types from './types'

const INITIAL_STATE = {
    actualAlbum: {
        id: -1,
        user_id: -1,
        title: '',
        description: '',
        image: '',
        url_code: '',
        tracks: [],
        ratings: []
    },
    albums: []
}

const albumReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case types.GET_ALL:
            return {
                ...state,
                albums: action.item
            }
        case types.GET_ONE:
            return {
                ...state,
                actualAlbum: {
                    ...state.actualAlbum,
                    id: action.item.id,
                    user_id: action.item.user_id,
                    title: action.item.title,
                    description: action.item.description,
                    image: action.item.image,
                    url_code: action.item.url_code,
                    tracks: action.item.tracks,
                }
            }
        case types.GET_RATINGS:
            return {
                ...state,
                actualAlbum: {
                    ...state.actualAlbum,
                    ratings: action.item
                }
            }
        default:
            return state
    }
}

export default albumReducer