import React from 'react';
import { withRouter } from 'react-router-dom';

import Link from '../asyncLink'; // eslint-disable-line
// asyncLink contents dynamic import()

const NavItem = ({ children, to, location }) => ( // eslint-disable-line react/prop-types
  <li className="nav-item" key={to}>
    <Link className={`nav-link${to === location.pathname ? ' active' : ''}`} to={to}>{children}</Link>
  </li>
);

export default withRouter(NavItem);
