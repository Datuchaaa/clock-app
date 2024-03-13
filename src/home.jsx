import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.scss";

function Home() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=kutaisi&appid=f4ae3de0bdc58aaca724764be343a043&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Clock">
        {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
        </div>
        {weather && (
          <div className="Weather">
            <p>ტემპერატურა: {weather.main.temp}°C</p>
            <p>ამინდი: {weather.weather[0].description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;
