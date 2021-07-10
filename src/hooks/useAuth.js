import React from 'react'
import { AuthContext } from '../context'

function useAuth() {
  return React.useContext(AuthContext)
}

export default useAuth
