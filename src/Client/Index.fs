module Index

open Elmish
open Fable.React
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


[<ReactComponent>]
let layout (url: string) : ReactElement =
    Html.nav [
        prop.className "navbar navbar-light"
        prop.children [
            Html.div [
                prop.className "container"
                prop.children[
                    Html.div [
                        Html.a [
                            prop.className "navbar-brand"
                            prop.href "index.html"
                            prop.text "Conduit"
                        ]
                        Html.ul [
                            prop.className "nav navbar-nav pull-xs-right"
                            prop.children [
                                Html.li [
                                    prop.className "nav-item"
                                    prop.children [
                                        Html.a [
                                            if url = ""
                                            then prop.className "nav-link active" else prop.className "nav-link"
                                            prop.href (Router.format(""))
                                            prop.text "Home"
                                        ]
                                    ]
                                ]
                                Html.li [
                                    prop.className "nav-item"
                                    prop.children [
                                        Html.a [
                                            if url = "login" then prop.className "nav-link active" else prop.className "nav-link"
                                            prop.href (Router.format("login"))
                                            prop.text "Sign In"
                                        ]
                                    ]
                                ]
                                Html.li [
                                    prop.className "nav-item"
                                    prop.children [
                                        Html.a [
                                            if url = "register" then prop.className "nav-link active" else prop.className "nav-link"
                                            prop.href  (Router.format("register"))
                                            prop.text "Sign Up"
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

let render state dispatch =

    let currentPage =
        match state.CurrentUrl with
        | [ ] ->
            Html.div [
                prop.className "container"
                prop.children [
                    layout ""
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
                    layout "login"
                    Html.div [
                        prop.className "row"
                        prop.children [
                            Html.div [
                                prop.className "col-md-6 offset-md-3 col-xs-12"
                                prop.children [
                                    Html.h1 [
                                        prop.className "text-xs-center"
                                        prop.text "Sign in"
                                    ]
                                    Html.p [
                                        prop.className "text-xs-center"
                                        prop.children [
                                            Html.a [
                                                prop.href (Router.format("register"))
                                                prop.text "Need an account?"
                                            ]
                                        ]
                                    ]
                                    Html.form[
                                        prop.children[
                                            Html.fieldSet [
                                                prop.className "form-group"
                                                prop.children [
                                                    Html.input [
                                                        prop.className "form-control form-control-lg"
                                                        prop.type' "email"
                                                        prop.placeholder "Email"
                                                    ]
                                                ]
                                            ]
                                            Html.fieldSet [
                                                prop.className "form-group"
                                                prop.children [
                                                    Html.input [
                                                        prop.className "form-control form-control-lg"
                                                        prop.type' "password"
                                                        prop.placeholder "Password"
                                                    ]
                                                ]
                                            ]
                                            Html.button [
                                                prop.className "btn btn-lg btn-primary pull-xs-right"
                                                prop.text "Sign in"
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]

        | _ ->
            Html.h1 "Not found"

    React.router [
        router.onUrlChanged (UrlChanged >> dispatch)
        router.children currentPage
    ]