import React from "react";
import { NavLink } from "react-router-dom";
import s from "./footer.module.css"

let Footer = (props) => {
    
    
    return <div  className={s.footer__wrapper}>
        <div className={s.my__page__link}> <NavLink to={`/Profile/my`} >На страницу создателя</NavLink></div>
        <div className={s.copyright}>Павел Михайлов (с)</div>
    </div>
}

export default Footer