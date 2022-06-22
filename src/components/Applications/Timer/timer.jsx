import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import s from "./timer.module.css"

let TimerBlock = () => {

    let [timerInitial, setTimerInitial] = useState(15);
    let [timerStarted, setTimerStarted] = useState(false)
    let [timerSelectorCurrent, setTimerSelectorCurrent] = useState(15)
    const timeout = React.useRef(null)


    const timerStarter = () => {
        timeout.current = setTimeout(() => {
            setTimerInitial((prev) => prev - 1);
            timerStarter();
        }, 1000);
    }

    const timesSpawner = () => {
        let arraytimes = [];
        for (let i = 15; i < 151;) {
            let timeFormat
            if (i % 60 < 10) {
                timeFormat = `0${Math.floor(i / 60)}:0${i % 60}`
            } else { timeFormat = `0${Math.floor(i / 60)}:${i % 60}` }
            arraytimes.push({ seconds: i, time: timeFormat })
            i += 15;
        }
        return arraytimes
    }

    const timerSelector = (e) => {
        setTimerStarted(false)
        clearTimeout(timeout.current)
        setTimerSelectorCurrent(e.target.value)
        setTimerInitial(e.target.value)
    }

    const timerSetter = () => {
        if (!timerStarted) {
            setTimerStarted(true)
            timerStarter()
        } else {
            setTimerStarted(false)
            clearTimeout(timeout.current)
        }
    }

    const timerReset = () => {
        setTimerStarted(false)
        clearTimeout(timeout.current)
        setTimerInitial(timerSelectorCurrent)
    }

    useEffect(() => {
        if (timerInitial < 1) {
            setTimerStarted(false)
            clearTimeout(timeout.current)
        }
    }, [timerInitial])

    return <div className={s.timer__wrapper} style={{ '--progress': (timerInitial / timerSelectorCurrent) }}>


        <div className={s.timer__around}>
            <div className={s.dots}></div>
            <svg>
                <circle cx='150' cy='150' r='140'></circle>
                <circle cx='150' cy='150' r='140' ></circle>
            </svg>

            <div className={s.timer__selector__block}>
                <select onChange={timerSelector} className={s.timer__selector}>
                    {timesSpawner().map((el) => (<option value={el.seconds} >{el.time}</option>))}
                </select>
            </div>

            <div className={s.timer__block}>
                <div className={s.timer__value_wrapper}>
                    <div className={s.timer__value}>{`0${Math.floor(timerInitial / 60)}`}</div>
                </div>
                <div className={s.timer__value + ' ' + (timerStarted && s.timer_dots)}>:</div>
                <div className={s.timer__value_wrapper}>
                    <div className={s.timer__value}>{timerInitial % 60 < 10 ? `0${timerInitial % 60}` : timerInitial % 60}</div>
                </div>
            </div>
            <div className={s.button__wrapper}>
                <button onClick={timerSetter} className={s.timer__button} disabled={timerInitial < 1}>{timerStarted ? 'pause' : 'start'}</button>
                <button onClick={timerReset} className={s.timer__button}>reset</button>
            </div>

        </div>
    </div>
}

export default TimerBlock