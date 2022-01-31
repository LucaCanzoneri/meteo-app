import React from "react";
import "./List-meteo.css";

const ListMeteo = ({ name, date, hour, icon, temp }) => {
  return (
    <div className="city__card">
        <div className="row">
            <div className="col-sm-4 text-white text-sm-start">
                <h3 className="m-0"><b>{name}</b></h3>
                <p className="m-0">{date}</p>
                <p className="m-0">{hour}</p>
            </div>
            <div className="col-sm-4">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather"/>
            </div>
            <div className="col-sm-4 d-flex align-items-center justify-content-center text-white">
                <h1 className="m-0"><b>{temp}°</b></h1>
            </div>
        </div>
    </div>
  );
};

export default ListMeteo;