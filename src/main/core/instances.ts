interface Article {
  publish()
  unpublish()
  getSlug(): string
  addComment(Comment)
  addFavorite(user: User)
  getFavoritedCount(): number
}

interface Comment {
  user: User
  text: string
}

interface Profile {}
interface User {
  followUser(user: User)
  unfollowUser(user: User)
  getFollowers(): User[]
  getFeed(): Article[]
  getProfile(): Profile
  favoriteArticle(article: Article)
}
