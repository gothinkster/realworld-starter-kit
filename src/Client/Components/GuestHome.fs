module Components.GuestHome

open Feliz

[<ReactComponent>]
let GuestHome : ReactElement =
    Html.div [
        prop.children [
            Html.div [
                prop.className "banner"
                prop.children [
                    Html.div [
                        prop.className "container"
                        prop.children [
                            Html.h1 [
                                prop.className "logo-font"
                                prop.text "Conduit"
                            ]
                            Html.p [
                                prop.text "A place to share knowledge."
                            ]
                        ]
                    ]
                ]
            ]
            Html.div [
                prop.className "container page"
                prop.children [
                    Html.div [
                        prop.className "row"
                        prop.children [
                            Html.div [
                                prop.className "col-md-9"
                                prop.children [
                                    Html.div [
                                        prop.className "feed-toggle"
                                        prop.children [
                                            Html.ul [
                                                prop.className "nav nav-pills outline-active"
                                                prop.children [
                                                    Html.li [
                                                        prop.className "nav-item"
                                                        prop.children [
                                                            Html.a [
                                                                prop.className "nav-link active"
                                                                prop.text "Global Feed"
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
            ]
        ]
    ]