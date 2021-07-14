import { noop } from 'lodash-es'
import React from 'react'

const AuthContext = React.createContext({
  isAuth: false,
  attempt: noop,
  authUser: {},
})

export default AuthContext
