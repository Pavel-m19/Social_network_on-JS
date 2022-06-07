import React from "react";
import Login from "./login";
import {} from '../../redux/auth-reducer'
import { connect } from "react-redux";
import { signIn } from '../../redux/auth-reducer'


class LoginClass extends React.Component {
    render() {
        return <Login {...this.props}/>
    }
}

let stateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const LoginContainer = connect(stateToProps , {signIn})(LoginClass)

export default LoginContainer