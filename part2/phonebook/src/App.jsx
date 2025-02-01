/* eslint-disable react/prop-types */

import { useState ,useEffect } from "react";
import axios from 'axios'

const PersonForm = ({newName,handleValue,newNumber,addPerson}) =>{
return(
  <div>
  <form onSubmit={addPerson}>
  <label htmlFor="name" className="sr-only">Name:</label>
  <input 
    id="name" 
    name="name" 
    value={newName} 
    onChange={handleValue} 
    autoComplete="given-name" 
    placeholder="Enter name" 
  />

  <br />

  <label htmlFor="number" className="sr-only">Number:</label>
  <input 
    id="number" 
    name="number" 
    value={newNumber} 
    onChange={handleValue} 
    autoComplete="tel" 
    placeholder="Enter phone number" 
  />
          <button type="submit">Add</button>
          </form>
  </div>
)
}

const PersonList = ({filteredPersons}) =>{
  return(
  <ul>
  {filteredPersons.map((person) => (
    <PersonName person={person.name} key={person.name} number={person.number} />
  ))}
</ul>
  )
}

const PersonName = ({ person, number }) => {
  return <li>{person}, {number}</li>;
};

const SearchInput = ({searchTerm,handleSearch}) =>{
  return(
  <input 
        id="search" 
        type="text" 
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder="Search for a person..."
      />
  )
}


const App = () => {
  const [persons, setPersons] = useState([{}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleValue = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setNewName(value);
    } else if (name === "number") {
      setNewNumber(value);
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    
    // Check for duplicates (case insensitive)
    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = { name: newName, number: newNumber };
      setPersons([...persons, personObject]);
      setNewName("");  // Clear input fields
      setNewNumber("");
    }
  };

  // Filter persons based on searchTerm
  const filteredPersons = searchTerm
    ? persons.filter((person) => person.name.toLowerCase().includes(searchTerm))
    : persons
    
  useEffect ( () =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)
    })
  },[])
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
      <h3>Add a new</h3>
        <PersonForm
                newName={newName}
                newNumber={newNumber}
                addPerson={addPerson}
                handleValue={handleValue}
         />
      <h2>Numbers</h2>
      <PersonList filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
