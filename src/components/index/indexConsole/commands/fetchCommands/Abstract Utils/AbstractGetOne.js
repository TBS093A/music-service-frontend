/**
 * Get one row && mapping
 * @param {*} refList 
 * @param {*} consoleHistory 
 * @param {*} setConsoleHistory 
 * @param {*} setMessage 
 * @param {*} getOneAction 
 * @param {*} mapping 
 */
export const AbstractGetOne = async (
    refList,
    consoleHistory, setConsoleHistory, 
    setMessage,
    getOneAction,
    mapping, 
) => {
    let inputValue = refList[0].current.value
    setConsoleHistory( consoleHistory + 'album id: ' + inputValue + '\n')
    if ( inputValue >= 0 ) {
        await getOneAction( inputValue ).then( response => {
            if ( response['info'] !== 'Not found.' ){
                setMessage(
                    mapping(
                        response['response']
                    ) + response['info'] + '\n'
                )
            } else{
                setMessage( 
                    response['info'] + '\n'
                )
            }
        })
    }
}