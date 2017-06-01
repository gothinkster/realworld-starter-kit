package com.omis.client.RootModels

import com.omis.User

case class UserRootModel(user: User, isLoggedIn: Boolean = false)
