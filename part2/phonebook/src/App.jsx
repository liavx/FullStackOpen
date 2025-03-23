/* eslint-disable react/prop-types */

import { useState ,useEffect } from "react"
import phoneService from './services/phonebook.js'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}


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

const PersonList = ({filteredPersons , deletePerson}) =>{
  return(
  <ul>
  {filteredPersons.map((person) => (
    <li key = {person.id}>
   {person.name} , {person.number} <button onClick={() => deletePerson(person.id,person.name)}>delete</button>
    </li>
  ))}
</ul>
  )
}


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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [Message, setMessage] = useState('')

  const setNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleValue = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setNewName(value);
    } else if (name === "number") {
      setNewNumber(value);
    }
  }



  const filteredPersons = searchTerm
    ? persons.filter((person) => person.name.toLowerCase().includes(searchTerm))
    : persons

  useEffect (() =>{
  phoneService
  .get()
  .then(personList => setPersons(personList))},[])

  const updatePerson = (id,personObject) => {
  phoneService
        .update(id,personObject)
        .then(personObject => {
          setPersons(persons.map(person => person.id === id ? personObject : person))
          setNotification(` ${newName} updated`)
          
        })
        .catch(error => {
          console.error(`Error updating ${newName}:`, error)
          setNotification(`Failed to update ${newName}. It may have been removed from the server.`)
          setPersons(persons.filter(person => person.id !== id))})
          setNewName("");
          setNewNumber("");

        }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if (existingPerson) {
      if(window.confirm(`${newName} is already added to the phonebook, would you like to change the number?`)){
        updatePerson(existingPerson.id,personObject)
      }else{
        alert("operation aborted")
      }
    } else {
      phoneService
      .create(personObject)
      .then(personObject =>{
      setPersons(persons => [...persons, personObject])
      setNotification(`${newName} sucssesfully added to server.`)
      }).catch( (error) => { 
        console.log(error.response.data.error)
        setNotification("Person name can't be less than 3 words");
      }
    )
    }
    setNewName("")
    setNewNumber("")
  }
  const deletePerson = (id,name) => {
    if(window.confirm(`Are you sure you wanna delete ${name}?`))
    {
    phoneService
    .deletePerson(id)
    .then(personObject =>{
      console.log(personObject, "was deleted from server")
      setNotification(`${name}. was removed from server.`)
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
    })}
    else{
      console.log("deletion aborted")
    }

  }


  return (
    <div>
      <Notification message = {Message} />
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
      <PersonList filteredPersons={filteredPersons} deletePerson = {deletePerson} />
    </div>
  )
}

export default App
