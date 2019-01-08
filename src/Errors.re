open Utils;

let component = ReasonReact.statelessComponent("FormBody");

let make = (~data, _children) => {
  ...component,
  render: _self =>
    switch (data) {
    | Some(v) =>
      <ul className="error-messages">
        {v->(Belt.List.mapU((. item) => <li key=item> {item |> strEl} </li>))
         |> Belt.List.toArray
         |> arrayEl}
      </ul>
    | None => nullEl
    },
};
