import * as path from 'path'

function readEnvs() {
  const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY ?? 'TOKEN_PRIVATE_KEY'
  const AUDIENCE = process.env.AUDIENCE ?? 'RealWorldApp'
  const API_PREFIX = process.env.API_PREFIX ?? 'api'
  const API_PORT = Number(process.env.API_PORT ?? '3000')
  const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
  const BASE_API_URL = path.join(BASE_URL, API_PREFIX)
  return {
    TOKEN_PRIVATE_KEY,
    AUDIENCE,
    API_PREFIX,
    API_PORT,
    BASE_URL,
    BASE_API_URL,
  }
}

let envs: ReturnType<typeof readEnvs>

export function getEnvs() {
  if (!envs) {
    envs = readEnvs()
  }
  return envs
}
