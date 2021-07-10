export default () => {
  const jwt = window.localStorage.getItem('jwtToken')

  if (!jwt) return null

  return JSON.parse(atob(jwt))
}
