[<RequireQualifiedAccess>]
module Conduit

open Components
open Elmish
open Feliz
open Feliz.Router
[<RequireQualifiedAccess>]
type Page =
    | Home
    | Login of PageLogin.State
    | NotFound

[<RequireQualifiedAccess>]
type Url =
    | Home
    | Login
    | NotFound

let parseUrl = function
    | [  ] -> Url.Home
    | [ "login" ] -> Url.Login
    | _ -> Url.NotFound

type ApplicationUser =
    | Anonymous
    | LoggedIn of Api.User

type State =
  { CurrentPage : Page
    CurrentUrl  : Url
    User : ApplicationUser }

type Msg =
    | LoginMsg of PageLogin.Msg
    | UrlChanged of Url


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

    | Url.NotFound ->
        { defaultState with CurrentPage = Page.NotFound }, Cmd.none


let update (msg: Msg) (state: State) =
    match msg, state.CurrentPage with
    | LoginMsg loginMsg, Page.Login loginState ->
        match loginMsg with
        | PageLogin.UserLoggedIn user ->
            { state with User = LoggedIn user }, Router.navigate("/")

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

    | _, _ ->
        state, Cmd.none

open Components.PageGuestHome
let render (state :State) (dispatch: Msg -> Unit) =
    let activePage =
        match state.CurrentPage with
        | Page.Login login -> PageLogin.render login (LoginMsg >> dispatch)
        | Page.Home -> PageGuestHome
        | Page.NotFound -> Html.h1 "Not Found"

    Router.router [

    ]
