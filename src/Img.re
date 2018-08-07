let component = ReasonReact.statelessComponent("Img");

let make = (~src=None, ~width=30, ~height=30, ~className="", _children) => {
  ...component,
  render: _self =>
    <img
      className
      src=
        src
        ->(
            Belt.Option.getWithDefault(
              "//placehold.it/"
              ++ string_of_int(width)
              ++ "x"
              ++ string_of_int(height),
            )
          )
    />,
};
