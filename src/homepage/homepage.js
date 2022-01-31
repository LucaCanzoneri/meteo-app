import React from "react";
import "./homepage.css";
import plus from './../images/Plus.png';
import search from './../images/Search.png';
import localization from './../images/Location.png';
import { addList } from "./../redux/list";
import { connect } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Components
import MainMeteo from "../components/Main-meteo/Main-meteo"
import ListMeteo from "../components/List-meteo/List-meteo"
import TodayMeteo from "../components/Today-meteo/Today-meteo"

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainDescription: "",
            mainCityName: "Turin",
            iconWeather: "",
            mainTemp: "",
            dailyInfo: [],
            thisWeek: true,
            hourlyInfo: [],
            dayHourlyInfo: [],
            inputSearch: "",
            loading: true,
            actuallyLat: "",
            actuallyLong: "",
        }
    }

    formatDate = () => {
        var today  = new Date();
        
        return today.toLocaleDateString("en-US", {weekday: 'long'}) + " " +
            today.toLocaleDateString("en-US", {day: 'numeric'}) + ", " +
            today.toLocaleDateString("en-US", {month: 'long'});
    }

    getOnlyDayName = (utc) => {
        const milliseconds = utc * 1000;
        const dateObject = new Date(milliseconds);

        return dateObject.toLocaleDateString("en-US", {weekday: 'long'});
    }

    formatShortDate = (utc) => {
        const milliseconds = utc * 1000;
        const dateObject = new Date(milliseconds);

        return dateObject.toLocaleDateString("en-US", {weekday: 'short'}) + ", " +
            dateObject.toLocaleDateString("en-US", {day: 'numeric'}) + " " +
            dateObject.toLocaleDateString("en-US", {month: 'short'});
    }

    formatDateOnlyHour = (utc) => {
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

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    manageCardWeek = () => {
        this.setState({
            thisWeek: true,
        }); 
    }

    manageCardMonth = () => {
        this.setState({
            thisWeek: false,
        });
    }

    addCityToList = () => {

        const { addList, cityName } = this.props;
        const { mainCityName, hourlyInfo, iconWeather, mainTemp } = this.state;

        const hour = this.formatDateOnlyHour(hourlyInfo[0].dt);
        
        var isDuplicate = false;
        cityName.map((el) => {
            if(el.name == mainCityName) 
            isDuplicate = true
        })
        if(cityName.length < 2 && !isDuplicate) {
            addList({"name": mainCityName, "hour": hour, "icon": iconWeather, "temp": mainTemp});
        } else {
            alert("Hai già aggiunto questa città alla lista!");
        }
    }

    meteoFromPosition = (lat, long) => {

        fetch(
            `https://us1.locationiq.com/v1/reverse.php?key=pk.50c3cd79e002f98ab8e576f7804e1bca&lat=${lat}&lng=${long}&format=json`
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({
                mainCityName: data.address.city,
            })
        })
        .catch((e) => {
            console.log(e);
        });


        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=b5f695f2318a162515c964fca2f641a3`
            )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({
                actuallyLat: lat,
                actuallyLong: long,
                loading: false,
                mainDescription: data.current.weather[0].main,
                iconWeather: data.current.weather[0].icon,
                mainTemp: ~~data.current.temp,
                dailyInfo: data.daily,
                hourlyInfo: data.hourly,
                dayHourlyInfo: data.hourly.splice(1, 3)
            });
        })
        .catch((e) => {
            console.log(e);
        });

    }

    meteoFromSearch = () => {
        const { inputSearch } = this.state;

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=b5f695f2318a162515c964fca2f641a3`
            )
        .then((res) => res.json())
        .then((data) => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            this.setState({
                mainCityName: data.name,
                inputSearch: "",
            });

            this.meteoFromPosition(lat, lon);

        })
        .catch((e) => {
            console.log(e);
        });

    }

    componentDidMount() {
        let _self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            _self.meteoFromPosition(position.coords.latitude, position.coords.longitude);
        });
    }
    
    render() {
        const {
            mainDescription,
            mainCityName,
            iconWeather,
            mainTemp,
            dailyInfo,
            thisWeek,
            hourlyInfo,
            inputSearch,
            loading,
            dayHourlyInfo,
          } = this.state;
        
        const {
            cityName
        } = this.props;

        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1400 },
                items: 3,
                slidesToSlide: 3
            },
            tablet: {
                breakpoint: { max: 1400, min: 768 },
                items: 2,
                slidesToSlide: 2
            },
            mobile: {
                breakpoint: { max: 768, min: 0 },
                items: 1,
                slidesToSlide: 1
            }
        };

        return (
            <> 
                {
                    loading ? '' : 
                    (

                        <div className="container-fluid personal-container">
                            <div className="row">

                                <MainMeteo 
                                    mainCityName={mainCityName} 
                                    date={this.formatDate()} 
                                    mainDescription={mainDescription} 
                                    mainTemp={mainTemp} 
                                    iconWeather={iconWeather}>
                                </MainMeteo>

                                <div className="col-lg-4 box-meteo-container">
                                    <div className="box-dropdown-meteo">
                                        <div className="search-box" 
                                            onClick={() => {
                                                this.addCityToList();
                                            }}
                                        >
                                            <img src={plus} />
                                            <h5 className="m-0">Aggiungi città</h5>
                                        </div>
                                        {
                                            cityName ? cityName.map((el) => {
                                                return (
                                                    <ListMeteo 
                                                        name={el.name} 
                                                        date={this.formatDate()} 
                                                        hour={el.hour} 
                                                        icon={el.icon} 
                                                        temp={el.temp}>
                                                    </ListMeteo>
                                                )
                                            }) : ''
                                        }
                                    </div>
                                </div>

                                <TodayMeteo hourlyInfo={hourlyInfo} dayHourlyInfo={dayHourlyInfo}></TodayMeteo>

                                
                                <div className="col-lg-5 col-md-8 multiple_cards__container">

                                    <div className="multiple_cards__selection">
                                        <button onClick={this.manageCardWeek} className={thisWeek ? 'selection selection__active thisWeek' : 'selection thisWeek'}><h3 className="m-0">This week</h3></button>
                                        <button onClick={this.manageCardMonth} className={thisWeek ? 'selection thisMonth' : 'selection selection__active thisMonth'}><h3 className="m-0">This month</h3></button>
                                    </div>
                                    <div className="multiple__box selection__active">
                                    {
                                        thisWeek ? (
                                        <Carousel
                                            swipeable={true}
                                            draggable={false}
                                            showDots={true}
                                            responsive={responsive}
                                            arrows={false}
                                            keyBoardControl={true}
                                            customTransition="all .5"
                                            containerClass="carousel-container"
                                            removeArrowOnDeviceType={["tablet", "mobile"]}
                                            deviceType={this.props.deviceType}
                                            dotListClass="custom-dot-list-style"
                                            itemClass="carousel-item-padding-40-px"
                                        >
                                            {dailyInfo.map((daily) => {
                                                return (
                                                    <div key={daily.dt}
                                                    className="single__box">
                                                        <h5><b>{this.getOnlyDayName(daily.dt)}</b></h5>
                                                        <h1>{~~daily.temp.day}°</h1>
                                                        <img src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} alt="weather"/>
                                                    </div>
                                                )
                                            })

                                            }
                                        
                                        </Carousel> ) : (

                                            <div className="single_big__box">
                                                <div className="row row-this-month m-0">
                                                    <div className="col-md-4 monthInfo-flex">
                                                        <h5><b>{this.formatShortDate(dailyInfo.at(-1).dt)}</b></h5>
                                                        <img src={`https://openweathermap.org/img/wn/${dailyInfo.at(-1).weather[0].icon}@2x.png`} alt="weather"/>
                                                    </div>
                                                    <div className="col-md-8 text-start">
                                                        <h2><b>{~~dailyInfo.at(-1).temp.day}°</b></h2>
                                                        <p>{this.capitalizeFirstLetter(dailyInfo.at(-1).weather[0].description)}</p>
                                                        <p>The high will be {~~dailyInfo.at(-1).temp.min}°C, the low will be {~~dailyInfo.at(-1).temp.max}°C.</p>
                                                        <div>
                                                            <p className="m-0">Humitidy: {dailyInfo.at(-1).humidity}%</p>
                                                            <p className="m-0">UV: {~~dailyInfo.at(-1).uvi}</p>
                                                            <p className="m-0">Dew point: {~~dailyInfo.at(-1).dew_point}°C</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        )

                                    }
                                    

                                    </div>
                                </div>


                                <div className="col-lg-4">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-12">
                                            <div className="search-container">
                                                <h3 className="today__title">Search</h3>
                                                <div className="searchBox">
                                                    <input
                                                        type="search"
                                                        value={inputSearch}
                                                        className="search_input"
                                                        placeholder="ex: Miami"
                                                        onChange={(e) => {
                                                            const { value } = e.target;
                                                            this.setState({ inputSearch: value });
                                                        }}
                                                    ></input>
                                                    <button 
                                                        className="search_button"
                                                        onClick={() => {
                                                            this.setState({ loading: true }, () => {
                                                                this.meteoFromSearch();
                                                            });
                                                        }}
                                                        >
                                                        <img src={search} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-12">
                                            <div className="search-container">
                                                <h3 className="today__title">Localization</h3>
                                                <button 
                                                    className="localization__button"
                                                    onClick={() => {
                                                        this.setState({ loading: true }, () => {
                                                            let _self = this;
                                                            this.setState({
                                                                mainCityName: "Torino", //Schianto torino perchè il servizio che ho trovato per ricavare il nome della città non funziona
                                                            })
                                                            navigator.geolocation.getCurrentPosition(function(position) {
                                                                _self.meteoFromPosition(position.coords.latitude, position.coords.longitude);
                                                            });
                                                        });
                                                    }}
                                                    >
                                                    <img src={localization} />
                                                    <h3 className="localization__text"><b>Add localization</b></h3>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    cityName: state.list.list,
});

const mapDispatchToProps = {
    addList,
};
  
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(HomePage);