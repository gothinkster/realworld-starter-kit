package com.softwaremill.realworld.users

import java.time.Instant

case class User(
    email: String,
    token: String,
    username: String,
    bio: String,
    image: String
)

case class UserRow(
    userId: Int,
    email: String,
    username: String,
    bio: String,
    image: String
)
