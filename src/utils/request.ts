import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_BASE_URL
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt-token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  ({ data }) => data,
  ({ message, response }) => Promise.reject(response ? response.data : message)
)

export default instance
