import React from "react";
import s from './parallax.module.scss';
import forest from '../../../assets/parallax/forest.png';
import rock from '../../../assets/parallax/rock.png';
import cloud1 from '../../../assets/parallax/cloud1.png';
import cloud2 from '../../../assets/parallax/cloud2.png';
import { useEffect } from "react";
import { useState } from "react";

const Parallax = () => {
    const [rockPos, setRocksPos] = useState([0, 0])
    const [cloudPos, setCloudPos] = useState(0)
    const [cloud1Pos, setCloud1Pos] = useState(0)
    const [timerStarted, setTimerStarted] = useState(false)
    const timeout = React.useRef(null)
    let counter = [0, 0]

    const timerStarter = () => {
        timeout.current = setTimeout(() => {
            circuler(counter, setCloudPos, 1, 0)
            circuler(counter, setCloud1Pos, 0.5, 1)
            timerStarter();
        }, 25);
    }

    const circuler = (pos, cloud, speed, n) => {
        counter[n] += speed
        if (counter[n] > 800) {
            cloud(0)
            counter[n] = 1
        } else {
            cloud((prev) => prev + speed)
        }
    }

    let rockSetter = (e) => {
        let rockX = -e.clientX * 0.02
        let rockY = -e.clientY * 0.03
        setRocksPos([rockX, rockY])
    }


    useEffect(() => {
        document.body.addEventListener('mousemove', rockSetter)
        return () => {document.body.removeEventListener('mousemove', rockSetter)}

    })

    useEffect(() => {
        if (!timerStarted) {
            setTimerStarted(false)
            timerStarter()
        }
        return clearTimeout()
    }, [timerStarted])

    return <div className={s.parallax_wrapper}>
        <img src={forest} alt="f" className={s.pic + ' ' + s.forest}
            style={{
                "--r": `${rockPos[0] * 0.3}px`,
                "--t": `${rockPos[1] * 0.3}px`
            }} />
        <img src={rock} alt="r" className={s.rock}
            style={{
                "--r": `${rockPos[0]}px`,
                "--t": `${rockPos[1]}px`
            }} />
        <img src={rock} alt="r" className={s.rock + ' ' + s.rock_2}
            style={{
                "--r": `${rockPos[0] * 1.5}px`,
                "--t": `${rockPos[1] * 1.5}px`
            }} />
        <img src={cloud1} alt="r" className={s.cloud1}
            style={{
                "--c": `${cloudPos}px`
            }} />
        <img src={cloud2} alt="r" className={s.cloud2}
            style={{
                "--c": `${cloud1Pos}px`
            }} />

    </div>
}

export default Parallax