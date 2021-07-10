import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks'

function Navbar() {
  const { isAuth, authUser } = useAuth()

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink activeClassName="active" className="navbar-brand" to="/" end>
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/" end>
              Home
            </NavLink>
          </li>
          {isAuth && (
            <>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/editor">
                  <i className="ion-compose" />
                  &nbsp;New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/@${authUser?.username}`}>
                  <img src={authUser?.image} />
                  &nbsp;{authUser?.username}
                </NavLink>
              </li>
            </>
          )}
          {!isAuth && (
            <>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/register">
                  Sign up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
