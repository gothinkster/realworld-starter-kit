const service = axios.create({ timeout: 10000 })

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt-token')

    if (token) config.headers['Authorization'] = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject('error')
    }
  }
)

export default service
