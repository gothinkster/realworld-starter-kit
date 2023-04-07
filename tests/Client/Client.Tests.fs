module Client.Tests

open Fable.Mocha

open Shared

let client = testList "Client" [
    testCase "Added todo" <| fun _ ->
        let one = 1
        Expect.equal 1 one "There should be 1 todo"
]

let all =
    testList "All"
        [
#if FABLE_COMPILER // This preprocessor directive makes editor happy
            Shared.Tests.shared
#endif
            client
        ]

[<EntryPoint>]
let main _ = Mocha.runTests all