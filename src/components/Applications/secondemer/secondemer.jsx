import React, { useState } from "react";
import s from './secondomer.module.css'

let Secondemer = () => {

    let [seconds, setSeconds] = useState(0)
    let [timerStarted, setTimerStarted] = useState(false)
    const timeout = React.useRef(null)

    const secondomerStarter = () => {
        timeout.current = setTimeout(() => {
            setSeconds((prev) => prev + 0.1);
            secondomerStarter();
        }, 100);
    }

    const secondomerSetter = () => {
        if (!timerStarted) {
            setTimerStarted(true)
            secondomerStarter()
        } else {
            setTimerStarted(false)
            clearTimeout(timeout.current)
        }
    }

    const secondomerReset = () => {
        setTimerStarted(false)
        clearTimeout(timeout.current)
        setSeconds(0)
    }

    let arrayBuilder = (count) => {
        let array = []
        for (let i = 1; i <= count; i++) {
            array.push(i)
        }
        return array
    }


    return <div className={s.secondemer__wrapper}>
        <div className={s.secondemer}>
            <div className={s.seconds_center}></div>
            <div className={s.circle} style={{ '--sec': seconds }}><i></i></div>
            {arrayBuilder(12).map((i) => (<span className={s.big_mark} style={{ '--i': i }}><p></p></span>))}
            {arrayBuilder(60).map((i) => (<span className={s.small_mark} style={{ '--i': i }}><p>|</p></span>))}
            {arrayBuilder(300).map((i) => (<span className={s.super_small_mark} style={{ '--i': i }}><p>|</p></span>))}
            <div className={s.minutes_wrapper}> 
                <div className={s.minutes}>{Math.floor(seconds/60)}</div>
                <div className={s.minutes_marker}>minutes</div>
            </div>

        </div>
        
            <div className={s.buttons__wrapper}>
                <button style={{ zIndex: 20 }} onClick={secondomerSetter}>{!timerStarted ? 'start' : 'pause'}</button>
                <button style={{ zIndex: 20 }} disabled={!(seconds > 0)} onClick={secondomerReset}>reset</button>
            </div>
        
    </div>
}

export default Secondemer