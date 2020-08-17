export const validate = ( inputs ) => {
    let object = {}
    for (let i = 0; i < inputs.length; i++) {
        if ( 
            inputs[i]['type'] === 'text' 
            && inputs[i]['ref'] !== undefined 
            && inputs[i]['ref'].current.value !== '' 
        )
            object[ inputs[i]['name'] ] = inputs[i]['ref'].current.value
    }
    return object
}