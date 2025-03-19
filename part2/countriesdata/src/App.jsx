/* eslint-disable react/prop-types */
import { useState , useEffect} from 'react'
import countriesService from './services/countriesdata.js'

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

  const handleShow = (country) => {
    setSelectedCountry(country);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
    setSelectedCountry(null)
  }

  const filteredCountries = searchTerm
    ? states.filter((state) => state.name.common.toLowerCase().includes(searchTerm))
    : []

  useEffect (() =>{
    countriesService
    .get()
    .then (countriesList => setStates(countriesList))
  } ,[])



  if(!filteredCountries){
    return(
  <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
    )
  }
  else{
  return (
    <>
    <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
    {selectedCountry? 
    <CountryView one = {selectedCountry}/>
    :
    <CountriesList filteredCountries={filteredCountries} handleShow = {handleShow}/>
  }
    </>
  )
}
}

export default App
