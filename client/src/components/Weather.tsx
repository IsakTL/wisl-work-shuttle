import {useState, useEffect} from 'react';

const weatherReport = () => {
const [weather, setWeather] = useState('');

const weatherLon = -93.26785;
const weatherLat = 44.98439;

const getForecast = async () => {
    const forecast = await fetch(`https://api.openweathermap.org?lon=${weatherLon}&lat=${weatherLat}&appid=${import.meta.env.WEATHER_API_KEY}`)
    console.log(forecast)
    // TODO: set weather to something to do with forecast
}


return (
    <>
    <p>

    </p>
    </>
)
}

export default getForecast;