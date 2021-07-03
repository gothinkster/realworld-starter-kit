import React from 'react'
import { AuthContext } from '../providers/AuthProvider'

const useAuth = () => React.useContext(AuthContext)

export default useAuth
