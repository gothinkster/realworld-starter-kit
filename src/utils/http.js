import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
})

instance.interceptors.request.use((config) => {
  const jwt = window.localStorage.getItem('jwtToken')

  if (!jwt) return config

  const { token } = JSON.parse(atob(jwt))

  if (token) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
})

export default instance
