/* eslint-disable react/prop-types */
import { useState , useEffect} from 'react'
import countriesService from './services/countriesdata.js'
import axios from 'axios'

const SearchInput = ({searchTerm,handleSearch}) =>{
  return(
  <input 
        id="search" 
        type="text" 
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder="Search for a country..."
      />
  )
}

const CountryView = ({one}) =>{
  return(
    <>
    <h1>{one.name.common}</h1>
    <p>capital {one.capital}</p>
    <img src={one.flags.png} alt="flag"/>
    <ul>
    {Object.values(one.languages).map((lang , index) =>(
      <li key={index}> {lang} </li>
    ))}
    </ul>
    </>
  )

}

const WeatherView = ({ data }) => {
  return (
    <div>
      <h2>Weather in {data.location.name}</h2>
      <p>Temperature: {data.current.temp_c}°C</p>
      <p>Condition: {data.current.condition.text}</p>
      <img src={data.current.condition.icon} alt="Weather icon" />
    </div>
  )
}


const CountriesList = ({filteredCountries , handleShow}) =>{
if (filteredCountries.length ==1){
  return(
    <>
    <CountryView one = {filteredCountries[0]} />
    </>
     )
}
  else if(filteredCountries.length < 10){
  return(
  <ul>
   {filteredCountries.map((state) => (
    <li key = {state.cca3}>
     {state.name.common}
     <button onClick = {() => handleShow(state)}>show</button>
    </li>
  ))}
 </ul>
)
  }else{
    return(
      <div>please specify your search</div>
    )
  }
}


function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [states, setStates] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null)
  
  const handleShow = (country) => {
    setSelectedCountry(country);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
    setSelectedCountry(null)
    setWeatherData(null);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredCountries = searchTerm
    ? states.filter((state) => state.name.common.toLowerCase().includes(searchTerm))
    : []

  useEffect (() =>{
    countriesService
    .get()
    .then (countriesList => setStates(countriesList))
  } ,[])

  useEffect (()=>{
  if(selectedCountry){
    const fetchWeather = async () =>{
      try{
        const response = await axios.get( `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${selectedCountry.capital}&aqi=no`)
        setWeatherData(response.data);
        console.log(response.data)
      }
      catch(error){
        console.error('Error fetching weather Data',error)
      }
    }
    fetchWeather()
  }
  },[selectedCountry])
  
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    } else {
      setSelectedCountry(null);
      setWeatherData(null); 
    }
  }, [filteredCountries]);

  if(!filteredCountries){
    return(
  <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
    )
  }
  else{
  return (
    <>
    <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
    {selectedCountry ? 
    <>
      <CountryView one={selectedCountry} />
      {weatherData && <WeatherView data={weatherData} />}
    </>
    :
    <CountriesList filteredCountries={filteredCountries} handleShow={handleShow} />
  }
    </>
  )
}
}

export default App
