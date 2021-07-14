import axios from 'axios'
import getAuthUser from './get-auth-user'

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
})

instance.interceptors.request.use((config) => {
  const user = getAuthUser()

  if (user) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Token ${user.token}`
  }

  return config
})

export default instance
