import { address } from './APIAddress'

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

let defaultToken = 'empty token'

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
    })
    return response.json()
}

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

export default {
    _getList,
    _getOne,
    _post,
    _put,
    _patch,
    _delete,
    defaultToken
}