module Components.LayoutLoggedIn

open Feliz
open Feliz.Router

[<ReactComponent>]
let LayoutLoggedIn (url: string) : ReactElement =
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
                                            if url = "editor" then prop.className "nav-link active" else prop.className "nav-link"
                                            prop.href (Router.format("editor"))
                                            prop.text "New Article"
                                        ]
                                    ]
                                ]
                                Html.li [
                                    prop.className "nav-item"
                                    prop.children [
                                        Html.a [
                                            if url = "settings" then prop.className "nav-link active" else prop.className "nav-link"
                                            prop.href (Router.format("settings"))
                                            prop.text "Settings"
                                        ]
                                    ]
                                ]
                                Html.li [
                                    prop.className "nav-item"
                                    prop.children [
                                        Html.a [
                                            if url = "@" then prop.className "nav-link active" else prop.className "nav-link"
                                            prop.href  (Router.format("@"))
                                            prop.text "@"
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