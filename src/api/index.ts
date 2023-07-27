import request from '@/utils/request'
import type {
  Article,
  Articles,
  Author,
  Comment,
  CreateArticle,
  UpdateArticle,
  User,
  UserInfo,
} from '@/types'

function login(params: { user: User }): Promise<{ user: UserInfo }> {
  return request({
    url: '/api/users/login',
    method: 'post',
    data: params,
  })
}

function register(params: { user: User }): Promise<{ user: UserInfo }> {
  return request({
    url: '/api/users',
    method: 'post',
    data: params,
  })
}

function getArticles(params: Articles): Promise<{ articles: Article[]; articlesCount: number }> {
  return request({
    url: '/api/articles',
    params,
  })
}

function getTags(): Promise<{ tags: string[] }> {
  return request({
    url: '/api/tags',
  })
}

function getUserInfo(): Promise<{ user: UserInfo }> {
  return request({
    url: '/api/user',
  })
}

function updateUser(params: { user: UserInfo }): Promise<{ user: UserInfo }> {
  return request({
    url: '/api/user',
    method: 'put',
    data: params,
  })
}

function favorites({
  method,
  slug,
}: {
  method: string
  slug: string
}): Promise<{ article: Article }> {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method,
  })
}

function createArticle(params: { article: CreateArticle }): Promise<{ article: Article }> {
  return request({
    url: '/api/articles',
    method: 'post',
    data: params,
  })
}

function updateArticle(params: {
  article: UpdateArticle
  slug: string
}): Promise<{ article: Article }> {
  return request({
    url: `/api/articles/${params.slug}`,
    method: 'put',
    data: { article: params.article },
  })
}

function getArticle(slug: string): Promise<{ article: Article }> {
  return request({
    url: `/api/articles/${slug}`,
  })
}

function createComment(params: {
  slug: string
  comment: { body: string }
}): Promise<{ comment: Comment }> {
  return request({
    url: `/api/articles/${params.slug}/comments`,
    method: 'post',
    data: { comment: params.comment },
  })
}

function getComments(slug: string): Promise<{ comments: Comment[] }> {
  return request({
    url: `/api/articles/${slug}/comments`,
  })
}

function deleteComment(slug: string, id: number): Promise<{ comments: Comment[] }> {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: 'delete',
  })
}

function follow({
  method,
  username,
}: {
  method: string
  username: string
}): Promise<{ profile: Author }> {
  return request({
    url: `/api/profiles/${username}/follow`,
    method,
  })
}

function deleteArticle(slug: string): Promise<void> {
  return request({
    url: `/api/articles/${slug}`,
    method: 'delete',
  })
}

function getPofile(username: string): Promise<{ profile: Author }> {
  return request({
    url: `/api/profiles/${username}`,
  })
}

export default {
  getArticles,
  getTags,
  register,
  getUserInfo,
  login,
  favorites,
  createArticle,
  updateArticle,
  getArticle,
  createComment,
  getComments,
  deleteComment,
  follow,
  deleteArticle,
  updateUser,
  getPofile,
}
