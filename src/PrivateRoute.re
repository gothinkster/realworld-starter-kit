open Utils;

let component = ReasonReact.statelessComponent("PrivateRoute");

let make = (~user, children) => {
  ...component,
  render: _self =>
    switch (user) {
    | RemoteData.NotAsked
    | Loading(_) => nullEl
    | Success(v) => children(v)
    | Failure(_) =>
      ReasonReact.Router.push("/#/");
      nullEl;
    },
};
