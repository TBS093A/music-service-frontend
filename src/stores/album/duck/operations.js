import AppService from '../../AppService'

import actions from './actions'

const endpoint = 'album/'

// Album CRUD

export const getAllAlbum = () => async (dispatch) => {
    return await AppService._getList(
        endpoint
    ).then( response => {
        dispatch( actions.getAll( response ) )
        return response
    })
} 

export const getOneAlbum = (id) => async( dispatch ) => {
    return await AppService._getOne(
        endpoint + id + '/'
    ).then( response => {
        dispatch( actions.getOne( response ) )
        return response
    })
}

export const createAlbum = async (album, token) => {
    return await AppService._post(
        endpoint,
        album,
        token
    )
}

export const updateAlbum = async (album, token) => {
    return await AppService._patch(
        endpoint,
        album,
        token
    )
}

export const deleteAlbum = async (id, token) => {
    return await AppService._delete(
        endpoint + id,
        token
    )
}

// Album Ratings CRUD

export const getAllAlbumRating = (id) => async ( dispatch ) => {
    return await AppService._getList(
        endpoint + id + '/ratings/'
    ).then( response => {
        dispatch( actions.getRatings( response ) )
    })
}

export const createAlbumRating = (album_id, rating, token) => async ( dispatch ) => {
    return await AppService._post(
        endpoint + album_id + '/rating/',
        rating,
        token
    )
}

export const deleteAlbumRating = (album_id, rating_id, token) => async ( dispatch ) => {
    return await AppService._delete(
        endpoint + album_id + '/rating/' + rating_id,
        token
    )
}