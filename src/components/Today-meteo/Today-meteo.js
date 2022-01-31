import React from "react";
import "./Today-meteo.css";

const TodayMeteo = ({ hourlyInfo, dayHourlyInfo }) => {

    const formatDateOnlyHour = (utc) => {
        const milliseconds = utc * 1000;

        function formatAMPM(date) {
            var hours = date.getHours();
            var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            var strTime = hours + ' ' + ampm;
            return strTime;
        }

        return formatAMPM(new Date(milliseconds));
    }

    return (
        <div className="col-lg-3 col-md-4 today_meteo__container mb-sm-3">
            <h3 className="today__title">Today</h3>
            <div className="today__box">
                <p><b>Now</b></p>
                <div className="first_line">
                    <h1 className="m-0">{(~~hourlyInfo[0].temp)}°</h1>
                </div>
                {
                    dayHourlyInfo.length > 0 ? (
                        dayHourlyInfo.map((singleHourly, i) => {
                            return (
                                <div key={i} className="other_line">
                                    <h1 className="m-0">{~~singleHourly.temp}°</h1>
                                    <h5 className="m-0">{formatDateOnlyHour(singleHourly.dt)}</h5>
                                </div>
                            )
                        })
                    ) : ''
                }
                <div className="vertical_line">
                    <div className="first_cyrcle"></div>
                    <div className="vertical"></div>
                    <div className="other_crycle"></div>
                    <div className="vertical"></div>
                    <div className="other_crycle"></div>
                    <div className="vertical"></div>
                    <div className="other_crycle"></div>
                    <div className="vertical"></div>
                </div>
            </div>
        </div>
    );
};

export default TodayMeteo;