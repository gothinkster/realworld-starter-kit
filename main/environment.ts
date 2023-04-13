function readEnvs() {
  const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY ?? 'TOKEN_PRIVATE_KEY'
  const AUDIENCE = process.env.AUDIENCE ?? 'RealWorldApp'
  const API_PREFIX = process.env.API_PREFIX ?? 'api'
  const API_PORT = Number(process.env.API_PORT ?? '3000')
  const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
  const BASE_API_URL = `${BASE_URL.replace(/\/$/, '')}/${API_PREFIX.replace(
    /^\//,
    '',
  )}`
  const VERSION = process.env.VERSION ?? '0.0.0'
  return {
    TOKEN_PRIVATE_KEY,
    AUDIENCE,
    API_PREFIX,
    API_PORT,
    BASE_URL,
    BASE_API_URL,
    VERSION,
  }
}

let envs: ReturnType<typeof readEnvs>

export function getEnvs() {
  if (!envs) {
    envs = readEnvs()
  }
  return envs
}
