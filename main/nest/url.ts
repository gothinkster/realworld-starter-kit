import { getEnvs } from '../environment'

export function buildUrlToPath(
  path: string,
  ...paramsArray: Record<string, string | number>[]
): string {
  const { BASE_API_URL } = getEnvs()

  path = path.replace(/^\//, '').replace(/\/$/, '')
  const url = new URL(`${BASE_API_URL}/${path}`)

  paramsArray.forEach((params) => {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }
  })

  return url.toString()
}
