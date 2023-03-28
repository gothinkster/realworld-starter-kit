import { GLOBAL_PREFIX } from '../global/constants'

export function buildUrlToPath(
  req,
  path: string,
  ...paramsArray: Record<string, string | number>[]
): string {
  path = path.replace(/^\//, '').replace(/\/$/, '')
  let url = `${req.protocol}://${req.get('host')}` + `/${GLOBAL_PREFIX}/${path}`

  const query = new URLSearchParams()
  paramsArray.forEach((params) => {
    for (const [key, value] of Object.entries(params)) {
      query.set(key, String(value))
    }
  })
  const queryString = query.toString()

  if (queryString) {
    url += `?${queryString}`
  }

  return url
}
