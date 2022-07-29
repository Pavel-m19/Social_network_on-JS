import React from "react";
import s from "./applications.module.css"
import Xo from './XO/xo'
import { NavLink, useParams } from "react-router-dom";
import TimerPack from "./timerPack/timerPack";
import Calculator from "./calculator/calculator";
import { motion, AnimatePresence } from "framer-motion";
import Parallax from "./parallax/parallax";
import Game from "./game/game";

let Applications = () => {

    let appId = useParams().appName

    return <div className={s.app__page__wrapper}>
        <div className={s.apps__list}>
            <div className={`${s.apps__list_item} + ${(appId === 'krestiki' || !appId) && s.active}`}>
                <NavLink to={'/Applications/krestiki'} className={navData => navData.isActive ? s.activeLink : s.item}>Krestiki</NavLink>
            </div>
            <div className={`${s.apps__list_item} +  ${appId === 'clock' && s.active}`}>
                <NavLink to={'/Applications/clock'} className={navData => navData.isActive ? s.activeLink : s.item}>Clock</NavLink>
            </div>
            <div className={`${s.apps__list_item} +  ${appId === 'calculator' && s.active}`}>
                <NavLink to={'/Applications/calculator'} className={navData => navData.isActive ? s.activeLink : s.item}>Calculator</NavLink>
            </div>
            <div className={`${s.apps__list_item} +  ${appId === 'parallax' && s.active}`}>
                <NavLink to={'/Applications/parallax'} className={navData => navData.isActive ? s.activeLink : s.item}>Parallax</NavLink>
            </div>
            <div className={`${s.apps__list_item} +  ${appId === 'game' && s.active}`}>
                <NavLink to={'/Applications/game'} className={navData => navData.isActive ? s.activeLink : s.item}>2048</NavLink>
            </div>
        </div>
        <div className={s.application__wrapper}>

            <AnimatePresence exitBeforeEnter>
                <motion.div
                
                    key={appId}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }} div
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4 }}
                >
                    {((appId === 'krestiki') || !appId) && <Xo />}
                    {appId === 'clock' && <TimerPack />}
                    {appId === 'calculator' && <Calculator />}
                    {appId === 'parallax' && <Parallax />}
                    {appId === 'game' && <Game />}
                </motion.div>
            </AnimatePresence>

        </div>

    </div>
}

export default Applications