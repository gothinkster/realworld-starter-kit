import axios from 'axios'

const API_ROOT = 'localhost'
const TIMEOUT = 2500
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class ApiService {
  constructor({baseURL = API_ROOT, timeout = TIMEOUT, headers = HEADERS, authToken = null}) {
    const client = axios.create({
      baseURL,
      timeout,
      headers
    })
    this.token = authToken
    client.interceptors.response.use(this.handleSuccess, this.handleError)
    this.client = client
  }

  handleSuccess = (response) => {
    return response
  }

  handleError = (error) => {
    return Promise.reject(error)
  }

}

export default ApiService
