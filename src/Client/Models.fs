module Models

open Shared

type ApplicationUser =
    | Anonymous
    | LoggedUser of User