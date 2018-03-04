import React from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Link from '../asyncLink'; // eslint-disable-line

function prepareLink(match, page) {
  const { url } = match;
  const basePath = url.replace(/\/(page\/[0-9]+)?$/, '');
  if (page === 1) {
    return basePath || '/';
  }
  return `${basePath}/page/${page}`;
}

const Pagination = ({ count, pageLength, page, match }) => ( // eslint-disable-line react/prop-types, max-len
  count && pageLength && count > pageLength
    ?
      <nav>
        <ul className="pagination">
          {
            _.range(1, 1 + Math.ceil(count / pageLength)).map(index => (
              <li className={`page-item${index === page ? ' active' : ''}`} key={index}>
                <Link className="page-link" to={prepareLink(match, index)}>
                  {index}
                </Link>
              </li>))
          }
        </ul>
      </nav>
    : null
);

export default withRouter(Pagination);
