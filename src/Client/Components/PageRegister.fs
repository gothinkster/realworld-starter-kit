module Components.PageRegister

open Feliz
open Feliz.Router
open Models
open Shared
open Elmish

type State =
    { Username : string
      Email: string
      Password: string
      RegisterAttempt: Deferred<RegisterResult> }

type Msg =
    | UsernameChanged of string
    | EmailChanged of string
    | PasswordChanged of string
    | Register of AsyncOperationStatus<RegisterResult>

let (|UserRegister|_|) = function
    | Msg.Register (Finished (RegisterResult.Registered user)) -> Some user
    | _ -> None

let init() =
    { Username = ""
      Email = ""
      Password = ""
      RegisterAttempt = HasNotStartedYet }, Cmd.none

let update (msg: Msg) (state: State) =
    match msg with
    | UsernameChanged username ->
        { state with Username = username  }, Cmd.none

    | EmailChanged email ->
        { state with Email = email  }, Cmd.none

    | PasswordChanged password ->
        { state with Password = password }, Cmd.none

    | Register Started ->
        let nextState = { state with RegisterAttempt = InProgress }
        let register = async {
            let! registerResult = Api.register state.Username state.Email state.Password
            return Register (Finished registerResult)
        }

        let nextCmd = Cmd.fromAsync register
        nextState, nextCmd

    | Register (Finished registerResult) ->
        let nextState = { state with RegisterAttempt = Resolved registerResult }
        nextState, Cmd.none


let RenderRegisterOutcome (registerResult: Deferred<RegisterResult>) =
    match registerResult with
    | Resolved RegisterResult.Failed ->
        Html.paragraph [
            prop.style [ style.color.crimson; style.padding 10 ]
            prop.text "register fail"
        ]
    | Resolved (RegisterResult.Registered user) ->
        Html.paragraph [
            prop.style [ style.color.green; style.padding 10 ]
            prop.text (sprintf "User '%s' has succesfully registered " user.Email)
        ]
    | _ ->
        Html.none

open Navigation
[<ReactComponent>]
let RenderRegistrationPage  (state: State) (dispatch: Msg -> Unit) =
    Html.div [
        prop.children [
            RenderNavigation ("register", ApplicationUser.Anonymous)
            Html.div [
                prop.className "auth-page"
                prop.children [
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
                                                prop.text "Sign up"
                                            ]
                                            Html.p [
                                                prop.className "text-xs-center"
                                                prop.children [
                                                    Html.a [
                                                        prop.href (Router.format("login"))
                                                        prop.text "Have an account?"
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
                                                                prop.type' "text"
                                                                prop.placeholder "Username"
                                                                prop.valueOrDefault state.Username
                                                                prop.onChange (UsernameChanged >> dispatch)
                                                            ]
                                                        ]
                                                    ]
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
                                                        prop.onClick (fun _ -> dispatch (Register Started))
                                                        prop.text "Sign up"
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

            RenderRegisterOutcome state.RegisterAttempt
        ]
    ]
