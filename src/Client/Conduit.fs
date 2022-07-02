module Conduit

open Components.NonLoginLayout
open Components.LoginForm
open Elmish
open Feliz
open Feliz.Router

type State = {
    CurrentUrl : string list
}

type Msg = UrlChanged of string list

let init() = { CurrentUrl = Router.currentUrl() }, Cmd.none

let update msg state = match msg with UrlChanged segments -> { state with CurrentUrl = segments }, Cmd.none

let render state dispatch =
    let currentPage =
        match state.CurrentUrl with
        // view home
        | [ ] ->
            Html.div [
                prop.className "container"
                prop.children [
                    NonLoginLayout ""
                ]
            ]
        // view login
        | [ "login" ] ->
            Html.div [
                prop.className "container"
                prop.children [
                    NonLoginLayout "login"
                    LoginForm
                ]
            ]

        | _ ->
            Html.h1 "Not found"

    React.router [
        router.onUrlChanged (UrlChanged >> dispatch)
        router.children currentPage
    ]
