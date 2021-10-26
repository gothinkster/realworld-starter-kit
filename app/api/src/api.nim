import prologue
import prologue/openapi
import prologue/middlewares/staticfile
import allographer/connection

import core/middleware
import core/views as coreViews
import ./users/views as usersViews


let
  env = loadPrologueEnv(".env")
  settings = newSettings(
    appName = env.getOrDefault("appName", "RealWorldApp"),
    debug = env.getOrDefault("debug", true),
    port = Port(env.getOrDefault("port", 8080)),
    secretKey = env.getOrDefault("secretKey", ""))


var app = newApp(settings = settings)
app.use(repositoryMiddleware())
app.use(jwtMiddleware(env.get("secretKey"), @["/api/users", "/api/users/login"]))
app.use(staticFileMiddleware(env.get("staticDir")))

app.serveDocs("schema/swagger.json")

app.registerErrorHandler(Http401, coreViews.go401View)
app.registerErrorHandler(Http404, coreViews.go404View)
app.registerErrorHandler(Http422, coreViews.go422View)

app.addRoute("/api/users", usersViews.registerView, @[HttpPost])
app.addRoute("/api/users/login", usersViews.loginView, @[HttpPost])
app.addRoute("/api/user", usersViews.getUserView, @[HttpGet])

app.run(RepositoryContext)
