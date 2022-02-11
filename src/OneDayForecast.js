export const OneDayForecast = ({ day }) => {

  let today = "";
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  var monthString = month.toString();
  var dateString = date.toString();

  if (monthString.length === 1 && dateString.length === 1) {
    today = "0" + monthString + "-0" + dateString;
  } 
  else if (monthString.length === 1 && dateString.length === 2) {
    today = "0" + monthString + "-" + dateString;
  }
  else if (monthString.length === 2 && dateString.length === 1) {
    today = monthString + "-0" + dateString;
  }
  else {
    today = monthString + "-" + dateString;
  };


  return (
    <div className="one-day">
      <h4>
        {day[0]["date"].slice(5) === today ? "Today" : day[0]["date"].slice(5)}
      </h4>
      <div className="max-min">
        <p className="max">{day[1]["maxTemp"]} °C</p>
        <p>{day[2]["minTemp"]} °C</p>
      </div>
      <img
        src={
          "https://developer.foreca.com/static/images/symbols/" +
          day[3]["symbol"] +
          ".png"
        }
        alt="Weather symbol"
      />
      <div className="rain">
        <svg
          stroke="currentColor"
          fill="blue"
          strokeWidth="0"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="8 6 15 15"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.01,12.23c0-0.26,0.13-0.59,0.38-1.01c0.25-0.42,0.5-0.77,0.73-1.04c0.06-0.07,0.14-0.17,0.23-0.28s0.15-0.17,0.16-0.18
        l0.37,0.43c0.28,0.31,0.53,0.66,0.76,1.07c0.23,0.41,0.35,0.74,0.35,1.01c0,0.41-0.14,0.77-0.43,1.06
        c-0.28,0.29-0.63,0.44-1.05,0.44c-0.41,0-0.77-0.15-1.06-0.44C11.16,12.99,11.01,12.64,11.01,12.23z M14.13,16.38
        c0-0.29,0.08-0.62,0.24-1.01c0.16-0.38,0.36-0.74,0.6-1.06c0.46-0.61,0.89-1.12,1.31-1.53c0.04-0.03,0.13-0.11,0.26-0.24l0.25,0.24
        c0.39,0.37,0.83,0.88,1.32,1.52c0.26,0.34,0.46,0.7,0.62,1.08s0.24,0.71,0.24,1c0,0.69-0.23,1.26-0.7,1.73
        c-0.47,0.47-1.05,0.7-1.73,0.7c-0.68,0-1.25-0.24-1.72-0.71S14.13,17.05,14.13,16.38z M15.65,9.48c0-0.43,0.33-1,1-1.7l0.25,0.28
        c0.19,0.22,0.36,0.46,0.51,0.74c0.15,0.27,0.23,0.5,0.23,0.68c0,0.28-0.1,0.5-0.29,0.69c-0.19,0.18-0.42,0.28-0.7,0.28
        c-0.29,0-0.53-0.09-0.72-0.28C15.75,9.98,15.65,9.75,15.65,9.48z"
          ></path>
        </svg>
        <p>{day[4]["precipProb"]} %</p>
      </div>
    </div>
  );
};
