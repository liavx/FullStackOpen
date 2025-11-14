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

export default { get,getSpecific }