import React from "react";
import { useState } from "react";
import s from './calendar.module.css'
import calendar_arrow from '../../../assets/calendar_arrow.png'
import { motion, AnimatePresence } from "framer-motion"
import { weatherAPI } from "../../../API/api";

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 100 : -100,
            opacity: 0
        };
    },
    center: {        
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0
        };
    }
};


let Calendar = () => {

    let now = new Date();
    let [tableMonth, setTableMonth] = useState(now.getMonth())
    let [tableYear, setTableYear] = useState(now.getFullYear())
    let [[direction, key], setSlideDirection] = useState([1, now.getMonth()])

    const monthes = [
        { name: 'January', code: 1, days: 31 },
        { name: 'February', code: 4, days: 28 },
        { name: 'March', code: 4, days: 31 },
        { name: 'April', code: 0, days: 30 },
        { name: 'May', code: 2, days: 31 },
        { name: 'June', code: 5, days: 30 },
        { name: 'July', code: 0, days: 31 },
        { name: 'August', code: 3, days: 31 },
        { name: 'September', code: 6, days: 30 },
        { name: 'October', code: 1, days: 31 },
        { name: 'November', code: 4, days: 30 },
        { name: 'December', code: 6, days: 31 }
    ]
    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

    const WeekdayItem = ({ day, tooday, currentMonth, weekend }) => {

        let weekendCheck = ((day === 'SAT') || (day === 'SUN') || weekend);
        let toodayCheck = (tooday === day && tableMonth === now.getMonth() && tableYear === now.getFullYear())

        return <div className={
            s.calendar_table_weekday_item + ' ' +
            (weekendCheck && s.calendar_weekend_item) + ' ' +
            (toodayCheck && s.calendar_table_tooday) + ' ' +
            (!currentMonth && s.calendar_table_not_current_month)
        }>
            {day}
        </div>
    }

    const WeekItem = (props) => {
        return <div className={s.calendar_table_week}>
            {props.week.map(e => <WeekdayItem day={e.day} tooday={props.tooday} currentMonth={e.currentMonth} weekend={e.weekend} />)}
        </div>
    }

    const firstDayOfMonth = (month, year) => {
        let dayOfWeek = new Date(year, month, 1).getDay();
        if (dayOfWeek === 0) { dayOfWeek = 7 }
        return dayOfWeek
    }

    const MonthGenerator = (month, year) => {        

        let compMonth = month - 1

        if (month === 0) { compMonth = 11 } else if (month === 11) { compMonth = 0 }

        const newMonth = [];
        let day = monthes[compMonth].days - firstDayOfMonth(month, year) + 2;
        let lastDay = monthes[compMonth].days
        let currentMonth = false

        if (firstDayOfMonth(month, year) === 1) {
            day = 1
            lastDay = monthes[month].days
            currentMonth = !currentMonth
        }

        for (let i = 0; i < 5; i++) {
            let week = [];
            for (let j = 0; j < 7; j++) {
                week.push({
                    day: day,
                    currentMonth: currentMonth,
                    weekend: (j > 4)
                })
                if (day !== lastDay) { day += 1 } else {
                    day = 1
                    lastDay = monthes[month].days
                    currentMonth = !currentMonth
                }
            }
            newMonth.push(week)
        }
        return newMonth
    }

    const monthChanger = (direction) => {
        if (tableMonth + direction === 12) {
            setTableYear(prev => prev + direction)
            setTableMonth(0)
            setSlideDirection([direction, 0])
        } else if (tableMonth + direction === -1) {
            setTableYear(prev => prev + direction)
            setTableMonth(11)
            setSlideDirection([direction, 11])
        } else {
            setTableMonth(prev => prev + direction)
            setSlideDirection([direction, tableMonth + direction])
        }

    }
    console.log(weatherAPI())

    return <div className={s.calendar_wrapper}>
        <div className={s.calendar_left_arrow} onClick={() => monthChanger(-1)}>
            <img src={calendar_arrow} alt="<>" />
        </div>
        <div className={s.calendar_right_arrow} onClick={() => monthChanger(1)}>
            <img src={calendar_arrow} alt="<>" />
        </div>
        <div className={s.calendar_current_date}>
            <div className={s.calendar_current_day}>{now.getDate()}</div>
            <div className={s.calendar_current_month_n_week}>
                <div className={s.calendar_current_month}>{monthes[now.getMonth()].name}</div>
                <div className={s.calendar_current_week_day}>{weekdays[now.getDay() - 1]}</div>
            </div>
        </div>
        <div className={s.calendar_table}>
            <div className={s.calendar_table_month_year}>{`${tableYear} ${monthes[tableMonth].name}`}</div>
            <div className={s.calendar_table_weekdays_wrapper}>
                {weekdays.map(e => <WeekdayItem day={e} tooday={0} currentMonth={1} weekend={0} />)}
            </div>
            <div className={s.animation_wrapper}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        className={s.animation_element}
                        key={key}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 140, damping: 13.5 },
                            duration: 0.3,
                        }}
                    > <div>{MonthGenerator(tableMonth, tableYear).map(week => <WeekItem week={week} tooday={now.getDate()} />)}</div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>



    </div>
}

export default Calendar