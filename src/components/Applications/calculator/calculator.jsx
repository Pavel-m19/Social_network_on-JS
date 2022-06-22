import React from "react";
import s from './calculator.module.css';
import { Reorder } from "framer-motion";
import { useState } from "react";
import TimerBlock from "../Timer/timer";
import Secondemer from "../secondemer/secondemer";
import Clock from "../clock/Clock";

let Calculator = () => {

    let [array, setArray] = useState([{id:1, card:<Clock/>}, {id:2, card:<TimerBlock/>}, {id:3, card:<Clock/>}])

    return <div className={s.calculators__wrapper}>
        <Reorder.Group as='div' className={s.reorder__wrapper} values={array} onReorder={setArray}>
            {array.map(item => (
                <Reorder.Item as='div' drag={true} key={item.id} className={s.order__item} value={item}>
                   <div><p>{item.card}</p></div>
                </Reorder.Item>))}
        </Reorder.Group>
    </div>

}

export default Calculator