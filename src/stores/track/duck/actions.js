import types from './types'

const getOne = item => ({
    type: types.GET_ONE, item
})

const update = item => ({
    type: types.UPDATE, item
})

const addRow = item => ({
    type: types.ADD_ROW, item
})

export default ({
    getOne,
    update,
    addRow
})