import sun from '../../../../assets/Weather/sunny.png'
import moon from '../../../../assets/Weather/moon.png'
import cloudsDay from '../../../../assets/Weather/cloudy-day.png'
import cloudsNight from '../../../../assets/Weather/cloudy-night.png'
import clouds from '../../../../assets/Weather/clouds.png'
import hardClouds from '../../../../assets/Weather/hard_clouds.png'
import hardRain from '../../../../assets/Weather/hard_rain.png'
import lightRain from '../../../../assets/Weather/light_rain.png'
import lightRainNight from '../../../../assets/Weather/light-rain-night.png'
import lightning from '../../../../assets/Weather/lighting.png'
import snow from '../../../../assets/Weather/snow.png'
import fog from '../../../../assets/Weather/fog.png'

let conditions = {
    clear: { day: sun, night: moon },
    lightClouds: { day: cloudsDay, night: cloudsNight },
    clouds: { day: clouds, night: clouds },
    hardClouds: { day: hardClouds, night: hardClouds },
    hardRain: { day: hardRain, night: hardRain },
    lightRain: { day: lightRain, night: lightRainNight },
    lightning: { day: lightning, night: lightning },
    snow: { day: snow, night: snow },
    fog: { day: fog, night: fog }
}

export const weatherLogoChoiser = (weather, time) => {
    console.log(weather)


    if (weather) {
        let condition
        if (weather < 300) {
            condition = 'lightning'
        } else if (299 < weather && weather < 400) {
            condition = 'hardRain'
        } else if (499 < weather && weather < 512) {
            condition = 'lightRain'
        } else if (520 < weather && weather < 532) {
            condition = 'hardRain'
        } else if (599 < weather && weather < 622) {
            condition = 'snow'
        } else if (699 < weather && weather < 800) {
            condition = 'fog'
        } else if (weather === 800) {
            condition = 'clear'
        } else if (802 === weather) {
            condition = 'clouds'
        } else if (802 < weather) {
            condition = 'hardClouds'
        }else if (801 === weather) {
            condition = 'lightClouds'
        }

        if (4 < time < 21) {
            return conditions[condition].day
        } else {
            return conditions[condition].night
        }
    }
}