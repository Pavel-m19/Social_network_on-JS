import React, { useState } from "react";
import s from './weather.module.css'
import { useEffect } from "react";
import { weatherAPI } from "../../../../API/api";
import { weatherLogoChoiser } from "./weather_pics";


let Weather = () => {

    let now = new Date();
    let [weatherNow, setWeatherNow] = useState(null)    

    useEffect(() => {
        if (!weatherNow) {
            weatherAPI().then(resp => setWeatherNow(resp.data))
        }
    })

    return <div className={s.weather__wrapper}>
        {weatherNow ?
            <div className={s.weather__temp}>{Math.round(weatherNow.main.temp - 273) + "\u00b0C"}</div>
            : ''}
        {weatherNow ?
            <img src={weatherLogoChoiser(weatherNow.weather[0].id, now.getHours())} alt='sun' className={s.weather_pic} /> :
            ''}
    </div>
}

export default Weather