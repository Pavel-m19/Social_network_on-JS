import React, { useEffect, useState } from "react";
import s from './clock.module.css'



let Clock = () => {
    let now = new Date();

    let [seconds, setSeconds] = useState(now.getSeconds() - 1)
    let [minuts, setMinuts] = useState(now.getMinutes())
    let [hours, setHours] = useState(now.getHours() + (now.getMinutes() / 60))

    let arrayBuilder = (count) => {
        let array = []
        for (let i = 1; i <= count; i++) {
            array.push(i)
        }
        return array
    }

    let timeSetter = () => {
        setTimeout(() => {
            setSeconds(now.getSeconds());
            setMinuts(now.getMinutes());
            setHours(now.getHours() + (now.getMinutes() / 60))
        }, 1000)
    }

    useEffect(() => {
        timeSetter()
        return clearTimeout()
    })

    return <div className={s.clock__container}>
        <div className={s.clock}>
            <div className={s.seconds_center}></div>

            <div className={s.circle} style={{ '--sec': seconds }}><i></i></div>
            <div className={s.circle1} style={{ '--min': minuts }}><i></i></div>
            <div className={s.circle2} style={{ '--hour': hours }}><i></i></div>

            {arrayBuilder(12).map((i) => (<span style={{ '--i': i }}><p>{i}</p></span>))}
        </div>
    </div>

}

export default Clock