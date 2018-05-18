open Jest;

open Expect;

test("renders without crashing", () => {
  let wrapper = Enzyme.mount(<App />);
  wrapper |> expect |> ExpectJs.toMatchSnapshot;
});
