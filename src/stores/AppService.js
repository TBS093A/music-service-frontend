import { address } from './APIAddress'

// session Token

let defaultToken = 'empty token'

// CRUD methods

const _getList = async (endpoint) => {
    return await responseGD(address + endpoint, 'GET', defaultToken)
}

const _getOne = async (endpoint) => {
    return await responseGD(address + endpoint, 'GET', defaultToken)
}

const _post = async (endpoint, body, token) => {
    return await responseCRU(address + endpoint, 'POST', body, token)
}

const _put = async (endpoint, body, token) => {
    return await responseCRU(address + endpoint, 'PUT', body, token)
}

const _patch = async (endpoint, body, token) => {
    return await responseCRU(address + endpoint, 'PATCH', body, token)
}

const _delete = async (endpoint, token) => {
    return await responseGD(address + endpoint, 'DELETE', token)
}

// Utils
// Fetch methods

const responseGD = async (address, method, token) => {
    const response = await fetch(address, {
        method: method,
        credentials: 'same-origin',
        headers: {
            "Authorization": token,
            "X-CSRFToken": csrftoken,
            "accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then( response => {
        return progressStream( response )
    })
    return response.json()
}

const responseCRU = async (address, method, body, token) => {
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
    }).then( response => {
        return progressStream( response )
    })
    return response.json()
}

// Get CSRF Token

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
*   only use with fetch API in `then` statement
*   @param response - is a response from fetch
*/
const progressStream = (response) => {
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
                                controller.close();
                                return;
                            }
                            loaded += value.byteLength;
                            console.log({ loaded, total })
                            controller.enqueue(value);
                            read();
                        }).catch(error => {
                            console.error(error);
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