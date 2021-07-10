import React from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmpty, isEqual } from 'lodash-es'
import { getAuthUser } from '../utils'
import { useInterval } from '../hooks'
import { AuthContext } from '../context'

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = React.useState(false)
  const [authUser, setAuthUser] = React.useState({})
  const navigate = useNavigate()

  function checkAuth() {
    const user = getAuthUser()
    const userUpdated = !isEqual(user, authUser)

    if ((user && isEmpty(authUser) && !isAuth) || userUpdated) {
      setAuthUser(user)
      setIsAuth(true)
    } else if (!user && !isEmpty(authUser) && isAuth) {
      setAuthUser(null)
      setIsAuth(false)
    }
  }

  function attempt(callback) {
    if (isAuth) {
      callback()
    } else {
      navigate('/login')
    }
  }

  useInterval(() => {
    checkAuth()
  }, 1000)

  return <AuthContext.Provider value={{ isAuth, attempt, authUser }}>{children}</AuthContext.Provider>
}

export default AuthProvider
