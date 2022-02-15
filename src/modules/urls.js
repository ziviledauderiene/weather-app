const options = {
  method: "GET",
  headers: {
      "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
      "x-rapidapi-key":
      "047e2c187bmsh433b21ef75b8c98p1b944ajsncdd12618e935",
      },
  };

const urlLocation = location => "https://foreca-weather.p.rapidapi.com/location/search/" + location;

const urlCurrentWeather = id => "https://foreca-weather.p.rapidapi.com/current/" + id + "?tempunit=C&windunit=MS&lang=en";

const urlForecast = id => "https://foreca-weather.p.rapidapi.com/forecast/daily/" + id + "?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full";

export { options, urlCurrentWeather, urlLocation, urlForecast }