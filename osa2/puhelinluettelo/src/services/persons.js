import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getNumbers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const createNumber = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  const deleteNumber = (id) => {
    axios.delete(`${baseUrl}/${id}`)
  }

  const updateNumber = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  

 export default {getNumbers, createNumber, deleteNumber, updateNumber}