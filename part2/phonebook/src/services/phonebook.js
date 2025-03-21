import axios from 'axios'
const phonebook = 'http://localhost:3001/api/persons'

const get = () => {
  const req = axios.get(phonebook)
  return req.then(response => response.data)
}

const getSpecific = (id) => {
const req = axios.get(`${phonebook}/${id}`)
return req.then(response => response.data)

}

const create = newPerson => {
  const req = axios.post(phonebook, newPerson)
  return req.then(response => response.data)
}

const deletePerson = id =>{
   const req = axios.delete(`${phonebook}/${id}`)
   return req.then (response => response.data)
}

const update = (id, updatedPerson) => {
  const req = axios.put(`${phonebook}/${id}`, updatedPerson)
  return req.then(response => response.data)

}

export default { get , create , update , deletePerson, getSpecific }