module Components.PageRegister

open Feliz
open Feliz.Router

let registerForm =
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

open Components.LayoutGuess
[<ReactComponent>]
let render : ReactElement =
    Html.div [
        prop.children [
            LayoutGuess "register"
            Html.div [
                prop.className "auth-page"
                prop.children [
                    Html.div [
                        prop.className "container page"
                        prop.children [
                            registerForm
                        ]
                    ]
                ]
            ]
        ]
    ]