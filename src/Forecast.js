import { OneDayForecast } from "./OneDayForecast";

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast">
      <h2>7 Days Forecast</h2>
      <div className="days">
        {forecastData.map((day) => (
          <OneDayForecast key={day[0]["date"]} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
