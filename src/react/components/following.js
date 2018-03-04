import React from 'react';
import PropTypes from 'prop-types';

const Following = ({ profile, user, onClick }) => {
  if (!user || !user.id || user.username === profile.username) {
    return null;
  }
  if (profile.following) {
    return (
      <button
        className="btn btn-sm btn-secondary action-btn"
        onClick={onClick}
      >
        <i className="ion-minus-round" />
        &nbsp;
        Unfollow {profile.username}
      </button>
    );
  }
  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={onClick}
    >
      <i className="ion-plus-round" />
      &nbsp;
      Follow {profile.username}
    </button>
  );
};

Following.propTypes = {
  profile: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Following;
