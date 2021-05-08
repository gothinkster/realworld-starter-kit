// origin from https://github.com/reazen/relude/blob/master/src/Relude_AsyncResult.re
type t<'a, 'e> = AsyncData.t<result<'a, 'e>>

let init = AsyncData.init
let toBusy = AsyncData.toBusy
let completeOk = a => AsyncData.complete(Ok(a))
let completeError = e => AsyncData.complete(Error(e))
let reloadingOk = a => AsyncData.reloading(Ok(a))

let getOk = (v: t<'a, 'e>): option<'a> =>
  switch v {
  | Init => None
  | Loading => None
  | Reloading(Error(_)) => None
  | Reloading(Ok(v)) => Some(v)
  | Complete(Error(_)) => None
  | Complete(Ok(v)) => Some(v)
  }

let map = (fn, v: t<'a, 'e>): t<'b, 'e> =>
  switch v {
  | Init => Init
  | Loading => Loading
  | Reloading(Ok(a)) => reloadingOk(fn(a))
  | Reloading(Error(_)) as r => r
  | Complete(Ok(a)) => completeOk(fn(a))
  | Complete(Error(_)) as r => r
  }
