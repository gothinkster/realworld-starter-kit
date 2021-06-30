import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, SignUp, Settings, Editor, Article, Profile } from './pages'

function App() {
  return (
    <div>
      <Router>
        <header>
          <nav className="navbar navbar-light">
            <div className="container">
              <Link className="navbar-brand" to="/">
                conduit
              </Link>
              <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/editor">
                    <i className="ion-compose"></i>&nbsp;New Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:articleId" element={<Editor />} />
            <Route path="/article/:articleId" element={<Article />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </main>
        <footer>
          <div className="container">
            <a href="/" className="logo-font">
              conduit
            </a>
            <span className="attribution">
              An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
              licensed under MIT.
            </span>
          </div>
        </footer>
      </Router>
    </div>
  )
}

export default App
