import conduit
import gleam/should

pub fn hello_world_test() {
  conduit.hello_world()
  |> should.equal("Hello, from conduit!")
}
