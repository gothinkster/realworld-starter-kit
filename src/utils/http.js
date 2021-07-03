import axios from 'axios'
import authUser from './auth-user'

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
})

instance.interceptors.request.use((config) => {
  const user = authUser()

  if (user) {
    config.headers.Authorization = `Token ${user.token}`
  }

  return config
})

export default instance
