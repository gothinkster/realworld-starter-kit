module AnonymousOnly = {
  [@react.component]
  let make = (~user: option(Shape.User.t), ~children) => {
    switch (user) {
    | Some(_) => React.null
    | None => children
    };
  };
};

module AuthenticatedOnly = {
  [@react.component]
  let make = (~user: option(Shape.User.t), ~children) => {
    switch (user) {
    | None => React.null
    | Some(_) => children
    };
  };
};

