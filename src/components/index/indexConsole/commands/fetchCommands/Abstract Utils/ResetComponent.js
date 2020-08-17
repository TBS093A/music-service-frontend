import React, { useState, useEffect } from "react"

/**
 * 
 * @param { method } resetState - reset State method
 * @param { [] } refList - reset react refs
 * @param { useState } message - for check message trigger
 * @param { useState } componentVisible - for focus first comp. input
 * @param { action } activateConsoleInput - activate general console input
 */
export const ResetComponent = ({
    resetState, refList,
    message, 
    componentVisible,
    activateConsoleInput
}) => {

    useEffect( () => {
        if ( componentVisible === true ) {
            refList[0].current.focus()    
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

    useEffect( () => {
        if (componentVisible) {
            fetchAction().then(response => {
                setMessage(
                    mapObjectToString(
                        response['response']
                    ) + response['info'] + '\n'
                )
            })
            if (message !== '') {
                resetState()
                activateConsoleInput()
            }
        }
    })

    return (
        <div> </div>
    )
}

const resetRefs = ( element, array ) => {
    element.current.value = ''
}