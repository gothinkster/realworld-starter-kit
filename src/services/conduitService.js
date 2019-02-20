import ApiService from './axios'

const CONDUIT_ROOT = 'https://conduit.productionready.io/api'
const ConduitService = new ApiService(baseUrl= CONDUIT_ROOT)
export default ConduitService
