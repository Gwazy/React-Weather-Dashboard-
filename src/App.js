import React, { useState } from "react";
import logo from "./cartoon_sun.png";
import "./App.css";

const api = {
  key: "3247a56cf62c28df040adb89d6f7fb5c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dataBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <header className="app-header">
        <div></div>
        <h1>Weather Dashboard</h1>
        <img src={logo} className="app-logo" alt="logo" />
      </header>

      <body
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "app warm"
              : "app"
            : "app"
        }
      >
        <h2>Enter Location</h2>

        <div className="search-box">
          <input
            type="text"
            className="search-box"
            placeholder="Enter Location"
            onChange={(e) => setQuery(e.target.value)}
            query={query}
            onKeyPress={search}
          ></input>
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys_country}
              </div>
              <div className="date">{dataBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div>
            <p>Error : Invalid location.</p>
          </div>
        )}
      </body>
    </div>
  );
};

export default App;
