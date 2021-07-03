import React from 'react'
import { authUser } from '../utils'
import { useInterval } from '../hooks'

export const AuthContext = React.createContext(null)

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = React.useState(false)

  useInterval(() => {
    const user = authUser()

    if (user && !isAuth) {
      setIsAuth(true)
    }

    if (!user && isAuth) {
      setIsAuth(false)
    }
  }, 1000)

  return <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
}

export default AuthProvider
