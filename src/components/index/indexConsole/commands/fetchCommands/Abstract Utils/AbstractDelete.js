/**
 * Delete one row
 * @param {*} refList 
 * @param {*} consoleHistory 
 * @param {*} setConsoleHistory 
 * @param {*} setMessage 
 * @param {*} deleteAction 
 * @param {*} token 
 */
export const AbstractDelete = async (
    refList,
    consoleHistory, setConsoleHistory,
    setMessage,
    deleteAction,
    token
) => {
    let id = refList[0].current.value
    setConsoleHistory( consoleHistory + 'id: ' + id + '\n')
    if ( id >= 0 ) {
        deleteAction( 
            id,
            token
        ).then( response => {
            setMessage( response['info'] + '\n' )
        })
    }
}