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

type Msg = UrlChanged of string list

let init() = { CurrentUrl = Router.currentUrl(); UserState = UserState.Guess }, Cmd.none

let update msg state =
    match msg with
    | UrlChanged segments -> { state with CurrentUrl = segments }, Cmd.none

open Components.PageLogin
open Components.PageRegister
let render state dispatch =
    let currentPage =
        match state.UserState with
        | Guess ->
            match state.CurrentUrl with
            | [ ]            -> PageGuestHome
            | [ "login" ]    -> PageLogin
            | [ "register" ] -> PageRegister
            | _ ->
                Html.h1 "Not found"
        | LoggedIn ->
            match state.CurrentUrl with
            | _ ->
                Html.h1 "Not found"

    React.router [
        router.onUrlChanged (UrlChanged >> dispatch)
        router.children currentPage
    ]
