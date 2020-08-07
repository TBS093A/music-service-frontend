import AppService from '../../AppService'

import actions from './actions'

const trackEndpoint = 'track/'
const trackRowEndpoint = 'track-row/'

// Track CRUD

export const getOneTrack = ( id ) => async (dispatch) => {
    return await AppService._getOne(
        trackEndpoint + id + '/'
    ).then( response => {
        dispatch( actions.getOne( response ) )
        return response
    })
}

export const createTrack = async ( track, token ) => {
    return await AppService._post(
        trackEndpoint,
        track,
        token
    )
}

export const updateTrack = async ( id, track, token ) => {
    return await AppService._patch(
        trackEndpoint + id + '/',
        track,
        token
    )
}

export const deleteTrack = async ( id ) => {
    return await AppService._delete(
        trackEndpoint + id + '/',
        token
    )
}

// Track Row CRUD

export const getOneTrackRow = ( id ) => async (dispatch) => {
    return await AppService._getOne(
        trackRowEndpoint + id + '/'
    ).then( response => {
        dispatch( actions.getOne( response ) )
        return response
    })
}

export const createTrackRow = async ( track, token ) => {
    return await AppService._post(
        trackRowEndpoint,
        track,
        token
    ).then( response => {
        dispatch( actions.addRow( response ) )
        return response
    })
}

export const updateTrackRow = async ( id, track, token ) => {
    return await AppService._patch(
        trackRowEndpoint + id + '/',
        track,
        token
    )
}

export const deleteTrackRow = async ( id ) => {
    return await AppService._delete(
        trackRowEndpoint + id + '/',
        token
    )
}

// Track Ratings CRUD

export const getAllTrackRating = (id) => async ( dispatch ) => {
    return await AppService._getList(
        trackEndpoint + id + '/ratings/'
    ).then( response => {
        dispatch( actions.getRatings( response ) )
    })
}

export const createTrackRating = (track_id, rating, token) => {
    return await AppService._post(
        trackEndpoint + track_id + '/rating/',
        rating,
        token
    )
}

export const deleteTrackRating = (track_id, rating_id, token) => {
    return await AppService._delete(
        trackEndpoint + track_id + '/rating/' + rating_id,
        token
    )
}