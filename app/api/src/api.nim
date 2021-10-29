import prologue
import prologue/openapi
import prologue/middlewares/staticfile

import core/[middleware, events]
import core/views as coreViews
import ./users/views as usersViews


let
  env = loadPrologueEnv(".env")
  settings = newSettings(
    appName = env.getOrDefault("appName", "RealWorldApp"),
    debug = env.getOrDefault("debug", true),
    port = Port(env.getOrDefault("port", 8080)),
    secretKey = env.getOrDefault("secretKey", ""))
  logEvent = initEvent(setLoggingLevel)
  createTablesEvent = initEvent(createDatabaseTables)


echo env
var app = newApp(settings = settings, startup = @[logEvent, createTablesEvent])
app.use(jwtMiddleware(env.get("secretKey"), @["/api/users", "/api/users/login"]))
app.use(staticFileMiddleware(env.get("staticDir")))
app.use(dbMiddleware())

app.serveDocs("schema/swagger.json")

app.registerErrorHandler(Http401, coreViews.go401View)
app.registerErrorHandler(Http404, coreViews.go404View)
app.registerErrorHandler(Http422, coreViews.go422View)

app.addRoute("/api/users", usersViews.registerView, @[HttpPost])
app.addRoute("/api/users/login", usersViews.loginView, @[HttpPost])
app.addRoute("/api/user", usersViews.getUserView, @[HttpGet])
app.addRoute("/api/user", usersViews.editUserView, @[HttpPut])

app.run(DbContext)
