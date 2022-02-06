import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";

const Search = ({ location, setLocation, setCity, setLoading, currentConditions, setCurrentConditions, forecastData, setForecastData }) => {

const [invalidInput, setInvalidInput] = useState(false);
const [displaySearchResults, setDisplaySearchResults] = useState(false);
const [searchResults, setSearchResults] = useState([]);


const getLocation = () => {

(async ()=>{
  const response = 
    await fetch("https://foreca-weather.p.rapidapi.com/location/search/" + location, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
        "x-rapidapi-key": "047e2c187bmsh433b21ef75b8c98p1b944ajsncdd12618e935"
        }
      });
  var locationJSON = await response.json();
    
  var searchResults = [];
  for (let i=0; i<locationJSON["locations"].length; i++) {
  searchResults.push({
      id: locationJSON["locations"][i]["id"], 
      name: locationJSON["locations"][i]["name"], 
      country: locationJSON["locations"][i]["country"],
      adminArea: locationJSON["locations"][i]["adminArea"]
      });
    }
  setSearchResults(searchResults.slice(0,5)); //max penkios eilutės paieškos rezultate
  setDisplaySearchResults(true);
}) ();
}

// jeigu ištrinamas paieškos laukelis, tai neberodyti dropdown.
useEffect (() => {
  if (location === "") {setDisplaySearchResults(false);}
  else return;
}, [location])


//onSubmit tikrina inputą ir jeigu viskas gerai iškviečia getLocation funkciją.
const onSubmit = (e) => {
  setLocation(e.target.value);
  setInvalidInput(false);
  e.preventDefault(); // nerefreshina puslapio paspaudus enter ar mygtuką
  if (location.trim().length >= 30 || !location.toLowerCase().match(/^[a-z][a-z\s]*$/)) { 
    setInvalidInput(true);
  }
  else getLocation();
}


return (
<>
<form onSubmit={onSubmit}> 
    <input type="text" placeholder="Search City" 
    value={location}
    onChange={onSubmit}   
    />
    <button onClick={onSubmit} type="submit"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></button>
</form>
  {invalidInput ? <span>Please enter a valid City</span> : null}
  {displaySearchResults ? 
    <div className="search-results">
    {
    searchResults.map((searchResult) => (
      <SearchResult key={searchResult.id} searchResult={searchResult} 
      setCity={setCity} 
      setDisplaySearchResults={setDisplaySearchResults}
      setCurrentConditions={setCurrentConditions}
      currentConditions={currentConditions}
      forecastData={forecastData}
      setForecastData={setForecastData}
      setLoading={setLoading}
      setLocation={setLocation}
      />
    ))
    }
    </div> 
  : null
  }


</>
)

};

export default Search;
