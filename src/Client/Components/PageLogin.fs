module Components.PageLogin

open Feliz
open Feliz.Router
open Shared
open Elmish
open Components.Navigation
open Models

type State =
    { Email: string
      Password: string
      LoginAttempt: Deferred<LoginResult> }

type Msg =
    | EmailChanged of string
    | PasswordChanged of string
    | Login of AsyncOperationStatus<LoginResult>

let (|UserLoggedIn|_|) = function
    | Msg.Login (Finished (LoginResult.LoggedIn user)) -> Some user
    | _ -> None

let init() =
    { Email = ""
      Password = ""
      LoginAttempt = HasNotStartedYet }, Cmd.none


let update (msg: Msg) (state: State) =
    match msg with
    | EmailChanged email ->
        { state with Email = email  }, Cmd.none

    | PasswordChanged password ->
        { state with Password = password }, Cmd.none

    | Login Started ->
        let nextState = { state with LoginAttempt = InProgress }
        let login = async {
            let! loginResult = Api.login state.Email state.Password
            return Login (Finished loginResult)
        }

        let nextCmd = Cmd.fromAsync login
        nextState, nextCmd

    | Login (Finished loginResult) ->
        let nextState = { state with LoginAttempt = Resolved loginResult }
        nextState, Cmd.none

let renderLoginOutcome (loginResult: Deferred<LoginResult>) =
    match loginResult with
    | Resolved LoginResult.UsernameOrPasswordIncorrect ->
        Html.paragraph [
            prop.style [ style.color.crimson; style.padding 10 ]
            prop.text "Username or password is incorrect"
        ]

    | Resolved (LoginResult.LoggedIn user) ->
        Html.paragraph [
            prop.style [ style.color.green; style.padding 10 ]
            prop.text (sprintf "User '%s' has succesfully logged in" user.Email)
        ]

    | _ ->
        Html.none

[<ReactComponent>]
let render (state: State) (dispatch: Msg -> Unit) =
        Html.div [
            prop.children [
                render ("login", ApplicationUser.Anonymous)
                Html.div [
                    prop.className "auth-page"
                    prop.children [
                        Html.div [
                            Html.div [
                                prop.className "container page"
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
                                                                        prop.valueOrDefault state.Email
                                                                        prop.onChange (EmailChanged >> dispatch)
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
                                                                        prop.valueOrDefault state.Password
                                                                        prop.onChange (PasswordChanged >> dispatch)
                                                                    ]
                                                                ]
                                                            ]
                                                            Html.button [
                                                                prop.className "btn btn-lg btn-primary pull-xs-right"
                                                                prop.onClick (fun _ -> dispatch (Login Started))
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
                ]

                renderLoginOutcome state.LoginAttempt
            ]
        ]

