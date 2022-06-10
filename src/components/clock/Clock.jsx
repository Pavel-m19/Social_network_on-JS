import React from "react";
import s from './clock.module.css'



let Clock = () => {

    let arrayBuilder = (count) => {
        let array = []
        for (let i = 1; i <= count; i++) {
            array.push(i)
        }
        return array
    }

    return <div className={s.clock__container}>
        <div className={s.clock}>
            {arrayBuilder(12).map((i) => (<span style={{'--i':i}}><p>{i}</p></span>))}
        </div>
    </div>

}

export default Clock