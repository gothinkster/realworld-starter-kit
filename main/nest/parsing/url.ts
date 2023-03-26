import { GLOBAL_PREFIX } from '../../constants'

export function buildUrl(
  req,
  path: string,
  ...paramsArray: { [key: string]: string }[]
): string {
  path = path.replace(/^\//, '').replace(/\/$/, '')
  let url = `${req.protocol}://${req.get('host')}` + `/${GLOBAL_PREFIX}/${path}`
  const query = new URLSearchParams()

  paramsArray.forEach((params) => {
    for (let key of Object.keys(params)) {
      if (params[key]) {
        query.set(key, params[key])
      }
    }
  })

  const queryString = query.toString()
  if (queryString) {
    url += `?${queryString}`
  }

  return url
}
