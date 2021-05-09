// origin from https://github.com/reazen/relude/blob/master/src/Relude_AsyncData.re
type t<'a> =
  | Init
  | Loading
  | Reloading('a)
  | Complete('a)

let init = Init

let reloading = v => Reloading(v)

let isBusy = v =>
  switch v {
  | Init => false
  | Loading => true
  | Reloading(_) => true
  | Complete(_) => false
  }

let isComplete = v =>
  switch v {
  | Init => false
  | Loading => false
  | Reloading(_) => false
  | Complete(_) => true
  }

let toBusy = v =>
  switch v {
  | Init => Loading
  | Loading as a => a
  | Reloading(_) as a => a
  | Complete(a) => Reloading(a)
  }

let complete = v => Complete(v)

let getValue = v =>
  switch v {
  | Init => None
  | Loading => None
  | Reloading(a) => Some(a)
  | Complete(a) => Some(a)
  }

let map = (v, fn) =>
  switch v {
  | Init => Init
  | Loading => Loading
  | Reloading(a) => Reloading(fn(a))
  | Complete(a) => Complete(fn(a))
  }

let tapComplete = (v, fn) =>
  switch v {
  | Init => v
  | Loading => v
  | Reloading(_) => v
  | Complete(a) =>
    fn(a)
    v
  }

let toIdle = v =>
  switch v {
  | Init as a => a
  | Loading => Init
  | Reloading(a) => Complete(a)
  | Complete(_) as a => a
  }

let debug = v =>
  switch v {
  | Init => "Init"
  | Loading => "Loading"
  | Reloading(_) => "Reloading(_)"
  | Complete(_) => "Complete(_)"
  }
