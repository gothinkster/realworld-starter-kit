import axios from 'axios'

export default axios.create({
  baseURL: 'https://conduit.productionready.io/api',
})
