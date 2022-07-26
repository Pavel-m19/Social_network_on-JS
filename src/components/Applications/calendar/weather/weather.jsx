import React, { useState } from "react";
import s from './weather.module.css'
import { useEffect } from "react";
import { weatherAPI } from "../../../../API/api";
import { weatherLogoChoiser } from "./weather_pics";


let Weather = () => {
    let now = new Date();
    let [weatherNow, setWeatherNow] = useState(null)
    let [coords, setCoords] = useState({ lat: '', lon: '' })

    let pos = (position) => {
        if (!coords.lat) { setCoords({ lat: position.coords.latitude, lon: position.coords.longitude }) }
    }

    navigator.geolocation.getCurrentPosition(pos);



    useEffect(() => {
        if (!weatherNow) {
            weatherAPI(coords.lat, coords.lon).then(resp => setWeatherNow(resp.data))
            console.log("render")
        }
    })

    return <div>
        {weatherNow ? <div className={s.weather__wrapper}>
            <div className={s.temerature_wrapper}>
                <div className={s.weather__temp}>{Math.round(weatherNow.main.temp - 273) + "\u00b0C"}</div>
                <img src={weatherLogoChoiser(weatherNow.weather[0].id, now.getHours())} alt='sun' className={s.weather_pic} />
            </div>
            <div className={s.weather_location}>{weatherNow.name}</div>

        </div> : ''}
    </div>
}

export default Weather