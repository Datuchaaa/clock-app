import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.scss";
import dayBack from "./images/dayBackground.png";
import nightBack from "./images/nightBackground.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMoon } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [worldTime, setWorldTime] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [apiData, setApiData] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=tbilisi&appid=f4ae3de0bdc58aaca724764be343a043&units=metric`
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
    const fetchWeek = async () => {
      try {
        const response = await axios.get("https://worldtimeapi.org/api/ip");
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching world time data:", error);
      }
    };

    fetchWeek();
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
  };
  const moon = <FontAwesomeIcon icon={faMoon} />;

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${isNightTime() ? nightBack : dayBack})` }}
    >
      <header className="App-header">
        <div className="info">
          <p></p>
        </div>
        <div className="clock-weather-btn-info">
          <div className={`clock-weather-btn ${showMore ? "active" : ""}`}>
            <div className="clock-weather">
              <div className="Clock">
                <span>{moon} GOOD MORNING, IT'S CURRENTLY</span>
                {worldTime && worldTime.datetime && (
                  <div className="Clock">
                    {new Date(worldTime.datetime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </div>
                )}
              </div>

              {worldTime && <div className="WorldTime"></div>}
            </div>

            <button onClick={clickMore}>
              {showMore ? "L E S S" : "M O R E"}{" "}
              <div className={`arrow down ${showMore ? "rotated" : ""}`}>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </button>
          </div>

          <div className={`showmore-info ${showMore ? "active" : ""}`}>
            <div className="year-time-wrapper">
              {apiData && (
                <div className="weather timezone">
                  Current Time Zone<h2>{apiData.timezone}</h2>
                </div>
              )}
              {apiData && (
                <div className="weather dayoftheyear">
                  Day of the year <h2>{apiData.day_of_year}</h2>
                </div>
              )}
            </div>
            <div className="weather">
              {weather && (
                <div className="Weather">
                  <p>ტემპერატურა : {weather.main.temp}°C</p>
                  <p>ამინდი : {weather.weather[0].description}</p>
                </div>
              )}
              {apiData && (
                <div className="Week">Week Number : {apiData.week_number}</div>
              )}

              {apiData && (
                <div className="Week">
                  Day of the week : {apiData.day_of_week}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
