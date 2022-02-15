import React, { useState, useEffect } from "react";
import Search from "./Search";
import { WeatherInfo } from "./WeatherInfo";
import { Loading } from "./Loading";
import { options, urlCurrentWeather, urlForecast } from "./modules/urls"

function App() {
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("Vilnius");
  const [currentConditions, setCurrentConditions] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(urlCurrentWeather("100593116"), options);
        
        const { current } = await response.json();
        const currentVilnius = {
          temp: current.temperature,
          feelsLikeTemp: current.feelsLikeTemp,
          symbol: current.symbol,
          symbolPhrase: current.symbolPhrase,
          wind: current.windSpeed
        };

        setCurrentConditions(currentVilnius);
        }
      catch (error){
        console.log(error);
      }
    })();

    (async () => {
      try {
        const response = await fetch(urlForecast("100593116"), options);
        var forecastJSON = await response.json();

        var forecastVilniusData = [];
        for (let a = 0; a < 7; a++) {
          var day = [
            { date: forecastJSON["forecast"][a]["date"] },
            { maxTemp: forecastJSON["forecast"][a]["maxTemp"] },
            { minTemp: forecastJSON["forecast"][a]["minTemp"] },
            { symbol: forecastJSON["forecast"][a]["symbol"] },
            { precipProb: forecastJSON["forecast"][a]["precipProb"] },
          ];
          forecastVilniusData.push(day);
        }
        setForecastData(forecastVilniusData);
        setLoading(false);
      }
      catch (error){
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <Search
        location={location}
        setLocation={setLocation}
        city={city}
        setCity={setCity}
        setCurrentConditions={setCurrentConditions}
        currentConditions={currentConditions}
        forecastData={forecastData}
        setForecastData={setForecastData}
        setLoading={setLoading}
      />

      {loading ? (
        <Loading />
      ) : (
        <WeatherInfo
          city={city}
          currentConditions={currentConditions}
          forecastData={forecastData}
        />
      )}
    </div>
  );
}

export default App;
