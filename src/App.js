import React, {useState} from 'react';
import './stylesheet.css';
import './reset.css';

const api = {
  key:"7248eff058ba1f79c53e30c2ba0fac6e",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [coord, setCoord] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');

  
  const FetchLonLat = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setCoord(result);
          setQuery(''); // Resets the search
          console.log(result);
          fetchWeatherInfo(result); // Passes on json
        });
    }
  }

  function fetchWeatherInfo(coordRes) {
    var lat = coordRes.coord.lat;
    var lon = coordRes.coord.lon;
    fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeatherInfo(result);
        console.log(result);
      });
  }

  const inputHandler = (event) => {
    setQuery(event.target.value)
  }

  function getTime(addHour) {
    var d = new Date();
    var n = d.getHours();
    return n+addHour;
  }

  function UNIXConverter(unix_time) {
    var date = new Date(unix_time*1000); 
    var hour = "";
    var min = "";
    if (date.getHours() < 10) {
      hour = "0"+String(date.getHours())
    } else {
      hour = String(date.getHours())
    }

    

    return String(date.getHours())+":"+String(date.getMinutes());
  }

  return (
    <body>
      <div className="app">
        <main>
          <div className="searchBox">
            <input
              type="text"
              className="searchBoxInput"
              placeholder="Enter destination..."
              onChange={inputHandler}
              value={query}
              onKeyPress={FetchLonLat}
            />
          </div>
          {(typeof coord.main != "undefined") ? (
            <div>
              <div className="weather">
                <div className="temperature">
                  <p>{coord.name}, {coord.sys.country}</p>
                  {Math.round(weatherInfo.current.temp)}°c
                  <p>{weatherInfo.current.weather[0].description}</p>
                  <p>hi: {Math.round(coord.main.temp_max)}° lo: {Math.round(coord.main.temp_min)}°</p>
                </div>
              </div>
              <div className="hourlyForecast">
                <table>
                    <tr className="center">
                      <td>{getTime(1)}</td>
                      <td className="leftBorder">{getTime(2)}</td>
                      <td className="leftBorder">{getTime(3)}</td>
                      <td className="leftBorder">{getTime(4)}</td>
                    </tr>
                    <tr className="center">
                      <td>{Math.round(weatherInfo.hourly[1].temp)}°</td>
                      <td className="leftBorder">{Math.round(weatherInfo.hourly[2].temp)}°</td>
                      <td className="leftBorder">{Math.round(weatherInfo.hourly[3].temp)}°</td>
                      <td className="leftBorder">{Math.round(weatherInfo.hourly[4].temp)}°</td>
                    </tr>
                    <tr className="center">
                      <td>{Math.round(weatherInfo.hourly[1].pop)}%</td>
                      <td className="leftBorder">{Math.round(weatherInfo.hourly[1].pop)}%</td>
                      <td className="leftBorder">{Math.round(weatherInfo.hourly[2].pop)}%</td>
                      <td className="leftBorder">{Math.round(weatherInfo.hourly[3].pop)}%</td>
                    </tr>
                  </table>
              </div>
              <div className="rainhumidity">
                <table>
                  <tr>
                    <td>Chance of rain</td>
                    <td>Humidity</td>
                  </tr>
                  <tr>
                    <td className="bigFont">{Math.round(weatherInfo.hourly[1].pop)}%</td>
                    <td className="bigFont">{Math.round(weatherInfo.hourly[1].humidity)}%</td>
                  </tr>
                </table>
              </div>
              <div className="sunsetrise">
                <table>
                  <tr>
                    <td>Sunrise</td>
                    <td>Sunset</td>
                  </tr>
                  <tr>
                    <td className="bigFont">{UNIXConverter(1616306442)}</td>
                    <td className="bigFont">{UNIXConverter(1616350473)}</td>
                  </tr>
                </table>
              </div>
              <div className="windpressure">
                <table>
                  <tr>
                    <td>Wind</td>
                    <td>Pressure</td>
                  </tr>
                  <tr>
                    <td className="bigFont">2 mph</td>
                    <td className="bigFont">1041</td>
                  </tr>
                </table>
              </div>
            </div>
          ) : 
          (
            <div>
              <div className="enterDestination">
                Enter destination to get weather information
              </div>
            </div>
          )}
        </main>
      </div>
    </body>
  );
}

export default App;