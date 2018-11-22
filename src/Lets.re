/* source: https://raw.githubusercontent.com/notablemind/renm/master/src/utils/Lets.re */
open Belt;

module Async = {
  type t('a) = Js.Promise.t('a);
  let try_ = (promise, continuation) =>
    Js.Promise.catch(continuation, promise);
  let let_ = (promise, continuation) =>
    Js.Promise.then_(continuation, promise);
  let resolve = Js.Promise.resolve;
  let reject = Js.Promise.reject;
  let map = (promise, fn) =>
    Js.Promise.then_(v => Js.Promise.resolve(fn(v)), promise);

  module Consume = {
    let let_ = (promise, cont) =>
      Js.Promise.then_(
        value => {
          let () = cont(value);
          Js.Promise.resolve();
        },
        promise,
      )
      |> ignore;
  };
};

module Guard = {
  let let_ = ((condition, default), continuation) =>
    if (condition) {
      continuation();
    } else {
      default;
    };
};

module OptDefault = {
  let let_ = ((a, default), b) =>
    switch (a) {
    | None => default
    | Some(x) => b(x)
    };
  let or_ = (v, default) =>
    switch (v) {
    | None => default
    | Some(c) => c
    };
};

module OptForce = {
  let let_ = (a, b) =>
    switch (a) {
    | None => failwith("Unwrapping an empty optional")
    | Some(x) => b(x)
    };
};

module Try = {
  let let_ = (a, b) =>
    switch (a) {
    | Result.Error(e) => Result.Error(e)
    | Ok(x) => b(x)
    };
  let map = (a, b) =>
    switch (a) {
    | Result.Error(e) => Result.Error(e)
    | Ok(x) => Ok(b(x))
    };
  let flatMap = let_;
  let try_ = (a, b) =>
    switch (a) {
    | Result.Error(e) => b(e)
    | Ok(v) => Result.Ok(v)
    };
  let force = t =>
    switch (t) {
    | Result.Error(e) =>
      Js.log(e);
      failwith("Force unwrapped an Error()");
    | Ok(v) => v
    };
};

module TryWrap = {
  let let_ = Try.map;
};

module TryForce = {
  let let_ = (a, b) => b(Try.force(a));
};

module TryLog = {
  let let_ = (a, b) =>
    switch (a) {
    | Result.Error(e) => Js.log(e)
    | Ok(v) => b(v)
    };
};

module Opt = {
  let let_ = (a, b) =>
    switch (a) {
    | None => None
    | Some(x) => b(x)
    };
  let map = (a, b) =>
    switch (a) {
    | None => None
    | Some(x) => Some(b(x))
    };
  let force = value =>
    switch (value) {
    | None => failwith("Force unwrapped a none")
    | Some(x) => x
    };
  let orError = (value, error) =>
    switch (value) {
    | Some(v) => Result.Ok(v)
    | None => Result.Error(error)
    };
  let flatMap = let_;
};

module OptIf = {
  let let_ = (a, b) =>
    if (a) {
      b();
    } else {
      None;
    };
};

module UnitIf = {
  let let_ = (a, b) =>
    if (a) {
      b();
    } else {
      ();
    };
};

module OptWrap = {
  let let_ = (a, b) =>
    switch (a) {
    | None => None
    | Some(x) => Some(b(x))
    };
};

module OptOr = {
  let let_ = (a, b) =>
    switch (a) {
    | None => b()
    | Some(_x) => a
    };
};

module OptConsume = {
  let let_ = (a, b) =>
    switch (a) {
    | None => ()
    | Some(x) => b(x)
    };
};
