// TODO: Being lazy for now, call the original api services directly
// TODO: doing optimistic UI update for now, also need override state on success or failed

import { $ } from "@builder.io/qwik"
import { components } from "~/libs/api-schema"
import { del, post } from "~/libs/api"

export const toggleFavorite = $((
  article: components["schemas"]["Article"],
  token?: string
) => {
  if (article.favorited) {
    article.favorited = false
    article.favoritesCount -= 1
    del(`articles/${article.slug}/favorite`, token)
  } else {
    article.favorited = true
    article.favoritesCount += 1
    post(`articles/${article.slug}/favorite`, {}, token)
  }
})

export const toggleFollow = $((
  article: components["schemas"]["Article"],
  token?: string
) => {
  if (article.author.following) {
    article.author.following = false
    del(`profiles/${article.author.username}/follow`, token)
  } else {
    article.author.following = true
    post(`profiles/${article.author.username}/follow`, {}, token)
  }
})

export const toggleProfileFollow = $((
  profile: components["schemas"]["Profile"],
  token?: string
) => {
  if (profile.following) {
    profile.following = false
    del(`profiles/${profile.username}/follow`, token)
  } else {
    profile.following = true
    post(`profiles/${profile.username}/follow`, {}, token)
  }
})