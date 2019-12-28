[@bs.module "@testing-library/react"]
external rawAct: (unit => Js.Undefined.t(Js.Promise.t('a))) => unit = "act";

let act = callback =>
  rawAct(() => {
    callback();
    // Fix: Warning: The callback passed to act(...) function mu st return undefined, or a Promise.
    Js.Undefined.empty;
  });
