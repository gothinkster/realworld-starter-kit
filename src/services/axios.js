import axios from 'axios'

const API_ROOT = 'localhost'
const TIMEOUT = 2500
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class ApiService {
  constructor(baseURL = API_ROOT, timeout = TIMEOUT, headers = HEADERS, authToken) {
    const client = axios.create({baseURL, timeout, headers})
    client.interceptors.response.use(this.handleSuccess, this.handleError)
    this.client = client
    this.token = this.setAuth(authToken)
  }

  handleSuccess = (response) => {
    return response
  }

  handleError = (error) => {
    return Promise.reject(error)
  }

  getAuth () {
    return this.token
  }

  setAuth (token) {
    if (token) {
      this.token = token
      this.client.defaults.headers.common.Authorization = `Token ${this.token}`
    } else {
      delete this.client.defaults.headers.common.Authorization
    }
  }

  get(path) {
    return this.client.get(path).then(response => response)
  }

  post(path, payload) {
    return this.client.post(path, payload).then(response => response)
  }

  put(path, payload) {
    return this.client.put(path, payload).then(response => response)
  }

  patch(path, payload) {
    return this.client.patch(path, payload).then(response => response.data)
  }

  delete(path) {
    return this.client.delete(path).then(response => response.data)
  }
}

export default ApiService
