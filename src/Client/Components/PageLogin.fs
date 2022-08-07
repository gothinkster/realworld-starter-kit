module Components.PageLogin

open Feliz
open Feliz.Router

type State =
    { Username: string
      Password: string
      LoginAttempt: string }

type Msg =
    | UsernameChanged of string
    | PasswordChanged of string
    | Login

open Elmish
let init() =
    { Username = ""
      Password = ""
      LoginAttempt = "" }, Cmd.none


let update (msg: Msg) (state: State) =
    match msg with
    | UsernameChanged username ->
        { state with Username = username  }, Cmd.none

    | PasswordChanged password ->
        { state with Password = password }, Cmd.none

    | Login ->
        let nextState = { state with LoginAttempt = "success" }
        let login = async {
            return "token-abc"
        }
        nextState, Cmd.none

open Components.LayoutGuess
[<ReactComponent>]
let PageLogin (dispatch: Msg -> Unit) : ReactElement =
        Html.div [
            prop.className "home-page"
            prop.children [
                LayoutGuess "login"
                Html.div [
                    prop.className "home-page"
                    prop.children [
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
                                                    prop.onClick (fun _ -> dispatch Login)
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
            ]
        ]

