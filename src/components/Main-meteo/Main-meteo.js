import React from "react";
import "./Main-meteo.css";

const MainMeteo = ({ mainCityName, date, mainDescription, mainTemp, iconWeather }) => {
  return (
    <div className="col-lg-8 main_meteo__container">
        <div className="main_meteo__box">
            <h2>{mainCityName}</h2>
            <h5>{date}</h5>
            <h5>{mainDescription}</h5>
        </div>
        <div className="left-box-meteo">
            <h1 className="temp-left-box-meteo m-0">{mainTemp}°</h1>
            <img src={`https://openweathermap.org/img/wn/${iconWeather}@2x.png`} alt="weather"/>
        </div>
    </div>
  );
};

export default MainMeteo;