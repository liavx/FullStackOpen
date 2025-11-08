import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const cfg = () => ({ headers: { Authorization: token } })

const like = async (id) => (await axios.post(`${baseUrl}/${id}/like`, {}, cfg())).data
const unlike = async (id) => (await axios.delete(`${baseUrl}/${id}/like`, cfg())).data
const deleteOne = async (id) => (await axios.delete(`${baseUrl}/${id}`, cfg())).data



const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll , setToken , create , update , like , unlike,deleteOne }