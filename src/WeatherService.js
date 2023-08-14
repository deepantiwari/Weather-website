const API_KEY = "260081da998feeedd5b345ae72509dd5";
const makeIconURL = (iconId) => `http://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormattedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);

    const { weather, main: { temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity },
        wind: { speed },
        sys: { country, sunrise, sunset },
        name,
        coord: { lon, lat },
        rain,
        snow
    } = data;
    const { description, icon } = weather[0]

    return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        temp_max,
        temp_min,
        pressure,
        humidity,
        feels_like,
        speed,
        country,
        name,
        lon,
        lat,
        sunrise,
        sunset,
        rain,
        snow
    };
};


export { getFormattedWeatherData }