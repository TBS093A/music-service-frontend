import React from 'react'
import { connect } from 'react-redux'
import { UserService } from '../../../../../stores/user/duck/operations'

const Logout = () => {
    return (
        <div>
        
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    UserService: user => dispatch( UserService(user) )
})

export default connect(mapStateToProps, mapDispatchToProps) (Logout)