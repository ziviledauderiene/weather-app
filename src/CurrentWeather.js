const CurrentWeather = ({ city, currentConditions }) => {
  return (
    <div className="current-container">
      <h1>Now in {city}</h1>
      <div className="current-weather">
        <div>
          <p className="temp">{currentConditions.temp} °C</p>
          <p>Feels like {currentConditions.feelsLikeTemp} °C</p>
          <p>Wind: {currentConditions.wind} m/s</p>
        </div>
        <div>
          <img
            src={
              "https://developer.foreca.com/static/images/symbols/" +
              currentConditions.symbol +
              ".png"
            }
            alt="Weather symbol"
          />
          <p className="phrase">{currentConditions.symbolPhrase}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
