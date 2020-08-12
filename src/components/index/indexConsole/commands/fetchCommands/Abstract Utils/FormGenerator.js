import React from 'react'

/**
 * 
 * @param { [ {}, {}, ...{} ] } inputList - list of dicts with info about input
 * @param { } action - fetch method
 */
const FormGenerator = ({
    inputList, action
}) => {

    return (
        <form onSubmit={ event => action( event ) }>
            {   
                inputList.map( input => {

                    if ( input.type === 'text' ) {
                        return ( 
                            <TextInputGenerator 
                                input={ input } 
                            /> 
                        )
                    } else if ( input.type === 'file' ) {
                        return (
                            <UploadInputGenerator 
                                input={ input }
                            />
                        )
                    }
                })  
            }
            <button type='submit' />
        </form>
    )
}

/**
 * Text input generator, example:
 * @param {
 * {    
 *  type: 'text',   
 *  name: 'name',   
 *  ref: React.createRef()  
 * }    } input - basic text input 
 */
const TextInputGenerator = ({ 
    input
}) => {
    return (
        <div>
            { input.name + ':' }
            <input 
                id={ input.name + 'Input' }
                autoComplete='off'
                ref={ input.ref }
            />
        </div>
    )
}

/**
 * Upload file input generator, example:
 * @param {
 * {    
 *  type: 'file',   
 *  name: 'name',   
 *  fileType: 'image',       
 *  dropInfo: dropInfo, setDropInfo: setDropInfo(), #useState  
 *  file: file, setFile: setFile()  #useState
 * }    } input -  
 */
const UploadInputGenerator = ({ 
    input 
}) => {
    
    const onLoadFile = async ( event ) => {
        event.preventDefault()
        let data = event.target.files[0]
        input.setFile( await toBase64( data ) )
        setDropInfos(data.name, data.size)
    }

    const onLoadFileDrop = async ( event ) => {
        event.preventDefault()
        event.persist()
        let data = event.dataTransfer.files[0]
        input.setFile( await toBase64( data ) )
        setDropInfos(data.name, data.size)
    }

    const toBase64 = ( file ) => new Promise( (resolve, reject) => {
        let fileReader = new FileReader()
        fileReader.readAsDataURL( file )
        fileReader.onload = () => resolve( fileReader.result )
        fileReader.onerror = error => reject( error )
    })

    const setDropInfos = (name, size) => {
        input.setDropInfo( 
            'name: "' 
            + name 
            + '"\nsize: ' 
            + (Math.round(size / 100 + 'e-2') / 100 ) 
            + ' MB' 
        )
    }

    return (
        <div onDrop={ event => onLoadFileDrop( event ) } >
            <pre style={ {marginTop: '25px', marginLeft: '40px'} }>
                { input.dropInfo }
            </pre>
            <input 
                style={ { marginTop: '-55px' } }
                id={ input.name + 'Input' }
                className='uploadInput'
                type='file'
                autoComplete='off'
                onChange={ event => onLoadFile( event ) }
            />
        </div>
    )
}

export default FormGenerator