import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg';
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './WeatherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [city, setCity] = useState("butwal");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(hotBg)
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      //dynamic bg
      const threshold = units === 'metric' ? 20 : 68;
      if (data.temp <= threshold) setBg(coldBg)
      else setBg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  }

  const openMap = () => {
    if (weather) {
      window.open(`https://www.google.com/maps?q=${weather.lat},${weather.lon}&t=k`);
    }
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {
          weather && (
            <div className='container'>
              <div className='section section__inputs'>
                <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter city...' />

                <div className="button-group">
                  <button className="button-85" onClick={openMap}>
                    Map
                  </button>
                  <button className='button-85'
                    onClick={(e) => handleUnitsClick(e)}>°F</button>
                </div>
              </div>

              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{`${weather.name},${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3> {weather.description}</h3>
                </div>

                {weather.rain && weather.rain['1h'] && (
                  <p>Rain in the last 1 hour: {weather.rain['1h']} mm</p>
                )}
                {weather.rain && weather.rain['3h'] && (
                  <p>Rain in the last 3 hours: {weather.rain['3h']} mm</p>
                )}
                {weather.snow && weather.snow['1h'] && (
                  <p>Snow in the last 1 hour: {weather.snow['1h']} mm</p>
                )}
                {weather.snow && weather.snow['3h'] && (
                  <p>Snow in the last 3 hours: {weather.snow['3h']} mm</p>
                )}

                <div className='temperature'>
                  <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
                </div>
              </div>
              <div className="section section__temperature">
                <p><FontAwesomeIcon icon={faSun} /> Sunrise: {new Date(weather.sunrise * 1000).toLocaleTimeString()}</p>
                <p><FontAwesomeIcon icon={faMoon} /> Sunset: {new Date(weather.sunset * 1000).toLocaleTimeString()}</p>
              </div>

              {/* bottom description */}
              <Descriptions weather={weather} units={units} />
              <p style={{ color: "white" }}> Blue Unicorn Version 1.2</p>
            </div>
          )
        }
        <style>
          {`
.button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}


.button-group {
              display: flex;
              gap: 5rem;
        `}
        </style>
      </div>
    </div>
  );
}

export default App;
