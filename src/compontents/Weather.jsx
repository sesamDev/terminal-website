import React, { useEffect, useState } from "react";

import formattedWeatherData from "../data/weatherData";

function printWeatherData(weatherData) {
  const TABLE = [
    weatherData.name,
    "Current temp: " + weatherData.temp,
    "Condition: " + weatherData.weatherDescription,
    "Min temp: " + weatherData.temp_min,
    "Max temp: " + weatherData.temp_max,
  ];
  return TABLE.map((row, index) => <pre key={index}>{row}</pre>);
}

// const TEST_DATA = {
//   country: "SE",
//   feels_like: 258.74,
//   name: "Tullinge",
//   sunrise: 1671176348,
//   sunset: 1671198530,
//   temp: -9.31,
//   temp_max: -5.31,
//   temp_min: -15.31,
//   weatherCondition: "Clouds",
//   weatherDescription: "broken clouds",
//   windspeed: 1.54,
// };

// TODO: Add support for citys with split name eg New York
const Weather = (props) => {
  const [data, setData] = useState();
  const { city } = props;

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await formattedWeatherData(city, "metric");
      setData(weatherData);
      console.log("Fetch weather data");
    };
    city ? fetchData() : null;
  }, []);
  return (
    <>
      {city === undefined ? (
        <p>You need to specify a city...</p>
      ) : data ? (
        printWeatherData(data)
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
};

export default Weather;
