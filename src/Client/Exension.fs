[<AutoOpen>]
module Extension

open Elmish

module Cmd =
    let fromAsync (operation: Async<'msg>) : Cmd<'msg> =
        let delayedCmd (dispatch: 'msg -> unit) : unit =
            let delayedDispatch = async {
                match! Async.Catch operation with
                | Choice1Of2 msg -> dispatch msg
                | Choice2Of2 error -> ignore()
            }

            Async.StartImmediate delayedDispatch

        Cmd.ofSub delayedCmd

module Async =
    let map f computation =
        async {
            let! x = computation
            return f x
        }