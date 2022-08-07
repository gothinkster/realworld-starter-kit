module Conduit

open Components
open Components.LayoutGuess
open Components.LayoutLoggedIn

open Components.PageGuestHome
open Elmish
open Feliz
open Feliz.Router

type UserState =
    | Guess
    | LoggedIn

type State = {
    CurrentUrl : string list
    UserState : UserState
}

type Message =
    | UrlChanged of string list
    | Login of PageLogin.Msg


let init() = { CurrentUrl = Router.currentUrl(); UserState = UserState.Guess }, Cmd.none

let update msg state =
    match msg with
    | UrlChanged segments -> { state with CurrentUrl = segments }, Cmd.none
    | Login msg -> { state with UserState = UserState.LoggedIn }, Cmd.none

open Components.PageLogin
open Components.PageRegister
let render state (dispatch: Message -> Unit) =
    let currentPage =
        match state.UserState with
        | Guess ->
            match state.CurrentUrl with
            | [ ]            -> PageGuestHome
            | [ "login" ]    -> PageLogin Message.Login
            | [ "register" ] -> PageRegister
            | _              ->
                Html.h1 "Not found"
        | LoggedIn ->
            match state.CurrentUrl with
            | [] -> PageGuestHome
            | _  ->
                Html.h1 "Not found"

    React.router [
        router.onUrlChanged (UrlChanged >> dispatch)
        router.children currentPage
    ]
