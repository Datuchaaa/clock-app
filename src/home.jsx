import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.scss";
import dayBack from "./images/dayBackground.png";
import nightBack from "./images/nightBackground.jpg";

function Home() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [worldTime, setWorldTime] = useState(null);
  const [showMore, setShowMore] = useState(false);

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

  useEffect(() => {
    const fetchWorldTime = async () => {
      try {
        const response = await axios.get("https://worldtimeapi.org/api/ip");
        setWorldTime(response.data);
      } catch (error) {
        console.error("Error fetching world time data:", error);
      }
    };

    fetchWorldTime();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isNightTime = () => {
    const hour = time.getHours();
    return hour >= 20 || hour < 6;
  };

  const clickMore = () => {
    setShowMore(!showMore);
  }

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${isNightTime() ? nightBack : dayBack})` }}
    >
      <header className="App-header">
        <div className="info">
          <p>jbskjdfasdbkfnlaksbjdhlfjkasjdbkja,hs</p>
        </div>
        <div className={`clock-weather-btn ${showMore ? 'active' : ''}`}>
          <div className="clock-weather">
            <div className="Clock">
              <span>GOOD MORNING, IT'S CURRENTLY</span>
              {worldTime && worldTime.datetime && (
                <div className="Clock">
                  {new Date(worldTime.datetime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  })}
                </div>
              )}
            </div>
            {weather && (
              <div className="Weather">
                <p>ტემპერატურა : {weather.main.temp}°C</p>
                <p>ამინდი : {weather.weather[0].description}</p>
              </div>
            )}
            {worldTime && <div className="WorldTime"></div>}
          </div>

          <button onClick={clickMore}>
            M O R E <div className="arrow down"></div>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
