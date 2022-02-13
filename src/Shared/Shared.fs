namespace Shared

open System

type Todo = { Id: Guid; Description: string }

module Todo =
    let isValid (description: string) =
        String.IsNullOrWhiteSpace description |> not

    let create (description: string) =
        { Id = Guid.NewGuid()
          Description = description }

module Route =
    let builder typeName methodName =
        sprintf "/api/%s/%s" typeName methodName

type ITodosApi =
    { getTodos: unit -> Async<Todo list>
      addTodo: Todo -> Async<Todo> }



type Bio = Bio of string
type Image = Image of string

type User = {
    Email:    string;
    Password: string;
    Bio:      Bio;
    Image:    Image
}

type Profile = {
    Username:  string;
    Bio:       Bio;
    Image:     Image;
    Following: Boolean;
}

type Data = unit
type Api = {
    login:    Data -> User -> User
    register: Data -> User -> User
}

