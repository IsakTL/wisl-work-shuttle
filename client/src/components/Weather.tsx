import { useState, useEffect } from "react";

const WeatherReport = () => {
  const [weather, setWeather] = useState("");

  const weatherLon = -93.26785;
  const weatherLat = 44.98439;
  
  useEffect(() => {
      getForecast();
  }, []);

  const getForecast = async () => {
    const forecast = await fetch(
      `https://api.openweathermap.org?lon=${weatherLon}&lat=${weatherLat}&appid=${
        import.meta.env.WEATHER_API_KEY
      }`
    );
    console.log(forecast.json());
    const fc = await forecast.json();
    setWeather(fc.current.weather.main);
};


  return (
    <>
      <p>It's chilly out!</p> 
      {/* Replace chilly with weather conditions */}
    </>
  );
};

export default WeatherReport;
