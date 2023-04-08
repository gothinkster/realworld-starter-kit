module Components.PageSettings


open Feliz
open Feliz.Router
open Shared
open Elmish
open Components.Navigation
open Models

type State =
    { Email: string
      LogoutAttempt: Deferred<LoginResponse> }
type Msg =
    | EmailChanged of string
    | Logout of AsyncOperationStatus<LoginResponse>

let init() =
    { Email = ""
      LogoutAttempt = HasNotStartedYet }, Cmd.none


let update (msg: Msg) (state: State) =
    match msg with
    | EmailChanged email ->
        { state with Email = email  }, Cmd.none

    | Logout Started ->
        let nextState = { state with LogoutAttempt = InProgress }
        let login = async {
            let! loginResult = Api.login state.Email ""
            return Logout (Finished loginResult)
        }

        let nextCmd = Cmd.fromAsync login
        nextState, nextCmd

    | Logout (Finished loginResult) ->
        let nextState = { state with LogoutAttempt = Resolved loginResult }
        nextState, Cmd.none

[<ReactComponent>]
let RenderSettingsPage (state: State) (user: ApplicationUser) (dispatch: Msg -> Unit) =
    Html.div [
        prop.className "settings-page"
        prop.children [
            RenderNavigation("settings", user)
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
                                        prop.text "Your Settings"
                                    ]
                                    Html.form [
                                        prop.children [
                                            Html.fieldSet [
                                                prop.children [
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.input [
                                                                prop.className "form-control"
                                                                prop.type' "text"
                                                                prop.placeholder "URL of profile picture"
                                                            ]
                                                        ]
                                                    ]
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.input [
                                                                prop.className "form-control form-control-lg"
                                                                prop.type' "text"
                                                                prop.placeholder "Your Name"
                                                            ]
                                                        ]
                                                    ]
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.textarea [
                                                                prop.className "form-control form-control-lg"
                                                                prop.rows 8
                                                                prop.placeholder "Short bio about you"
                                                            ]
                                                        ]
                                                    ]
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.input [
                                                                prop.className "form-control form-control-lg"
                                                                prop.type' "text"
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
                                                        prop.text "Update Settings"
                                                        // Add prop.onClick with dispatch here if needed
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                    Html.hr []
                                    Html.button [
                                        prop.className "btn btn-outline-danger"
                                        prop.text "Or click here to logout."
                                        prop.onClick (fun _ -> dispatch (Logout Started))
                                        // Add prop.onClick with dispatch here if needed
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
