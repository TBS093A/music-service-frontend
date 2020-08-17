import { address } from './APIAddress'

// User Session Token

let defaultToken = 'empty token'


// CRUD methods

/**
 * get list method
 * @param {string} endpoint - for example `user/`
 */
const _getList = async (endpoint) => {
    return await responseGD(address + endpoint, 'GET', defaultToken)
}

/**
 * get one row / record
 * @param {string} endpoint - for example `user/`
 */
const _getOne = async (endpoint) => {
    return await responseGD(address + endpoint, 'GET', defaultToken)
}

/**
 * universal post method
 * @param {string} endpoint - for example `user/`
 * @param {{}} body - body request
 * @param {string} token - token for verify user in API
 */
const _post = async (endpoint, body, token) => {
    return await responseCRU(address + endpoint, 'POST', body, token)
}

/**
 * universal put method
 * @param {string} endpoint - for example `user/{id}/` where {id} is object id
 * @param {{}} body - body request
 * @param {string} token - token for verify user in API
 */
const _put = async (endpoint, body, token) => {
    return await responseCRU(address + endpoint, 'PUT', body, token)
}

/**
 * universal patch method
 * @param {string} endpoint - for example `user/{id}/` where {id} is object id
 * @param {{}} body - body request
 * @param {string} token - token for verify user in API
 */
const _patch = async (endpoint, body, token) => {
    return await responseCRU(address + endpoint, 'PATCH', body, token)
}

/**
 * universal delete method
 * @param {string} endpoint - for example `user/{id}/` where {id} is object id
 * @param {string} token - token for verify user in API
 */
const _delete = async (endpoint, token) => {
    return await responseGD(address + endpoint, 'DELETE', token)
}


// Utils
// Fetch methods

/**
 * fetch `get` / `delete` type methods
 * @param {string} address - full endpoint address
 * @param {string} method - method like `get` / `delete`
 * @param {string} token - token for verify user in API
 */
const responseGD = async (address, method, token) => {
    try {
        const response = await fetch(address, {
            method: method,
            credentials: 'same-origin',
            headers: {
                "Authorization": token,
                "X-CSRFToken": csrftoken,
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        if ( method === 'GET' )
            return await responseExceptions(
                await response.json(),
                response.status
            )
        else
            return await responseExceptions(
                await response,
                response.status
            )
    } catch (error) {
        return { info: error }
    }
}

/**
 * fetch `post` / `put` / `patch` type methods
 * @param {string} address - full endpoint address
 * @param {string} method - method like `post` / `put` / `patch` 
 * @param {{}} body - body of request
 * @param {string} token - token for verify user session in API
 */
const responseCRU = async (address, method, body, token) => {
    try {
        const response = await fetch(address, {
            method: method,
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                "Authorization": token,
                "X-CSRFToken": csrftoken,
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        return await responseExceptions(
            await response.json(),
            response.status
        )
    } catch (error) {
        return { info: error }
    }
}

/**
 * fetch bonus exceptions ( not blank fields in request / bad requests )
 * @param {Response} response - response from fetch
 * @param {number} status - request status
 */
const responseExceptions = async (response, status) => {
    try {
        //progressStream( response )
        if (status > 300) {
            let info = ''
            Object.keys(response).forEach(element => {
                if (element !== 'detail')
                    info += element + ' - ' + response[element][0]
                else
                    info += response[element]
            })
            return {
                response: response,
                info: info
            }
        }
        else
            return {
                response: response,
                info: 'operation success'
            }
    } catch (error) {
        return {
            response: response,
            info: error
        }
    }
}

// Get CSRF Token

/**
 * get cookie method for CSRF verification
 * @param {string} name - name of handled cookie
 */
const getCookie = (name) => {
    if (!document.cookie) {
        return null;
    }
    const token = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

    if (token.length === 0) {
        return null;
    }
    return decodeURIComponent(token[0].split('=')[1]);
}

const csrftoken = getCookie('csrftoken')

// Get progress stream

/**
*   Fetch streaming (use in `then` statement) usefull for get request progress info
*   @param response - is a response from fetch
*/
export const progressStream = (response) => {
    const contentLength = response.headers.get('content-length')
    if (!contentLength)
        throw Error('Content-Length response header unavailable')
    const total = parseInt(contentLength, 10)
    let loaded = 0
    return new Response(
        new ReadableStream({
            start(controller) {
                const reader = response.body.getReader()
                read()
                function read() {
                    reader.read()
                        .then(({ done, value }) => {
                            if (done) {
                                controller.close()
                                return
                            }
                            loaded += value.byteLength
                            console.log(loaded / total * 100)
                            controller.enqueue(value)
                            read()
                        })
                        .catch(error => {
                            console.error(error)
                            controller.error(error)
                        })
                }
            }
        })
    )
}

export default {
    _getList,
    _getOne,
    _post,
    _put,
    _patch,
    _delete,
    defaultToken,
    progressStream
}