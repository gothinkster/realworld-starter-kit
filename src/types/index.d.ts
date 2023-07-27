export interface Articles {
  tag?: string
  author?: string
  favorited?: string
  limit: number
  offset: number
}

export interface Author {
  username: string
  image: string
  bio: string
  following: boolean
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface User {
  email?: string
  username: string
  password: string
}

export interface UserInfo {
  email: string
  token?: string
  username: string
  bio: string
  image: string
  password?: string
}

export interface CreateArticle {
  title: string
  description: string
  body: string
  tagList: string[] | string
}

export interface UpdateArticle {
  title: string
  description: string
  body: string
}

export interface ArticleToggleOptions {
  label: string
  show?: boolean
  icon?: boolean
}

export interface ArticleListProps {
  tag?: string
  author?: string
  favorited?: string
}

export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Author
}
