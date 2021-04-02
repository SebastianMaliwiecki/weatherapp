import React, {useState} from 'react';
import './stylesheet.css';
import './reset.css';

// API HTML and key to access weather information
const api = {
  key:"7248eff058ba1f79c53e30c2ba0fac6e",
  base:"https://api.openweathermap.org/data/2.5/"
}

// Gets hours of the day
function getTime(addHour) {
  var d = new Date();
  var n = d.getHours();
  return n+addHour;
}

// Converts UNIX time format to 24hour format
function UNIXConverter(unix_time) {
  var date = new Date(unix_time*1000); 
  var hour = "";
  var min = "";

  if (date.getHours() < 10) {
    hour = "0"+String(date.getHours())
  } else {
    hour = String(date.getHours())
  }

  if (date.getMinutes() < 10) {
    min = "0"+String(date.getMinutes())
  } else {
    min = String(date.getMinutes())
  }
  
  return hour+":"+min;
}

// Body of the App
function App() {
  // useStates to store city searched and weather information results
  const [query, setQuery] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');

  // Fetches the weather information
  const FetchLonLat = evt => {
    if (evt.key === "Enter") {
      // Fetches object from given API link
      fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
        // json object
        .then(res => res.json())
        .then(result => {
          setWeatherInfo(result); // Set json file returned into the weatherInfo useState
          setQuery(''); // Resets the search
          console.log(result); // Print in console json result
        });
    }
  }

  // Handles input when user enters city/location
  const inputHandler = (event) => {
    setQuery(event.target.value)
  }

  // HTML code that is returned
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
          {(typeof weatherInfo.list != "undefined") ? (
            <div>
              <div className="weather">
                <div className="temperature">
                  <p>{weatherInfo.city.name}, {weatherInfo.city.country}</p>
                  {Math.round(weatherInfo.list[0].main.temp)}°c
                  <p>{weatherInfo.list[0].weather[0].description}</p>
                  <p>hi: {Math.round(weatherInfo.list[0].main.temp_max)}° lo: {Math.round(weatherInfo.list[0].main.temp_min)}°</p>
                </div>
              </div>
              <div className="hourlyForecast">
                <table>
                  <thead>
                    <tr className="center">
                      <td>{getTime(1)}</td>
                      <td className="leftBorder">{getTime(2)}</td>
                      <td className="leftBorder">{getTime(3)}</td>
                      <td className="leftBorder">{getTime(4)}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="center">
                      <td>{Math.round(weatherInfo.list[1].main.temp)}°c</td>
                      <td className="leftBorder">{Math.round(weatherInfo.list[2].main.temp)}°c</td>
                      <td className="leftBorder">{Math.round(weatherInfo.list[3].main.temp)}°c</td>
                      <td className="leftBorder">{Math.round(weatherInfo.list[4].main.temp)}°c</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="center">
                      <td>{Math.round(weatherInfo.list[1].pop)}%</td>
                      <td className="leftBorder">{Math.round(weatherInfo.list[2].pop)}%</td>
                      <td className="leftBorder">{Math.round(weatherInfo.list[3].pop)}%</td>
                      <td className="leftBorder">{Math.round(weatherInfo.list[4].pop)}%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="rainhumidity">
                <table>
                  <thead>
                    <tr>
                      <td>Chance of rain</td>
                      <td>Humidity</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bigFont">{Math.round(weatherInfo.list[0].pop)}%</td>
                      <td className="bigFont">{Math.round(weatherInfo.list[0].main.humidity)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="sunsetrise">
                <table>
                  <thead>
                    <tr>
                      <td>Sunrise</td>
                      <td>Sunset</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bigFont">{UNIXConverter(weatherInfo.city.sunrise)}</td>
                      <td className="bigFont">{UNIXConverter(weatherInfo.city.sunset)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="windpressure">
                <table>
                  <thead>
                    <tr>
                      <td>Wind</td>
                      <td>Pressure</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bigFont">{Math.round(weatherInfo.list[0].wind.speed/1.6)}mph</td>
                      <td className="bigFont">{weatherInfo.list[0].main.pressure}</td>
                    </tr>
                  </tbody>
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