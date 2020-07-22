import React from 'react'
import IndexConsole from '../components/index/indexConsole/indexConsole'
import { store } from '../stores/store.ts'
import { Provider } from 'react-redux'

const IndexPage = () => (
    <Provider store={ store }>
        <IndexConsole />
    </Provider>
)

export default IndexPage
