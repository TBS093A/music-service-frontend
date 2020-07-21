import { address } from './APIAddress'

export default class AbstractService {

    public defaultToken: string = 'empty'

    private async responseGD(address: string, method: string) {
        const response = await fetch( address, {
            method: method,
            credentials: 'same-origin',
        })
        return response.json()
    }

    private async responseCRU(address: string, method: string, body: any, token: string) {
        const response = await fetch( address, {
            method: method,
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                "Authorization": token
            }
        })
        return response.json()
    }

    public async getList(endpoint: string) : Promise<any> {
        return await this.responseGD(address + endpoint, 'GET')
    }

    public async getOne(endpoint: string) : Promise<any> {
        return await this.responseGD(address + endpoint, 'GET')
    }

    public async post(endpoint: string, body: any, token: string) : Promise<any> {
        return await this.responseCRU(address + endpoint, 'POST', body, token)
    }

    public async put(endpoint: string, body: any, token: string) : Promise<any> {
        return await this.responseCRU(address + endpoint, 'PUT', body, token)
    }

    public async patch(endpoint: string, body: any, token: string) : Promise<any> {
        return await this.responseCRU(address + endpoint, 'PATCH', body, token)
    }

    public async delete(endpoint: string, token: string) : Promise<any> {
        return await this.responseGD(address + endpoint, 'DELETE')
    }
}