module Shared.Tests

#if FABLE_COMPILER
open Fable.Mocha
#else
open Expecto
#endif

open Shared

let shared = testList "Shared" [
    testCase "Empty string is not a valid description" <| fun _ ->
        let expected = false
        let actual = false
        Expect.equal actual expected "Should be false"
]