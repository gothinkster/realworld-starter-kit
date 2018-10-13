package app

import (
	"database/sql"
	"github.com/klim0v/golang-revel-realworld-starter-kit/app/models"
	rgorp "github.com/revel/modules/orm/gorp/app"
	_ "github.com/revel/modules/static"
	"github.com/revel/revel"
	"gopkg.in/gorp.v2"
)

var (
	// AppVersion revel app version (ldflags)
	AppVersion string

	// BuildTime revel app build-time (ldflags)
	BuildTime string

	Dbm *gorp.DbMap
)

func InitDB() {
	db, err := sql.Open("mysql", revel.Config.StringDefault("db.connection", ""))
	if err != nil {
		panic(err)
	}
	Dbm = &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{Engine: "InnoDB", Encoding: "UTF8"}}

	t := Dbm.AddTable(models.User{}).SetKeys(true, "ID")
	t.ColMap("Password").Transient = true
	t.ColMap("Username").SetUnique(true)
	t.ColMap("Email").SetUnique(true)

	t = Dbm.AddTable(models.Comment{}).SetKeys(true, "ID")
	t.ColMap("User").Transient = true
	t.ColMap("Article").Transient = true

	t = Dbm.AddTable(models.Article{}).SetKeys(true, "ID")
	t.ColMap("User").Transient = true
	t.ColMap("Slug").SetUnique(true)

	t = Dbm.AddTable(models.Favorite{}).SetKeys(true, "ID")
	t.ColMap("User").Transient = true
	t.ColMap("Article").Transient = true

	t = Dbm.AddTable(models.Tag{}).SetKeys(true, "ID")
	t.ColMap("Name").SetUnique(true)

	rgorp.Db.TraceOn(revel.AppLog)
	Dbm.CreateTables()
	Dbm.CreateIndex()

	err = Dbm.Db.Ping()
	if err != nil {
		panic(err)
	}
}

func init() {
	// Filters is the default set of global filters.
	revel.Filters = []revel.Filter{
		revel.PanicFilter,             // Recover from panics and display an error page instead.
		revel.RouterFilter,            // Use the routing table to select the right Action
		revel.FilterConfiguringFilter, // A hook for adding or removing per-Action filters.
		revel.ParamsFilter,            // Parse parameters into Controller.Params.
		revel.SessionFilter,           // Restore and write the session cookie.
		revel.FlashFilter,             // Restore and write the flash cookie.
		revel.ValidationFilter,        // Restore kept validation errors and save new ones from cookie.
		revel.I18nFilter,              // Resolve the requested language
		HeaderFilter,                  // Add some security based headers
		revel.InterceptorFilter,       // Run interceptors around the action.
		revel.CompressFilter,          // Compress the result.
		revel.BeforeAfterFilter,       // Call the before and after filter functions
		revel.ActionInvoker,           // Invoke the action.
	}

	// Register startup functions with OnAppStart
	// revel.DevMode and revel.RunMode only work inside of OnAppStart. See Example Startup Script
	// ( order dependent )
	// revel.OnAppStart(ExampleStartupScript)
	revel.OnAppStart(InitDB)
	// revel.OnAppStart(FillCache)
}

// HeaderFilter adds common security headers
// There is a full implementation of a CSRF filter in
// https://github.com/revel/modules/tree/master/csrf
var HeaderFilter = func(c *revel.Controller, fc []revel.Filter) {
	c.Response.Out.Header().Add("X-Frame-Options", "SAMEORIGIN")
	c.Response.Out.Header().Add("X-XSS-Protection", "1; mode=block")
	c.Response.Out.Header().Add("X-Content-Type-Options", "nosniff")
	c.Response.Out.Header().Add("Referrer-Policy", "strict-origin-when-cross-origin")

	fc[0](c, fc[1:]) // Execute the next filter stage.
}

//func ExampleStartupScript() {
//	// revel.DevMod and revel.RunMode work here
//	// Use this script to check for dev mode and set dev/prod startup scripts here!
//	if revel.DevMode == true {
//		// Dev mode
//	}
//}
