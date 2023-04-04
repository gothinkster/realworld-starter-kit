module Components.PageNewArticle

open Feliz
open Feliz.Router
open Shared
open Elmish
open Components.Navigation
open Models

type State =
    { Title: string
      Subtitle: string
      Content: string
      Tags: string
      SubmitAttempt: Deferred<SubmitArticleResult> }

type Msg =
    | TitleChanged of string
    | SubtitleChanged of string
    | ContentChanged of string
    | TagsChanged of string
    | SubmitArticle of AsyncOperationStatus<SubmitArticleResult>


let init() =
    { Title = ""
      Subtitle = ""
      Content = ""
      Tags = ""
      SubmitAttempt = HasNotStartedYet }, Cmd.none


let update (msg: Msg) (state: State) =
    match msg with
    | TitleChanged title ->
        { state with Title = title  }, Cmd.none

    | SubtitleChanged subtitle ->
        { state with Subtitle = subtitle  }, Cmd.none

    | ContentChanged content ->
        { state with Content = content  }, Cmd.none

    | TagsChanged tags ->
        { state with Tags = tags  }, Cmd.none

    | SubmitArticle Started ->
        let nextState = { state with SubmitAttempt = InProgress }
        let submit = async {
            let submitResult = Api.submitArticle state.Title state.Content state.Tags
            return SubmitArticle (Finished submitResult)
        }

        let nextCmd = Cmd.fromAsync submit
        nextState, nextCmd

    | SubmitArticle (Finished submitResult) ->
        let nextState = { state with SubmitAttempt = Resolved submitResult }
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
let RenderNewArticlePage (state: State) (user: ApplicationUser) (dispatch: Msg -> Unit) =
    Html.div [
        prop.className "editor-page"
        prop.children [
            Html.div [
                prop.className "container page"
                prop.children [
                    Html.div [
                        prop.className "row"
                        prop.children [
                            Html.div [
                                prop.className "col-md-10 offset-md-1 col-xs-12"
                                prop.children [
                                    Html.form [
                                        prop.children [
                                            Html.fieldSet [
                                                prop.children [
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.input [
                                                                prop.className "form-control form-control-lg"
                                                                prop.type' "text"
                                                                prop.placeholder "Article Title"
                                                                prop.valueOrDefault state.Title
                                                                prop.onChange (TitleChanged >> dispatch)
                                                            ]
                                                        ]
                                                    ]
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.input [
                                                                prop.className "form-control"
                                                                prop.type' "text"
                                                                prop.placeholder "What's this article about?"
                                                                prop.valueOrDefault state.Subtitle
                                                                prop.onChange (SubtitleChanged >> dispatch)
                                                            ]
                                                        ]
                                                    ]
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.textarea [
                                                                prop.className "form-control"
                                                                prop.rows 8
                                                                prop.placeholder "Write your article (in markdown)"
                                                                prop.valueOrDefault state.Content
                                                                prop.onChange (ContentChanged >> dispatch)
                                                            ]
                                                        ]
                                                    ]
                                                    Html.fieldSet [
                                                        prop.className "form-group"
                                                        prop.children [
                                                            Html.input [
                                                                prop.className "form-control"
                                                                prop.type' "text"
                                                                prop.placeholder "Enter tags"
                                                                prop.valueOrDefault state.Tags
                                                                prop.onChange (TagsChanged >> dispatch)
                                                            ]
                                                            Html.div [
                                                                prop.className "tag-list"
                                                            ]
                                                        ]
                                                    ]
                                                    Html.button [
                                                        prop.className "btn btn-lg pull-xs-right btn-primary"
                                                        prop.type' "button"
                                                        prop.text "Publish Article"
                                                        prop.onClick (fun _ -> dispatch (SubmitArticle Started))
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
