import React from "react";
import s from "./applications.module.css"
import Xo from '../XO/xo'
import { NavLink, useParams } from "react-router-dom";
import Clock from "../clock/Clock";

let Applications = () => {

    let appId = useParams().appName    

    return <div className={s.app__page__wrapper}>
        <div className={s.apps__list}>
            <span className={`${s.apps__list_item} + ${(appId === 'krestiki' || !appId) && s.active}`}>
                <NavLink to={'/Applications/krestiki'}>krestiki</NavLink>
                </span>
            <span className={`${s.apps__list_item} +  ${appId === 'clock' && s.active}`}>
                <NavLink to={'/Applications/clock'}>clock</NavLink>
                </span>
            <span className={`${s.apps__list_item} +  ${appId === 'calculator' && s.active}`}>
                <NavLink to={'/Applications/calculator'}>calculator</NavLink>
                </span>
        </div>
        <div className={s.application__wrapper}>
            {((appId === 'krestiki') || !appId) && <Xo />}
            {appId === 'clock' && <Clock />}
            {/* {appId === 'krestiki' && <Xo />} */}
        </div>

    </div>
}

export default Applications