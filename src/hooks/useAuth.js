import React from 'react'
import { AuthContext } from '../providers/AuthProvider'

function useAuth() {
  return React.useContext(AuthContext)
}

export default useAuth
