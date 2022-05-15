module Index

open ClientComponents
open Elmish
open Feliz
open Feliz.Router
type State = { CurrentUrl : string list }

type Msg =
    | UrlChanged of string list
    | NavigateToUsers
    | NavigateToUser of int

let init() = { CurrentUrl = Router.currentUrl() }, Cmd.none

let update msg state =
    match msg with
    | UrlChanged segments -> { state with CurrentUrl = segments }, Cmd.none
    // notice here the use of the command Cmd.navigate
    | NavigateToUsers -> state, Cmd.navigate("users")
    // Router.navigate with query string parameters
    | NavigateToUser userId -> state, Cmd.navigate("users", [ "id", userId ])

open ClientComponents.NonLoginLayout
open ClientComponents.LoginForm

let render state dispatch =

    let currentPage =
        match state.CurrentUrl with
        | [ ] ->
            Html.div [
                prop.className "container"
                prop.children [
                    NonLoginLayout ""
                ]
            ]

        | [ "felizrouter" ] ->
            Html.div [
                Html.h1 "Home"
                Html.button [
                    prop.text "Navigate to users"
                    prop.onClick (fun _ -> dispatch NavigateToUsers)
                ]
                Html.a [
                    prop.href (Router.format("users"))
                    prop.text "Users link"
                ]
                Html.a [
                    prop.href (Router.format("login"))
                    prop.text " Conduit Login "
                ]
            ]
        | [ "users" ] ->
            Html.div [
                Html.h1 "Users page"
                Html.button [
                    prop.text "Navigate to User(10)"
                    prop.onClick (fun _ -> dispatch (NavigateToUser 10))
                ]
                Html.a [
                    prop.href (Router.format("users", ["id", 10]))
                    prop.text "Single User link"
                ]
            ]

        | [ "users"; Route.Query [ "id", Route.Int userId ] ] ->
            Html.h1 (sprintf "Showing user %d" userId)

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