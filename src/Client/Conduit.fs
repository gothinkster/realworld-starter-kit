module Conduit

open Components
open Components.NonLoginLayout
open Components.LoginForm
open Components.RegisterForm
open Components.GuestHome
open Elmish
open Feliz
open Feliz.Bulma.ElementBuilders
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
                prop.className "home-page"
                prop.children [
                    NonLoginLayout ""
                    GuestHome
                ]
            ]
        // view login
        | [ "login" ] ->
            Html.div [
                prop.className "home-page"
                prop.children [
                    NonLoginLayout "login"
                    LoginForm
                ]
            ]

        // view register
        | [ "register" ] ->
            Html.div [
                prop.className "home-page"
                prop.children [
                    NonLoginLayout "register"
                    RegisterForm
                ]
            ]

        | _ ->
            Html.h1 "Not found"

    React.router [
        router.onUrlChanged (UrlChanged >> dispatch)
        router.children currentPage
    ]
