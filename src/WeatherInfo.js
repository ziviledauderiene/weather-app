import Forecast from "./Forecast";
import CurrentWeather from "./CurrentWeather";

export const WeatherInfo = ({ city, currentConditions, forecastData }) => {
  return (
    <>
      <CurrentWeather city={city} currentConditions={currentConditions} />

      <Forecast forecastData={forecastData} />
    </>
  );
};
