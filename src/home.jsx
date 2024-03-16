import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.scss";
import dayBack from "./images/dayBackground.png";
import nightBack from "./images/nightBackground.jpg";

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

  const isNightTime = () => {
    const hour = time.getHours();
    return hour >= 20 || hour < 6;
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${isNightTime() ? nightBack : dayBack})` }}
    >
      <header className="App-header">
        <div className="info">
          <p>
            jbskjdfasdbkfnlaksbjdhlfjkasjdbkja,hs
          </p>
        </div>
        <div className="clock-weather-btn">
          <div className="clock-weather">
            <div className="Clock">
              {time.toLocaleTimeString([], {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            {weather && (
              <div className="Weather">
                <p>ტემპერატურა  : {weather.main.temp}°C</p>
                <p>ამინდი : {weather.weather[0].description}</p>
              </div>
            )}
          </div>

          <button>
            M O R E <div className="arrow down"></div>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
