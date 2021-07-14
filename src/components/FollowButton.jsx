import classNames from 'classnames'
import React from 'react'

function FollowButton({ disabled, onClick, following, username }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={classNames('btn btn-sm action-btn', {
        'btn-outline-secondary': !following,
        'btn-secondary': following,
      })}
    >
      <i className="ion-plus-round" />
      &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  )
}

export default FollowButton
