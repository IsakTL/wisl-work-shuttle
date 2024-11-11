import { useState, useEffect } from "react";



const WeatherReport = () => {
  const [weather, setWeather] = useState("");

  const weatherLon = -93.26785;
  const weatherLat = 44.98439;
  

  const getForecast = async () => {
    const forecast = await fetch(
      `https://api.openweathermap.org?lon=${weatherLon}&lat=${weatherLat}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
      //   { mode: "no-cors" }
    )
   
    
      
      console.log(forecast);
      
      const fc = await forecast.json();
      setWeather(fc.current.weather.main);
    };
  useEffect(() => {
    getForecast();
  }, []);

  return (
    <>
      <p id='weatherReport'>Bring your umbrella! It's Raining</p>
      {weather}
    </>
  );
};

export default WeatherReport;
