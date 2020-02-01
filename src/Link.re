[@react.component]
let make = (~className="", ~route, ~children) => {
  let location = route->Route.toString;

  <a
    className
    href=location
    onClick={event =>
      if (!event->ReactEvent.Mouse.defaultPrevented
          && event->ReactEvent.Mouse.button == 0
          && !event->ReactEvent.Mouse.altKey
          && !event->ReactEvent.Mouse.ctrlKey
          && !event->ReactEvent.Mouse.metaKey
          && !event->ReactEvent.Mouse.shiftKey) {
        event->ReactEvent.Mouse.preventDefault;
        location->ReasonReactRouter.push;
      }
    }>
    children
  </a>;
};
