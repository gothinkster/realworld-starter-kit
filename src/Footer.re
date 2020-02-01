[@react.component]
let make = () => {
  <footer>
    <div className="container">
      <Link location=Link.home className="logo-font">
        "conduit"->React.string
      </Link>
      <span className="attribution">
        "An interactive learning project from "->React.string
        <a href="https://thinkster.io"> "Thinkster"->React.string </a>
        ". Code &amp; design licensed under MIT."->React.string
      </span>
    </div>
  </footer>;
};
