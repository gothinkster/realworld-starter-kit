import React from 'react'
import { useNavigate } from 'react-router-dom'
import { noop } from 'lodash-es'
import { authUser } from '../utils'
import { useInterval } from '../hooks'

export const AuthContext = React.createContext({
  isAuth: false,
  attempt: noop,
})

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = React.useState(false)
  const navigate = useNavigate()

  function attempt(callback) {
    if (isAuth) {
      callback()
    } else {
      navigate('/login')
    }
  }

  useInterval(() => {
    const user = authUser()

    if (user && !isAuth) {
      setIsAuth(true)
    }

    if (!user && isAuth) {
      setIsAuth(false)
    }
  }, 1000)

  return <AuthContext.Provider value={{ isAuth, attempt }}>{children}</AuthContext.Provider>
}

export default AuthProvider
