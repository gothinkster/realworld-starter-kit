[@bs.module "@testing-library/react"]
external rawAct: (unit => unit) => unit = "act";

let undefined = [%raw {|undefined|}];

let act = callback =>
  rawAct(() => {
    callback();
    undefined;
  });
