import React, { useState, useEffect } from "react";
import Search from "./Search";
import { WeatherInfo } from "./WeatherInfo";
import { Loading } from "./Loading";

function App() {
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("Vilnius");
  const [currentConditions, setCurrentConditions] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://foreca-weather.p.rapidapi.com/current/100593116?tempunit=C&windunit=MS&lang=en",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
            "x-rapidapi-key":
              "047e2c187bmsh433b21ef75b8c98p1b944ajsncdd12618e935",
          },
        }
      );

      var currentWeatherJSON = await response.json();
      var currentVilnius = [
        { temp: currentWeatherJSON["current"]["temperature"] },
        { feelsLikeTemp: currentWeatherJSON["current"]["feelsLikeTemp"] },
        { symbol: currentWeatherJSON["current"]["symbol"] },
        { symbolPhrase: currentWeatherJSON["current"]["symbolPhrase"] },
        { wind: currentWeatherJSON["current"]["windSpeed"] },
      ];
      setCurrentConditions(currentVilnius);
    })();

    (async () => {
      const response = await fetch(
        "https://foreca-weather.p.rapidapi.com/forecast/daily/100593116?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
            "x-rapidapi-key":
              "047e2c187bmsh433b21ef75b8c98p1b944ajsncdd12618e935",
          },
        }
      );
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
