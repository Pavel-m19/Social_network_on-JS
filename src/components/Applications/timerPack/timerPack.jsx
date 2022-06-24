import React from "react";
import { useState } from "react";
import Clock from "../clock/Clock";
import TimerBlock from "../Timer/timer";
import s from "../applications.module.css"
import Secondemer from "../secondemer/secondemer";
import { Reorder } from "framer-motion";
import Calendar from "../calendar/calendar";

let TimerPack = () => {

    let [cardArray, SetCardArray] = useState([{ id: 1, card: <Clock /> },
    { id: 4, card: <Calendar />},
    { id: 2, card: <TimerBlock /> },
    { id: 3, card: <Secondemer /> }    
    ])

    return <Reorder.Group
        as='div'
        className={s.dnd__wrapper}
        onReorder={SetCardArray}
        values={cardArray}
    >
        {cardArray.map(item => (
            <Reorder.Item as='div'
                drag={true}
                key={item.id}
                className={s.order__item}
                value={item}
                whileDrag={{
                    "z-index": '1000',
                    scale: 1.1,
                    boxShadow: '0 0 20px'
                }}>
                {item.card}
            </Reorder.Item>))}
    </Reorder.Group>
}

export default TimerPack