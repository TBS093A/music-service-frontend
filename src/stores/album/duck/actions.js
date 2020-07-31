import types from './types'

const getAll = item => ({
    type: types.GET_ALL, item
})

const getOne = item => ({
    type: types.GET_ONE, item
})

const getRatings = item => ({
    rype: types.GET_RATINGS, item
})

export default {
    getAll,
    getOne,
    getRatings
}