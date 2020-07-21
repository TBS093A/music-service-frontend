import { address } from './APIAddress'

export class AbstractService<T> {

    private async responseGD(address: string, method: string) {
        const response = await fetch( address, {
            method: method,
            credentials: 'same-origin',
        })
        return response.json()
    }

    private async responseCRU(address: string, method: string, body: T) {
        const response = await fetch( address, {
            method: method,
            credentials: 'same-origin',
            body: JSON.stringify(body)
        })
        return response.json()
    }

    public async getList(endpoint: string) : Promise<JSON> {
        return await this.responseGD(address + endpoint, 'GET')
    }

    public async getOne(endpoint: string) : Promise<JSON> {
        return await this.responseGD(address + endpoint, 'GET')
    }

    public async post(endpoint: string, body: T) : Promise<JSON> {
        return await this.responseCRU(address + endpoint, 'POST', body)
    }

    public async put(endpoint: string, body: T) : Promise<JSON> {
        return await this.responseCRU(address + endpoint, 'PUT', body)
    }

    public async patch(endpoint: string, body: T) : Promise<JSON> {
        return await this.responseCRU(address + endpoint, 'PATCH', body)
    }

    public async delete(endpoint: string) : Promise<JSON> {
        return await this.responseGD(address + endpoint, 'DELETE')
    }
}