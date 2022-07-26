import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import s from './login.module.scss'
import { requiredFeild, maxLength, email } from '../../utilites/validators'
import { LoginArea } from "../Common/Textareas/PostTextarea";


const LoginForm = (props) => {

    return <div>
        <form onSubmit={props.handleSubmit}>
            <div className={s.feild_wrapper}>
                <Field placeholder={'e-mail'} name={'email'} component={LoginArea} validate={[requiredFeild, maxLength, email]}/>
            </div>
            <div className={s.feild_wrapper}>
                <Field placeholder={'Password'} type={"password"} name={'password'} component={LoginArea} validate={[requiredFeild, maxLength]}/>
            </div>
            <div className={s.checker}>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'} /> remember me
            </div>
            <div className={s.button_wrapper}>
                <button>Sign in</button>
            </div>
        </form>
        <div className={s.link_to_app}>Попробуйте перейти в <NavLink to='/Applications/krestiki'>приложения</NavLink></div>
     </div>

}


const LoginReduxForm = reduxForm({ form: 'Login' })(LoginForm)

let Login = (props) => {
    if (props.isAuth) {
        return <Navigate to={'/Profile/my'} />
    }

    const onSubmit = (formData) => {
        props.signIn(formData)
    }

    return <div className={s.login_block}>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

export default Login