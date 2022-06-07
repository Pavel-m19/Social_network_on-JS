import React from "react";
import s from './Header.module.css'
import { NavLink } from "react-router-dom";
import '../../assets/main-style.css';
import moon from '../../assets/moon logo.png';
import sun from '../../assets/sun logo.png';
import logout from '../../assets/logout.png';

const Header = (props) => {

    let switcher_logo;

    if (props.auth.darkTheme) {
        document.body.classList.add('night');
        switcher_logo = sun;
    }
    else {
        switcher_logo = moon;
        document.body.classList = '';
    }

    return <header className={s.header}>

        <div className={s.switcher} onClick={props.themeSwitcher}>
            <img src={switcher_logo} className={s.slider} alt='swth' />
        </div>

        <div className={s.loginBlock}>
            {props.auth.isAuth &&
                <div className={s.login_Name}>
                    <div>{props.auth.login}</div>
                    <img onClick={() => {props.signOut()}} className={s.logout} src={logout} alt='logout'/>
                </div>}
                
            {!props.auth.isAuth &&
                <NavLink to={`/Login`}>Login</NavLink>}
        </div>
    </header>
}

export default Header