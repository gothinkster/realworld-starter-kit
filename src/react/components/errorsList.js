import React from 'react';

export default(props) => {
  if (props.error && props.error.errors) { // eslint-disable-line react/prop-types
    return (
      <ul className="error-messages">
        {
          Object.keys(props.error.errors)
            .map(field => props.error.errors[field] // eslint-disable-line react/prop-types
              .map(message => // eslint-disable-line react/prop-types
                <li key={`field:${field},message:${message}`}>{field} {message}</li>))
        }
      </ul>
    );
  }
  if (props.error && props.error.message) { // eslint-disable-line react/prop-types
    return (
      <ul className="error-messages">
        <li>{props.error.message}</li>
      </ul>
    );
  }
  return null;
};
