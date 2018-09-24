import React from 'react';
import PropTypes from 'prop-types';

const Favorited = ({ article, user, onClick, addClassName }) => {
  if (!user || !user.username || article.author.username === user.username) {
    return (
      <button className={`btn btn-sm btn-outline-primary ${addClassName}`}>
        <i className="ion-heart" />
        {
          addClassName ?
            null
          :
            <span>&nbsp;Favorited count</span>
        }
        &nbsp;
        <span className="counter">{article.favoritesCount}</span>
      </button>
    );
  }
  if (article.favorited) {
    return (
      <button className={`btn btn-sm btn-primary ${addClassName}`} onClick={onClick}>
        <i className="ion-heart" />
        {
          addClassName ?
            null
          :
            <span>&nbsp;Unvorite Post</span>
        }
        &nbsp;
        <span className="counter">{article.favoritesCount}</span>
      </button>
    );
  }
  return (
    <button className={`btn btn-sm btn-outline-primary ${addClassName}`} onClick={onClick}>
      <i className="ion-heart" />
      {
        addClassName ?
          null
        :
          <span>&nbsp;Favorite Post</span>
      }
      &nbsp;
      <span className="counter">{article.favoritesCount}</span>
    </button>
  );
};

Favorited.propTypes = {
  article: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  addClassName: PropTypes.string, // eslint-disable-line react/require-default-props
};

export default Favorited;
