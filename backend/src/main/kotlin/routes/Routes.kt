package com.hexagonkt.realworld.routes

import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.rest.cors

internal val router: Router = Router {
    cors()
    path("/users", usersRouter)
    path("/user", userRouter)
    path("/profiles/{username}", profilesRouter)
    path("/articles", articlesRouter)
    path("/tags", tagsRouter)
}

internal fun Router.authenticate(jwt: Jwt) {
    before("/") { parsePrincipal(jwt) }
    before("/*") { parsePrincipal(jwt) }
}

private fun Call.parsePrincipal(jwt: Jwt) {
    val token = request.headers["Authorization"]?.firstOrNull() ?: halt(401, "Unauthorized")
    val principal = jwt.verify(token.removePrefix("Token").trim())
    attributes["principal"] = principal
}
