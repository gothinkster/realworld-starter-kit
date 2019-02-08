import ApiService from './axios'

const API_ROOT = 'https://conduit.productionready.io/api'
const ConduitService = new ApiService({baseUrl: API_ROOT})
export default ConduitService
