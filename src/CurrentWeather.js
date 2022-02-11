const CurrentWeather = ({ city, currentConditions }) => {
  return (
    <div className="current-container">
      <h1>Now in {city}</h1>
      <div className="current-weather">
        <div>
          <p className="temp">{currentConditions[0]["temp"]} °C</p>
          <p>Feels like {currentConditions[1]["feelsLikeTemp"]} °C</p>
          <p>Wind: {currentConditions[4]["wind"]} m/s</p>
        </div>
        <div>
          <img
            src={
              "https://developer.foreca.com/static/images/symbols/" +
              currentConditions[2]["symbol"] +
              ".png"
            }
            alt="Weather symbol"
          />
          <p className="phrase">{currentConditions[3]["symbolPhrase"]}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
