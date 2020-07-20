import { observable, computed } from 'mobx'

class Guest {
    @observable id = ''
    @observable ip = ''
    @observable city  = ''
    @observable country = ''
}

class User {
    @observable id = -1
    @observable username = ''
    @observable email = ''
    @observable ip = ''
    @observable city = ''
    @observable country = ''

    @observable token = ''
}