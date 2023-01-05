import Link from "next/link";
import React, { ReactElement } from "react";

type Props = {
  globalFeed: boolean;
};

const defaultProps: Props = {
  globalFeed: true,
};

const FeedToggle = (props: Props = defaultProps) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={`nav-link ${props.globalFeed ? "" : "active"}`}
            href=""
            shallow
          >
            Your Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${!props.globalFeed ? "" : "active"}`}
            href="?global=true"
            shallow
          >
            Global Feed
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FeedToggle;
