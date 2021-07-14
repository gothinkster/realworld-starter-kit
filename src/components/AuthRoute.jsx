import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../hooks'

function AuthRoute(props) {
  const { isAuth } = useAuth()

  if (!isAuth) return <Navigate to="/" />

  return <Route {...props} />
}

export default AuthRoute
