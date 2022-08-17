[<RequireQualifiedAccess>]
module Conduit

open Shared
type ApplicationUser =
    | Anonymous
    | LoggedIn of User

open Components
[<RequireQualifiedAccess>]
type Page =
    | Home
    | Login of PageLogin.State
    | Register
    | NotFound

[<RequireQualifiedAccess>]
type Url =
    | Home
    | Login
    | Register
    | NotFound

let parseUrl = function
    | [  ] -> Url.Home
    | [ "login" ] -> Url.Login
    | [ "register" ] -> Url.Register
    | _ -> Url.NotFound

type State =
  { CurrentPage : Page
    CurrentUrl  : Url
    User : ApplicationUser }

type Msg =
    | LoginMsg of PageLogin.Msg
    | UrlChanged of Url

let index (state: State) (dispatch: Msg -> unit) =
    match state.User with
    | Anonymous -> PageHome.PageHome
    | LoggedIn user -> PageLoggedInHome.PageLoggedInHome user

open Elmish
open Feliz.Router
let init() =
    let initialUrl = parseUrl (Router.currentUrl())
    let defaultState =
        { User = Anonymous
          CurrentUrl = initialUrl
          CurrentPage = Page.Home }

    match initialUrl with
    | Url.Home ->
        defaultState, Cmd.none

    | Url.Login ->
        let loginState, loginCmd = PageLogin.init()
        let nextPage = Page.Login loginState
        { defaultState with CurrentPage = nextPage }, Cmd.map LoginMsg loginCmd

    | Url.Register -> { defaultState with CurrentPage = Page.Register }, Cmd.none

    | Url.NotFound ->
        { defaultState with CurrentPage = Page.NotFound }, Cmd.none


let update (msg: Msg) (state: State) =
    match msg, state.CurrentPage with
    | LoginMsg loginMsg, Page.Login loginState ->
        match loginMsg with
        | PageLogin.UserLoggedIn user ->
            { state with User = LoggedIn user }, Cmd.navigate("/")

        | loginMsg ->
            let loginState, loginCmd = PageLogin.update loginMsg loginState
            { state with CurrentPage = Page.Login loginState }, Cmd.map LoginMsg loginCmd


    | UrlChanged nextUrl, _ ->
        let show page = { state with CurrentPage = page; CurrentUrl = nextUrl }

        match nextUrl with
        | Url.Home -> show Page.Home, Cmd.none
        | Url.NotFound -> show Page.NotFound, Cmd.none
        | Url.Login ->
            let login, loginCmd = PageLogin.init()
            show (Page.Login login), Cmd.map LoginMsg loginCmd
        | Url.Register -> show (Page.Register), Cmd.none

    | _, _ ->
        state, Cmd.none

open Feliz
let render (state :State) (dispatch: Msg -> Unit) =
    let activePage =
        match state.CurrentPage with
        | Page.Login login -> PageLogin.render login (LoginMsg >> dispatch)
        | Page.Register -> PageRegister.render
        | Page.Home -> index state dispatch
        | Page.NotFound -> Html.h1 "Not Found"

    React.router [
        router.onUrlChanged (parseUrl >> UrlChanged >> dispatch)
        router.children activePage
    ]
