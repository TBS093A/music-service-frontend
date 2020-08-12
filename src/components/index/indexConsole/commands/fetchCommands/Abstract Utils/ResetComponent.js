import React, { useState, useEffect } from "react"

/**
 * 
 * @param { method } resetState - reset State method
 * @param { [] } refList - reset react refs
 * @param { useState } message - for check message trigger
 * @param { useState } componentVisible - for focus first comp. input
 * @param { string } firstComponentInput - ---""---
 * @param { action } activateConsoleInput - activate general console input
 */
export const ResetComponent = ({
    resetState, refList,
    message, 
    componentVisible, firstComponentInput,
    activateConsoleInput
}) => {

    useEffect( () => {
        if ( componentVisible === true ) {
            document.getElementById( firstComponentInput ).focus()    
            if ( message !== '' ) {
                refList.forEach( resetRefs )
                resetState()
                activateConsoleInput()    
            }
        }
    })

    return (
        <div> </div>
    )
}

/**
 * 
 * @param { method } resetState - reset State method
 * @param { action } fetchAction - start fetch now
 * @param { method } mapObjectToString - map response to string
 * @param { useState } message - for check message trigger
 * @param { useState } setMessage - for set message trigger
 * @param { useState } componentVisible - for focus first comp. input
 * @param { action } activateConsoleInput - activate general console input
 */
export const ResetComponentWithoutInputs = ({
    resetState, 
    fetchAction, mapObjectToString,
    message, setMessage,
    componentVisible,
    activateConsoleInput
}) => {

    const [oneRequest, setOneRequest] = useState(false)
    
    useEffect( () => {
        if (componentVisible && oneRequest === false) {
            fetchAction().then(response => {
                setMessage(
                    mapObjectToString(
                        response['response']
                    ) + response['info'] + '\n'
                )
            })
            setOneRequest( true )
        } else {
            activateConsoleInput()
        }
        if (message !== '') {
            resetState()
            setOneRequest( false )
        }
    })

    return (
        <div> </div>
    )
}

const resetRefs = ( element, array ) => {
    element.current.value = ''
}
