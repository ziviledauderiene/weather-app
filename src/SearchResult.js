const SearchResult = ({
  searchResult,
  setLocation,
  setCity,
  setDisplaySearchResults,
  setCurrentConditions,
  setForecastData,
  setLoading,
}) => {
  const getCurrentWeather = () => {
    (async () => {
      const response = await fetch(
        "https://foreca-weather.p.rapidapi.com/current/" +
          searchResult.id +
          "?tempunit=C&windunit=MS&lang=en",
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

      var currentConditions = [
        { temp: currentWeatherJSON["current"]["temperature"] },
        { feelsLikeTemp: currentWeatherJSON["current"]["feelsLikeTemp"] },
        { symbol: currentWeatherJSON["current"]["symbol"] },
        { symbolPhrase: currentWeatherJSON["current"]["symbolPhrase"] },
        { wind: currentWeatherJSON["current"]["windSpeed"] },
      ];
      setCurrentConditions(currentConditions);
    })();
  };

  const getForecast = () => {
    (async () => {
      const response = await fetch(
        "https://foreca-weather.p.rapidapi.com/forecast/daily/" +
          searchResult.id +
          "?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full",
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

      var forecastData = [];
      for (let a = 0; a < 7; a++) {
        var day = [
          { date: forecastJSON["forecast"][a]["date"] },
          { maxTemp: forecastJSON["forecast"][a]["maxTemp"] },
          { minTemp: forecastJSON["forecast"][a]["minTemp"] },
          { symbol: forecastJSON["forecast"][a]["symbol"] },
          { precipProb: forecastJSON["forecast"][a]["precipProb"] },
        ];
        forecastData.push(day);
      }
      setForecastData(forecastData);
      setLoading(false);
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" +
        searchResult.name +
        "')"; // pasirinkto miesto nuotrauka
    })();
  };

  return (
    <p
      onClick={(e) => {
        e.preventDefault();
        setCity(searchResult.name);
        setDisplaySearchResults(false);
        setLoading(true);
        getCurrentWeather();
        getForecast();
        setLocation("");
      }}
    >
      {searchResult.name}, {searchResult.adminArea}, {searchResult.country}
    </p>
  );
};

export default SearchResult;
