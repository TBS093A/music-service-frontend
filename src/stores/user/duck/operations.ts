import actions from './actions'
import { useDispatch } from 'react-redux'

import User from './class'
import AppService from '../../AppService'


export default class UserService{

    constructor(
        private service: AppService
    ){}

    private endpoint: string = 'user/'
    private dispatch = useDispatch()
    private response: any

    private serviceUser: User

    // Authorization

    public async postAuth(username: string, password: string) {
        const body = { 
            username: username, 
            password: password
        }
        this.response = await this.service.post(
            this.endpoint + '/auth', 
            body, 
            this.service.defaultToken
        )
        this.serviceUser = {
            id: this.response.payload.user.id,
            username: this.response.payload.user.username,
            email: this.response.payload.user.email,
            ip: this.response.payload.user.ip,
            city: this.response.payload.user.city,
            country: this.response.payload.user.country,
            token: this.response.payload.Authorization
        }
        this.dispatch(actions.login(this.serviceUser))
    }

    public async deleteAuth(token: string) {
        this.response = await this.service.delete(
            this.endpoint + 'auth',
            token
        )
        this.dispatch(actions.logout())
    }

    // User CRUD

    public async registerUser(user: any) {
        this.response = await this.service.post(
            this.endpoint,
            user,
            this.service.defaultToken
        )
    }

    public async updateUser(user: any, id: number, token: string) {
        this.response = await this.service.patch(
            this.endpoint + '/' + id,
            user,
            token
        )
    }

    public async deleteUser(id: number, token: string) {
        this.response = await this.service.delete(
            this.endpoint + '/' + id,
            token
        )
    }
}