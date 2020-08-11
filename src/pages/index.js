import React from 'react'
import IndexConsole from '../components/index/indexConsole/indexConsole'
import { store } from '../stores/store'
import { Provider } from 'react-redux'

// import LogRocket from 'logrocket';
// LogRocket.init('ugbdf9/music-service');

const IndexPage = () => (
    <Provider store={ store }>
        <IndexConsole />
    </Provider>
)

export default IndexPage
