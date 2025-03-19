import axios from 'axios'
const countries = 'https://studies.cs.helsinki.fi/restcountries/api/all/'

const get = () => {
  const req = axios.get(countries)
  return req.then(response => response.data)
}

const getSpecific = (id) => {
const req = axios.get(`${countries}/${id}`)
return req.then(response => response.data)

}

const create = newPerson => {
  const req = axios.post(countries, newPerson)
  return req.then(response => response.data)
}

const deletePerson = id =>{
   const req = axios.delete(`${countries}/${id}`)
   return req.then (response => response.data)
}

const update = (id, updatedPerson) => {
  const req = axios.put(`${countries}/${id}`, updatedPerson)
  return req.then(response => response.data)

}

export default { get , create , update , deletePerson, getSpecific }