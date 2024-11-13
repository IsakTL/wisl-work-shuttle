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
const savedShiftData = JSON.parse(localStorage.getItem('storedShiftData') || '{}');




  return (
    <>
    <h1>Welcome {savedShiftData.employee.name}</h1>
      <p id='weatherMessage'>{weather}Its rainy today. Don't forget your umbrella!</p>
      <div className='shiftCard'>
        <h5>Scheduled for: {savedShiftData.date}</h5>
      <p>Your shift starts at {savedShiftData.times.startTime} in the {savedShiftData.type}. You should arrive at the pickup location at least 30 minutes before your shift. You will be returned to the same location at approximately {savedShiftData.times.dropoffTime}, after your shifts' end.</p>
      </div>
      <footer className='foot'>Crafted with Care, sincerely, Woods, Idris, Stephenson, Larsson</footer>
    </>
  );
};

export default WeatherReport;
