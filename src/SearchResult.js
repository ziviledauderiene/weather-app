import { options, urlCurrentWeather, urlForecast } from "./modules/urls";

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
      try {
        const response = await fetch(
          urlCurrentWeather(searchResult.id),
          options
        );

        const { current } = await response.json();
        const currentConditions = {
          temp: current.temperature,
          feelsLikeTemp: current.feelsLikeTemp,
          symbol: current.symbol,
          symbolPhrase: current.symbolPhrase,
          wind: current.windSpeed,
          time: current.time,
        };
        setCurrentConditions(currentConditions);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const getForecast = () => {
    (async () => {
      try {
        const response = await fetch(urlForecast(searchResult.id), options);
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
          "')";
      } catch (error) {
        console.log(error);
      }
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
