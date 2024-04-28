import React from 'react';
import './App.css';
import ReactAnimatedWeather from "react-animated-weather";
import Clock from "react-live-clock";
import { useState, useEffect } from "react";
// import axios from "axios";

const dateBuilder = (d) => {
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

  return `${day}, ${date} ${month} ${year}`;
};

var defaults = {
  icon:"RAIN",
  color: "white",
  size: 112,
  animate: true,
};



function MainApp() {


  const [state, setState] = useState({
    lat: 27.56,
    lon: 77.65,
    city : "Jais",
    country : "IN", 
    temperatureC: 19, 
    icon: "CLEAR_DAY",
    weather: "Clouds",
    humidity: 16,
    visibility: 1000, 
    windSpeed: 1.56,

  });

  function setIcon(name){
    setState(previousState=>{
      return {...previousState,icon:name}
    });
  }
  const [query, setQuery] = useState("");
  // const [weather, setWeather] = useState({});
  

  
    const getWeather1 = async (city)=>{
      try{
        const api_call = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=b863e2591f7529f91b9d6484eecf0bff&units=metric&q=${city}`
        );
        const data = await api_call.json();
        setState(previousState=>{
          return{...previousState,
          city: data.name,
          temperatureC: Math.round(data.main.temp),
          country: data.sys.country,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
          visibility: data.visibility,
          windSpeed: data.wind.speed,
        }
        });
        postWeather1(query,Math.round(data.main.temp));
        switch (data.weather[0].main) {
          case "Haze":
            setIcon("CLEAR_DAY");
            break;
          case "Clouds":
            setIcon("CLOUDY");
            break;
          case "Rain":
            setIcon("RAIN");
            break;
          case "Snow":
            setIcon("SNOW");
            break;
          case "Dust":
            setIcon("WIND");
            break;
          case "Drizzle":
            setIcon("SLEET");
            break;
          case "Fog":
            setIcon("FOG");
            break;
          case "Smoke":
            setIcon("FOG");
            break;
          case "Tornado":
            setIcon("WIND");
            break;
          default:
            setIcon("CLEAR_DAY");
        };
        // console.log(state.icon);
        // defaults.icon = state.icon;
      }catch(error){
        console.error("error fethching data", error);
      }
      
    }
    
    const postWeather1 = async (city,temp)=>{
        let options ={
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                city:city,
                temp:temp,
            }),
        }
        try{
            console.log(temp);
          await fetch("http://localhost:2001/api/create", options )
          .then((response) => response.json())
          .then((json) => console.log(json));
        //   const data = await api_call.json();
        }catch(error){
          console.error("error fethching data", error);
        } 
      }


    const getWeatherByCoordinate = async (lat, lon)=>{
      try{
        const api_call = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=b863e2591f7529f91b9d6484eecf0bff&units=metric&lat=${lat}&lon=${lon}`
        );
        const data = await api_call.json();
        setState(previousState=>{
          return{...previousState,
          lat : data.coord.lat,
          long : data.coord.lon,
          city: data.name,
          temperatureC: Math.round(data.main.temp),
          country: data.sys.country,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
          visibility: data.visibility,
          windSpeed: data.wind.speed,
        }
        });
        switch (data.weather[0].main) {
          case "Haze":
            setIcon("CLEAR_DAY");
            break;
          case "Clouds":
            setIcon("CLOUDY");
            break;
          case "Rain":
            setIcon("RAIN");
            break;
          case "Snow":
            setIcon("SNOW");
            break;
          case "Dust":
            setIcon("WIND");
            break;
          case "Drizzle":
            setIcon("SLEET");
            break;
          case "Fog":
            setIcon("FOG");
            break;
          case "Smoke":
            setIcon("FOG");
            break;
          case "Tornado":
            setIcon("WIND");
            break;
          default:
            setIcon("CLEAR_DAY");
        };
        // console.log(state.icon);
        // defaults.icon = state.icon;
      }catch(error){
        console.error("error fethching data", error);
      }
      
    }

    const didMount = () => {
      if (navigator.geolocation) {
        getPosition()
          //If user allow location service then will fetch data & send it to get-weather function.
          .then((position) => {
            getWeatherByCoordinate(position.coords.latitude, position.coords.longitude);
          })
          .catch((err) => {
            //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
            getWeatherByCoordinate(28.67, 77.22);
            alert(
              "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
            );
          });
      } else {
        alert("Geolocation not available");
        getWeatherByCoordinate(state.lat, state.lon);
      }

    }

    const getPosition = (options) => {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };

    useEffect(()=>{
      didMount();
    });

    // useEffect(()=>{
    //   // getWeather1("Vrindavan")
    // },[]);

    const handleSearch = () => {
      getWeather1(query)
    //   setTimeout(postWeather1(query,state.temperatureC), 5000);
      
    };

    // const postSearch = () =>{
    //     postWeather1(query,state.temperatureC); 
    // };

  

  return (
    
    <div className="App">
      <div>
        <video loop autoPlay muted id="bg-video">
          <source src={require('../src/video.mp4')} type="video/mp4" />
        </video>
      </div>

      <>
      <div className="root">
        <div className="main_box">
            <div className="box_1">
                <div className="city">
                    <div className="title">
                      <h2>{state.city}</h2>
                      <h3>{state.country}</h3>
                    </div>
                    <div className="mb-icon"> 
                      <canvas width="112" height="112"></canvas>
                      <p></p>
                    </div>
                    <div className="date-time">
                      <div className="dmy">
                        <div id="txt"></div>
                        <div className="current-time">
                          <Clock format="h:mm:ss A" interval={1000} ticking={true} />
                        </div>
                        <div className="current-date">{dateBuilder(new Date())}</div>
                      </div>
                      <div className="temperature">
                        <p>{state.temperatureC}°<span>C</span></p>
                      </div>
                    </div>
                  </div>    
            </div>

            <div className="box_2">
                <div className="container">

                    <div className="top">
                      <ReactAnimatedWeather
                        icon={state.icon}
                        color={defaults.color}
                        size={defaults.size}
                        animate={defaults.animate}
                      />
                    </div>

                    <div className="today-weather">
                        <h3>{state.weather}</h3>
                        {/* <hr />
                        <input type="text" placeholder="Search any city" />
                        <hr /> */}
                        <div className="search-box">
                          <input
                            type="text"
                            className="search-bar"
                            placeholder="Search any city"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                          />
                          <div className="img-box">
                            {" "}
                            <img
                              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                              alt="search-icon"
                              onClick = {handleSearch}
                            //   onClick={() => { handleSearch(); postSearch();}} 
                            />
                          </div>
                        </div>
                    </div>

                    <div className="bottom">
                        <ul><div>
                            <li className="cityHead">
                              <p>{state.city}, {state.country}</p>
                            </li>
                            <li>Temperature <span className="temp">{state.temperatureC}°<span>C</span> ({state.weather})</span></li>
                            <li>Humidity <span className="temp">{state.humidity}%</span></li>
                            <li>Visibility <span className="temp">{state.visibility} mi</span></li>
                            <li>Wind Speed <span className="temp">{state.windSpeed} Km/h</span></li>
                          </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
      </>
    </div>
  );
}

export default MainApp;
