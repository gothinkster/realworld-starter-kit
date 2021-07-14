export default (newUser) => {
  const jwt = window.localStorage.getItem('jwtToken')

  const user = jwt ? JSON.parse(atob(jwt)) : {}

  window.localStorage.setItem('jwtToken', btoa(JSON.stringify({ ...user, ...newUser })))
}
