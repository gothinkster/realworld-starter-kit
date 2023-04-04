[<RequireQualifiedAccess>]
module Conduit

open Elmish
open Feliz.Router
open Components
open Models

[<RequireQualifiedAccess>]
type Page =
    | Home
    | Login of PageLogin.State
    | Register of PageRegister.State
    | NewArticle of PageNewArticle.State
    | NotFound

[<RequireQualifiedAccess>]
type Url =
    | Home
    | Login
    | Register
    | NewArticle
    | NotFound

let parseUrl = function
    | [  ] -> Url.Home
    | [ "login" ] -> Url.Login
    | [ "register" ] -> Url.Register
    | [ "editor" ] -> Url.NewArticle
    | _ -> Url.NotFound

type State =
  { CurrentPage : Page
    CurrentUrl  : Url
    User : ApplicationUser }

type Msg =
    | LoginMsg of PageLogin.Msg
    | RegisterMsg of PageRegister.Msg
    | NewArticleMsg of PageNewArticle.Msg
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

    | Url.Register ->
        let registerState, registerCmd = PageRegister.init()
        let nextPage = Page.Register registerState
        { defaultState with CurrentPage = nextPage }, Cmd.map RegisterMsg registerCmd

    | Url.NewArticle ->
        let newArticleState, newArticleCmd = PageNewArticle.init()
        let nextPage = Page.NewArticle newArticleState
        { defaultState with CurrentPage = nextPage }, Cmd.map NewArticleMsg newArticleCmd

    | Url.NotFound ->
        { defaultState with CurrentPage = Page.NotFound }, Cmd.none


let update (msg: Msg) (state: State) =
    match msg, state.CurrentPage with
    | LoginMsg loginMsg, Page.Login loginState ->
        match loginMsg with
        | PageLogin.UserLoggedIn user ->
            { state with User = LoggedUser user }, Cmd.navigate("/")

        | loginMsg ->
            let loginState, loginCmd = PageLogin.update loginMsg loginState
            { state with CurrentPage = Page.Login loginState }, Cmd.map LoginMsg loginCmd

    | RegisterMsg registerMsg, Page.Register registerState ->
        match registerMsg with
        | PageRegister.UserRegister user ->
            { state with User = LoggedUser user }, Cmd.navigate("/")

        | registerMsg ->
            let registerState, registerCmd = PageRegister.update registerMsg registerState
            { state with CurrentPage = Page.Register registerState }, Cmd.map RegisterMsg registerCmd

    | NewArticleMsg newArticleMsg, Page.NewArticle newArticleState -> //TODO: this is just placeholder, need to implement submit new article
        match newArticleMsg with
        | newArticleMsg ->
            let newArticleState, newArticleCmd = PageNewArticle.update newArticleMsg newArticleState
            { state with CurrentPage = Page.NewArticle newArticleState }, Cmd.map NewArticleMsg newArticleCmd

    | UrlChanged nextUrl, _ ->
        let show page = { state with CurrentPage = page; CurrentUrl = nextUrl }
        match nextUrl with
        | Url.Home -> show Page.Home, Cmd.none
        | Url.NotFound -> show Page.NotFound, Cmd.none
        | Url.Login ->
            let login, loginCmd = PageLogin.init()
            show (Page.Login login), Cmd.map LoginMsg loginCmd

        | Url.Register ->
            let register, registerCmd = PageRegister.init()
            show (Page.Register register), Cmd.map RegisterMsg registerCmd

        | Url.NewArticle ->
            let newArticle, newArticleMsg = PageNewArticle.init()
            show (Page.NewArticle newArticle), Cmd.map NewArticleMsg newArticleMsg

    | _, _ ->
        state, Cmd.none

open Feliz
let RenderConduit (state :State) (dispatch: Msg -> Unit) =
    let activePage =
        match state.CurrentPage with
        | Page.Login login -> PageLogin.RenderLoginPage login (LoginMsg >> dispatch)
        | Page.Register register -> PageRegister.RenderRegistrationPage register (RegisterMsg >> dispatch)
        | Page.Home -> PageHome.RenderHome state.User
        | Page.NewArticle newArticle -> PageNewArticle.RenderNewArticlePage newArticle state.User (NewArticleMsg >> dispatch)
        | Page.NotFound -> Html.h1 "Not Found"

    React.router [
        router.onUrlChanged (parseUrl >> UrlChanged >> dispatch)
        router.children activePage
    ]
