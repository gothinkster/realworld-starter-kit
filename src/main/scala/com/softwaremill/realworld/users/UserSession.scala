package com.softwaremill.realworld.users

import java.time.{Duration, Instant}

case class UserSession(id: Int, lastUsed: Instant)

case class UserSessionRow(userId: Int, token: String, lastUsed: Instant)
