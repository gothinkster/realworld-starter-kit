@react.component
let make = () => <>
  <a
    href="https://github.com/jihchi/rescript-react-realworld-example-app"
    target="_blank"
    style={ReactDOM.Style.make(
      ~position="fixed",
      ~bottom="0",
      ~width="100%",
      ~background="linear-gradient(#485563, #29323c)",
      ~textAlign="center",
      ~padding="15px",
      ~boxShadow="0 5px 5px 5px rgba(0,0,0,0.4)",
      ~zIndex="999",
      ~fontSize="1.5rem",
      ~display="block",
      ~color="#fff",
      (),
    )}>
    <i className="ion-social-github" style={ReactDOM.Style.make(~marginRight="8px", ())} />
    {"Fork on GitHub"->React.string}
  </a>
  <footer>
    <div className="container">
      <Link onClick={Link.home->Link.location} className="logo-font">
        {"conduit"->React.string}
      </Link>
      <span className="attribution">
        {"An interactive learning project from "->React.string}
        <a href="https://thinkster.io"> {"Thinkster"->React.string} </a>
        {". Code &amp; design licensed under MIT."->React.string}
      </span>
    </div>
  </footer>
</>
