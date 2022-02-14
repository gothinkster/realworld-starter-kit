module Index

open Elmish

type Model = { Value : string }

type Msg =
    | ChangeValue of string

let init () =
    { Value = "" }, Cmd.none

let update (msg:Msg) (model:Model) =
    match msg with
    | ChangeValue newValue ->
        { model with Value = newValue }, Cmd.none

open Feliz
let view model dispatch =
    Html.nav [
        prop.className "navbar navbar-light"
        prop.children [
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
                                    prop.className "nav-link active"
                                    prop.href "#"
                                    prop.text "Home"
                                ]
                            ]
                        ]
                        Html.li [
                            prop.className "nav-item"
                            prop.children [
                                Html.a [
                                    prop.className "nav-link"
                                    prop.href "#"
                                    prop.children [
                                        Html.i [
                                            prop.className "ion-compose"
                                        ]
                                        Html.text " New Article"
                                    ]
                                ]
                            ]
                        ]
                        Html.li [
                            prop.className "nav-item"
                            prop.children [
                                Html.a [
                                    prop.className "nav-link"
                                    prop.href "#"
                                    prop.children [
                                        Html.i [
                                            prop.className "ion-gear-a"
                                        ]
                                        Html.text " Settings"
                                    ]
                                ]
                            ]
                        ]
                        Html.li [
                            prop.className "nav-item"
                            prop.children [
                                Html.a [
                                    prop.className "nav-link"
                                    prop.href "#"
                                    prop.text "Sign In"
                                ]
                            ]
                        ]
                        Html.li [
                            prop.className "nav-item"
                            prop.children [
                                Html.a [
                                    prop.className "nav-link"
                                    prop.href "#"
                                    prop.text "Sign Up"
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]