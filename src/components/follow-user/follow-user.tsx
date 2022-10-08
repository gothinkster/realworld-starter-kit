import { component$, useStore, $, QRL } from "@builder.io/qwik";
import axios from "axios";
import { getAuthToken } from "~/auth/auth";
import { BASE_URL } from "~/common/api";
import { AuthorData } from "~/model/article-data";

export const FollowUser = component$(
  (props: {
    user: AuthorData;
    following: boolean;
    followingChanged?: QRL<(newValue: boolean) => void>;
  }) => {
    const { user, followingChanged, following } = props;
    const state = useStore(
      {
        following,
      },
      { recursive: true, reactive: true }
    );

    const changeFollowingState = $(
      async (user: AuthorData, newValue: boolean) => {
        const token = getAuthToken();
        if (!token) {
          console.error("cant change follow state");
          return;
        }
        const response = await axios.request({
          url: `${BASE_URL}profiles/${user.username}/follow`,
          method: newValue ? "post" : "delete",
          headers: { authorization: token },
        });
        user.following = newValue;
        state.following = newValue;
        if (followingChanged) {
          followingChanged(newValue);
        }
        return response.status;
      }
    );

    const followUser$ = $(async (user: AuthorData) => {
      return changeFollowingState(user, true);
    });

    const unfollowUser$ = $(async (user: AuthorData) => {
      return changeFollowingState(user, false);
    });

    console.log("follw user", user.following);

    return state.following ? (
      <button
        class="btn btn-sm action-btn btn-outline-secondary"
        onClick$={() => unfollowUser$(user)}
      >
        <i class="ion-minus-round"></i> &nbsp; Unfollow {user.username}
      </button>
    ) : (
      <button
        class="btn btn-sm action-btn btn-outline-secondary"
        onClick$={() => followUser$(user)}
      >
        <i class="ion-plus-round"></i> &nbsp; Follow {user.username}
      </button>
    );
  }
);
