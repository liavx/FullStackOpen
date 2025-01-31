/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from 'react'

const PersonName = ({person}) => {
  return (
    <li>{person}</li>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('please add a person')
  const handleValue = (event) => {
    setNewName(event.target.value)
  }
  const addPerson = (event) =>{
    event.preventDefault()
    if(persons.some (person => person.name == newName)){
    alert(`${newName} is already added to phonebook`)
    }else {
    const personObject = { name : newName}
    setPersons(persons.concat(personObject))
    }
    setNewName('please add a person')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange = {handleValue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map (person =>
        <PersonName person ={person.name} key={person.name} />
        )
        }
      </ul>
    </div>
  )
}

export default App