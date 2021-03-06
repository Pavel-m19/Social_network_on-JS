import React from "react";
import s from "./applications.module.css"
import Xo from './XO/xo'
import { NavLink, useParams } from "react-router-dom";
import TimerPack from "./timerPack/timerPack";
import Calculator from "./calculator/calculator";
import { motion, AnimatePresence } from "framer-motion";

let Applications = () => {

    let appId = useParams().appName

    return <div className={s.app__page__wrapper}>
        <div className={s.apps__list}>
            <div className={`${s.apps__list_item} + ${(appId === 'krestiki' || !appId) && s.active}`}>
                <NavLink to={'/Applications/krestiki'} className={navData => navData.isActive ? s.activeLink : s.item}>krestiki</NavLink>
            </div>
            <div className={`${s.apps__list_item} +  ${appId === 'clock' && s.active}`}>
                <NavLink to={'/Applications/clock'} className={navData => navData.isActive ? s.activeLink : s.item}>clock</NavLink>
            </div>
            <div className={`${s.apps__list_item} +  ${appId === 'calculator' && s.active}`}>
                <NavLink to={'/Applications/calculator'} className={navData => navData.isActive ? s.activeLink : s.item}>calculator</NavLink>
            </div>
        </div>
        <div className={s.application__wrapper}>

            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={appId}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}div
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4 }}
                >
                    {((appId === 'krestiki') || !appId) && <Xo />}
                    {appId === 'clock' && <TimerPack />}
                    {appId === 'calculator' && <Calculator />}
                </motion.div>
            </AnimatePresence>

        </div>

    </div>
}

export default Applications